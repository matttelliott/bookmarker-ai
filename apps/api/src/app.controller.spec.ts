import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('health', () => {
    it('should return health status', () => {
      const result = appController.getHealth()
      expect(result).toHaveProperty('status', 'ok')
      expect(result).toHaveProperty('service', 'bookmarker-api')
      expect(result).toHaveProperty('timestamp')
    })
  })
})
