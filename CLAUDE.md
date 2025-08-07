# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bookmarker-AI is a comprehensive bookmarking platform with AI-powered features, built as a TypeScript monorepo containing multiple applications and shared packages.

## 🔴 CRITICAL: Test-Driven Development (TDD)

**This project strictly follows TDD principles. NO production code is written without a failing test first.**

### TDD Workflow - ALWAYS FOLLOW
1. **RED**: Write a failing test that defines the desired behavior
2. **GREEN**: Write the minimum code needed to make the test pass
3. **REFACTOR**: Improve the code while keeping tests green

### Testing Rules
- **NEVER write implementation code without a failing test first**
- **Every new feature starts with a test**
- **Every bug fix starts with a test that reproduces the bug**
- **Use Jest for unit/integration tests**
- **Use Playwright for E2E tests that verify user workflows**
- **Tests are documentation - they show how the code should be used**

### Test File Organization
```
packages/[package-name]/
├── src/
│   ├── feature.ts
│   └── feature.spec.ts    # Jest unit test (write this FIRST)
e2e/
└── user-flow.spec.ts      # Playwright E2E test
```

## Commands

### Testing Commands (Use These First!)
```bash
# Run all tests to ensure nothing is broken
npm run test

# Watch mode for TDD - run this while developing
npm run test:watch

# Run tests for specific package during TDD
npm run test:watch -w @bookmarker/[package-name]

# Run E2E tests with Playwright
npm run test:e2e

# Run E2E tests in UI mode for debugging
npm run test:e2e:ui

# Generate coverage report
npm run test:coverage
```

### Development Commands
```bash
# Start API development server (after tests are written)
npm run dev:api -w @bookmarker/api

# Start Angular web app (after tests are written)
npm run dev:web -w @bookmarker/web

# Build all packages
npm run build

# Lint all packages
npm run lint

# Type check all packages
npm run typecheck
```

### Database Commands
```bash
# Run migrations
npm run db:migrate -w @bookmarker/api

# Generate types from Zod schemas
npm run generate:types -w packages/universal/schemas

# Seed development data
npm run db:seed -w @bookmarker/api
```

## Architecture

### Monorepo Structure
```
bookmarker-ai/
├── apps/
│   ├── api/           # NestJS backend API
│   ├── web/           # Angular web application  
│   ├── extension/     # Firefox-first browser extension (Angular-based)
│   └── cli/           # nest-commander CLI tool
├── packages/
│   ├── node/          # Node.js only packages
│   │   ├── database/  # Supabase/Postgres database layer
│   │   ├── scrapers/  # Reddit, Lemmy, HackerNews, Twitter scrapers
│   │   └── ai/        # AI persona implementations
│   ├── browser/       # Browser-only packages
│   │   ├── ui/        # Shared Angular components (TailwindCSS + DaisyUI)
│   │   └── storage/   # Browser storage abstractions
│   └── universal/     # Isomorphic packages
│       ├── schemas/   # Zod schemas (source of truth for ALL models)
│       ├── types/     # TypeScript types derived from Zod schemas
│       ├── utils/     # Shared utilities (using lodash-fp, date-fns)
│       └── validation/# Zod parsing helpers
├── e2e/               # Playwright E2E tests
└── package.json       # Workspace configuration
```

## Core Architectural Principles

### 1. Parse, Don't Validate

**We parse external data into domain objects, we don't validate and throw.**

```typescript
// ❌ WRONG: Validation throws on bad data
function validateBookmark(data: unknown): Bookmark {
  return BookmarkSchema.parse(data); // throws ZodError
}

// ✅ RIGHT: Parsing returns a Result type
function parseBookmark(data: unknown): Result<Bookmark, ParseError> {
  const result = BookmarkSchema.safeParse(data);
  if (result.success) {
    return { ok: true, value: result.data };
  }
  return { ok: false, error: new ParseError(result.error) };
}

// ✅ RIGHT: Parsing with defaults and coercion
const BookmarkInputSchema = z.object({
  url: z.string().url(),
  title: z.string().min(1).default('Untitled'),
  tags: z.array(z.string()).default([]),
  isPublic: z.coerce.boolean().default(false)
});
```

### 2. Zod-First Model Definition

**ALL models start as Zod schemas. Everything else derives from them.**

```typescript
// 1. Define the core domain model
export const BookmarkSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  title: z.string(),
  tags: z.array(z.string()),
  metadata: z.record(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
});

// 2. Derive TypeScript type
export type Bookmark = z.infer<typeof BookmarkSchema>;

// 3. Derive database entity
export type BookmarkEntity = z.infer<typeof BookmarkSchema> & {
  _table: 'bookmarks';
};

// 4. Derive component props
export const BookmarkCardPropsSchema = BookmarkSchema.pick({
  url: true,
  title: true,
  tags: true
}).extend({
  onEdit: z.function().optional(),
  onDelete: z.function().optional()
});

export type BookmarkCardProps = z.infer<typeof BookmarkCardPropsSchema>;

// 5. Derive API DTOs
export const CreateBookmarkSchema = BookmarkSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const UpdateBookmarkSchema = CreateBookmarkSchema.partial();
```

### 3. Graceful Data Handling

```typescript
// Parse external data with fallbacks
export function parseExternalBookmark(data: unknown): Bookmark {
  const parsed = ExternalBookmarkSchema.safeParse(data);
  
  if (parsed.success) {
    return parsed.data;
  }
  
  // Handle partial data gracefully
  const partial = PartialBookmarkSchema.safeParse(data);
  if (partial.success && partial.data.url) {
    return {
      ...defaultBookmark(),
      ...partial.data,
      title: partial.data.title || extractTitleFromUrl(partial.data.url)
    };
  }
  
  // Return safe default
  return defaultBookmark();
}

// Use Result types for operations that can fail
export async function fetchBookmark(id: string): Promise<Result<Bookmark>> {
  try {
    const data = await api.get(`/bookmarks/${id}`);
    return parseBookmark(data);
  } catch (error) {
    return { ok: false, error: parseError(error) };
  }
}

// Handle results with pattern matching
const result = await fetchBookmark(id);
const output = match(result)
  .with({ ok: true }, ({ value }) => <BookmarkCard {...value} />)
  .with({ ok: false, error: { code: 'NOT_FOUND' } }, () => <NotFound />)
  .with({ ok: false }, ({ error }) => <ErrorMessage error={error} />)
  .exhaustive();
```

### Key Architectural Patterns

1. **Test-Driven Development (TDD)**:
   - Write tests BEFORE implementation
   - Tests define behavior and contracts
   - Both Jest and Playwright provide comprehensive coverage

2. **Zod-First Development**:
   - ALL models defined as Zod schemas first
   - Database entities derived from schemas
   - Component props derived from schemas
   - API DTOs derived from schemas
   - Use `.safeParse()` not `.parse()` for external data

3. **Parse, Don't Validate**:
   - Transform external data into domain objects
   - Provide sensible defaults
   - Use coercion for type conversion
   - Return Result types, not throw errors

4. **Functional Programming**:
   - Use `lodash-fp` for functional utilities
   - Use `ts-pattern` for exhaustive pattern matching
   - Prefer immutable operations
   - Use Result/Either types for error handling

5. **Package Organization**: 
   - `node/`: Server-side only code
   - `browser/`: Client-side only code
   - `universal/`: Isomorphic code (schemas, types, utils)

## TDD Examples with Parsing

### Example: API Endpoint with Parsing
```typescript
// STEP 1: Write test for parsing behavior
describe('POST /api/v1/bookmarks', () => {
  it('should parse and normalize bookmark data', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/bookmarks')
      .send({
        url: '  https://EXAMPLE.com/path  ', // spaces and caps
        title: '',  // empty title
        tags: ['JavaScript', 'javascript', ' testing '] // duplicates
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      url: 'https://example.com/path', // normalized
      title: 'Example Domain', // extracted from URL
      tags: ['javascript', 'testing'] // deduped and normalized
    });
  });

  it('should handle partial data gracefully', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/bookmarks')
      .send({ url: 'https://example.com' }); // minimal data
    
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      url: 'https://example.com',
      title: expect.any(String), // has default
      tags: [] // empty default
    });
  });
});

// STEP 2: Implement parsing schema
export const CreateBookmarkInputSchema = z.object({
  url: z.string().trim().toLowerCase().url(),
  title: z.string().trim().optional().transform(val => 
    val || extractTitleFromUrl(url)
  ),
  tags: z.array(z.string().trim().toLowerCase())
    .default([])
    .transform(tags => [...new Set(tags)]) // dedupe
});

// STEP 3: Use in controller
@Post()
async create(@Body() data: unknown) {
  const parsed = CreateBookmarkInputSchema.safeParse(data);
  if (!parsed.success) {
    return { error: formatZodError(parsed.error) };
  }
  return this.bookmarkService.create(parsed.data);
}
```

### Example: Component with Parsed Props
```typescript
// STEP 1: Test component handles various prop shapes
describe('BookmarkCard', () => {
  it('should display bookmark with all props', () => {
    const props = {
      url: 'https://example.com',
      title: 'Example',
      tags: ['test'],
      onEdit: jest.fn()
    };
    
    const { getByText } = render(<BookmarkCard {...props} />);
    expect(getByText('Example')).toBeInTheDocument();
  });

  it('should handle minimal props gracefully', () => {
    const props = { url: 'https://example.com' };
    
    const { getByText } = render(<BookmarkCard {...props} />);
    expect(getByText('example.com')).toBeInTheDocument(); // fallback title
  });
});

// STEP 2: Component uses parsed props
export function BookmarkCard(props: unknown) {
  const parsed = BookmarkCardPropsSchema.safeParse(props);
  const bookmark = parsed.success 
    ? parsed.data 
    : createDefaultBookmarkProps(props);
    
  return (
    <div className="card">
      <h3>{bookmark.title || getDomainFromUrl(bookmark.url)}</h3>
      {/* ... */}
    </div>
  );
}
```

### Data Flow with Parsing

1. **External Input**: Raw data from user/API/scraper
2. **Parse Layer**: Transform to domain model with `.safeParse()`
3. **Business Logic**: Operate on parsed, type-safe domain objects
4. **Storage**: Save normalized data to database
5. **Output**: Transform for API response or UI rendering

### Testing Best Practices

1. **Test Parsing Behavior**: 
   - Test that malformed data is handled gracefully
   - Test that defaults are applied correctly
   - Test that coercion works as expected

2. **Test Edge Cases**:
   - Missing required fields
   - Extra unexpected fields
   - Wrong types that can be coerced
   - Invalid data that needs fallbacks

3. **Test Integration**:
   - API endpoints handle various input shapes
   - Components render with partial data
   - Database operations with parsed data

### Important Conventions

- **TDD IS MANDATORY**: No code without tests
- **Parse at Boundaries**: Use `.safeParse()` for all external data
- **Zod-First Models**: Define schema, then derive types
- **Graceful Degradation**: Always have sensible defaults
- **Result Types**: Return Result<T, E> instead of throwing
- **Pattern Matching**: Use ts-pattern to handle all cases
- **Functional Style**: Use lodash-fp for data transformation

### Development Workflow

1. **Write a failing test** that shows desired parsing behavior
2. Define/update Zod schema with transforms and defaults
3. Run test to verify it fails correctly
4. Implement parsing logic using `.safeParse()`
5. Handle both success and failure cases gracefully
6. Refactor while keeping tests green
7. Add E2E test for complete flow

### Environment Configuration

- API uses `.env` for configuration
- Angular apps use `environment.ts` files
- Test environment uses `.env.test`
- E2E tests use `.env.e2e`
- Never commit sensitive credentials

### CI/CD Requirements

- All tests must pass before merge
- Minimum 80% code coverage
- E2E tests run on staging environment
- No code deploys without passing tests