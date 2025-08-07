# Bookmarker AI

A comprehensive bookmarking platform with AI-powered features for organizing, discovering, and
sharing web content.

## Features

- **Smart Bookmarking**: Save bookmarks with automatic tagging via AI personas
- **Content Discovery**: Explore public bookmarks through tags and user networks
- **Multi-Platform**: Web app, browser extension, CLI tool, and upcoming mobile/desktop apps
- **Content Aggregation**: Automatically import bookmarks from Reddit, Lemmy, HackerNews, and
  Twitter
- **AI Personas**: Customizable AI agents that analyze and categorize your bookmarks
- **Privacy-First**: Choose between private and public bookmarks

## Tech Stack

- **Monorepo**: NPM workspaces with TypeScript
- **Backend**: NestJS API with Supabase (PostgreSQL)
- **Frontend**: Angular with TailwindCSS + DaisyUI
- **Extension**: Firefox-first browser extension (with Chrome compatibility)
- **CLI**: nest-commander
- **Testing**: Jest (unit/integration) + Playwright (E2E)
- **Data Validation**: Zod schemas with parsing (not validation)
- **Utilities**: lodash-fp, ts-pattern, date-fns

## Architecture

This project follows a **Parse, Don't Validate** philosophy and strict **Test-Driven Development
(TDD)**.

### Project Structure

```
bookmarker-ai/
├── apps/                 # Minimal application shells
│   ├── api/             # NestJS REST API
│   ├── web/             # Angular web application
│   ├── extension/       # Firefox-first browser extension
│   └── cli/             # Command-line interface
├── packages/            # Shared business logic
│   ├── node/           # Server-side packages
│   ├── browser/        # Client-side packages
│   └── universal/      # Isomorphic packages (schemas, types, utils)
└── e2e/                # Playwright E2E tests
```

### Key Principles

1. **Zod-First Development**: All data models start as Zod schemas
2. **Parse External Data**: Transform messy input into clean domain objects
3. **TDD Mandatory**: No production code without failing tests first
4. **Functional Programming**: Immutable operations with lodash-fp and ts-pattern
5. **Shared Packages**: Maximum code reuse across applications

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Supabase account (for database)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bookmarker-ai.git
cd bookmarker-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials
```

### Development

```bash
# Run tests in watch mode (TDD workflow)
npm run test:watch

# Start the API development server
npm run dev:api -w @bookmarker/api

# Start the web application
npm run dev:web -w @bookmarker/web

# Run E2E tests
npm run test:e2e

# Type check all packages
npm run typecheck

# Lint all packages
npm run lint
```

### Testing

We follow strict TDD practices. Every feature starts with a test:

```bash
# Run all tests
npm run test

# Run tests for a specific package
npm run test -w @bookmarker/api

# Run E2E tests with UI
npm run test:e2e:ui

# Generate coverage report
npm run test:coverage
```

## Development Workflow

1. **Write a failing test** that describes the desired behavior
2. **Define/update Zod schema** with parsing rules
3. **Implement minimal code** to make the test pass
4. **Refactor** while keeping tests green
5. **Add E2E tests** for user-facing features

Example:

```typescript
// 1. Test first
test('should parse bookmark with defaults', () => {
  const result = parseBookmark({ url: 'https://example.com' })
  expect(result.title).toBe('example.com') // auto-extracted
})

// 2. Schema with parsing
const BookmarkSchema = z.object({
  url: z.string().url(),
  title: z.string().transform((val) => val || extractDomain(url)),
})

// 3. Use safeParse for graceful handling
const result = BookmarkSchema.safeParse(data)
```

## API Documentation

The API follows REST conventions with the base path `/api/v1/`.

### Endpoints

- `POST /api/v1/bookmarks` - Create bookmark
- `GET /api/v1/bookmarks` - List bookmarks
- `GET /api/v1/bookmarks/:id` - Get bookmark
- `PUT /api/v1/bookmarks/:id` - Update bookmark
- `DELETE /api/v1/bookmarks/:id` - Delete bookmark
- `GET /api/v1/tags` - List tags
- `GET /api/v1/tags/:name/bookmarks` - Get bookmarks by tag

All endpoints use Zod schemas for request/response parsing.

## CLI Usage

```bash
# Add a bookmark
bookmarker add --url https://example.com --tags "javascript,testing"

# Search bookmarks
bookmarker search "typescript"

# List recent bookmarks
bookmarker list --limit 10

# Export bookmarks
bookmarker export --format json > bookmarks.json
```

## Browser Extension

The Firefox-first browser extension allows quick bookmarking of the current page:

1. Click the extension icon
2. Edit title and tags (AI suggestions pre-filled)
3. Choose privacy setting (public/private)
4. Save

The extension prioritizes Firefox's WebExtensions API and user privacy, with cross-browser
compatibility where possible.

## Contributing

1. Read [CLAUDE.md](./CLAUDE.md) for development guidelines
2. Check [TODO.md](./TODO.md) for available tasks
3. Follow TDD practices - write tests first
4. Use Zod schemas for all data models
5. Parse external data, don't validate
6. Submit PR with passing tests

## License

MIT

## Support

- Issues: [GitHub Issues](https://github.com/yourusername/bookmarker-ai/issues)
- Discussions: [GitHub Discussions](https://github.com/yourusername/bookmarker-ai/discussions)

## Roadmap

- [ ] Core bookmarking functionality
- [ ] AI persona integration
- [ ] Social features (following, sharing)
- [ ] Content aggregation from external sources
- [ ] Mobile applications (iOS/Android)
- [ ] Desktop applications (Electron)
- [ ] Browser sync functionality
- [ ] Export/import features
- [ ] Advanced search and filtering
- [ ] Bookmark collections/folders
