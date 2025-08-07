import type { Result } from './result'
import { Success, Failure, isSuccess, isFailure, dangerouslyUnwrap, unwrapOr, map } from './result'

describe('Result type utilities', () => {
  describe('Success', () => {
    it('should create a successful result', () => {
      const result = Success('success')
      expect(result.success).toBe(true)
      expect(result.data).toBe('success')
    })

    it('should have correct TypeScript type', () => {
      const result = Success(42)
      // TypeScript should know this is a number
      const num: number = result.data
      expect(num).toBe(42)
    })
  })

  describe('Failure', () => {
    it('should create an error result', () => {
      const result = Failure('error message') as Failure<string>
      expect(result.success).toBe(false)
      expect(result.error).toBe('error message')
    })

    it('should handle complex error objects', () => {
      const error = { code: 'NOT_FOUND', message: 'Resource not found' }
      const result = Failure(error) as Failure<typeof error>
      expect(result.success).toBe(false)
      expect(result.error).toEqual(error)
    })
  })

  describe('isSuccess', () => {
    it('should return true for successful results', () => {
      expect(isSuccess(Success('test'))).toBe(true)
    })

    it('should return false for error results', () => {
      expect(isSuccess(Failure('error'))).toBe(false)
    })
  })

  describe('isFailure', () => {
    it('should return true for error results', () => {
      expect(isFailure(Failure('error'))).toBe(true)
    })

    it('should return false for successful results', () => {
      expect(isFailure(Success('test'))).toBe(false)
    })
  })

  describe('dangerouslyUnwrap', () => {
    it('should return value for successful result', () => {
      expect(dangerouslyUnwrap(Success('value'))).toBe('value')
    })

    it('should throw for error result', () => {
      expect(() => dangerouslyUnwrap(Failure('error'))).toThrow(
        'Attempted to unwrap an error result',
      )
    })
  })

  describe('unwrapOr', () => {
    it('should return value for successful result', () => {
      expect(unwrapOr(Success('value'), 'default')).toBe('value')
    })

    it('should return default for error result', () => {
      expect(unwrapOr(Failure('error'), 'default')).toBe('default')
    })
  })

  describe('map', () => {
    it('should transform successful result', () => {
      const result = Success(5)
      const mapped = map(result, (x: number) => x * 2)
      expect(dangerouslyUnwrap(mapped)).toBe(10)
    })

    it('should pass through error result', () => {
      const result = Failure<number, string>('error')
      const mapped = map(result, (x: number) => x * 2)
      expect(isFailure(mapped)).toBe(true)
      if (!mapped.success) {
        expect(mapped.error).toBe('error')
      }
    })

    it('should handle type transformations', () => {
      const result = Success('5')
      const mapped = map(result, (x: string) => parseInt(x, 10))
      expect(dangerouslyUnwrap(mapped)).toBe(5)
    })
  })

  describe('real-world usage', () => {
    // Simulate parsing external data
    function parseAge(input: unknown): Result<number, string> {
      if (typeof input !== 'string') {
        return Failure('Input must be a string')
      }

      const age = parseInt(input, 10)
      if (isNaN(age)) {
        return Failure('Input must be a valid number')
      }

      if (age < 0 || age > 150) {
        return Failure('Age must be between 0 and 150')
      }

      return Success(age)
    }

    it('should handle valid input', () => {
      const result = parseAge('25')
      expect(isSuccess(result)).toBe(true)
      expect(dangerouslyUnwrap(result)).toBe(25)
    })

    it('should handle invalid input gracefully', () => {
      expect(unwrapOr(parseAge('invalid'), 0)).toBe(0)
      expect(unwrapOr(parseAge(null), 0)).toBe(0)
      expect(unwrapOr(parseAge('200'), 0)).toBe(0)
    })
  })
})
