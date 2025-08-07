# TODO

## Project Setup

### Initial Configuration

- [ ] Initialize npm workspace with `npm init -w`
- [ ] Create workspace structure (apps/, packages/, e2e/)
- [ ] Set up TypeScript configuration for monorepo
- [ ] Configure Jest for workspace testing
- [ ] Configure Playwright for E2E testing
- [ ] Set up ESLint and Prettier
- [ ] Configure TailwindCSS with DaisyUI

### Package Structure

- [ ] Create packages/universal/schemas for Zod schemas
- [ ] Create packages/universal/types for derived types
- [ ] Create packages/universal/utils with lodash-fp setup
- [ ] Create packages/universal/validation for parsing helpers
- [ ] Create packages/node/database for Supabase integration
- [ ] Create packages/node/scrapers scaffold
- [ ] Create packages/node/ai scaffold
- [ ] Create packages/browser/ui for shared components
- [ ] Create packages/browser/storage for browser storage

### Applications Scaffold

- [ ] Initialize NestJS API in apps/api
- [ ] Initialize Angular app in apps/web
- [ ] Initialize browser extension in apps/extension
- [ ] Initialize nest-commander CLI in apps/cli
- [ ] Set up E2E test structure in e2e/

### Core Schemas and Parsing (TDD)

- [ ] Write tests for BookmarkSchema parsing behavior
- [ ] Implement BookmarkSchema with transforms and defaults
- [ ] Write tests for TagSchema parsing and normalization
- [ ] Implement TagSchema with coercion
- [ ] Write tests for UserSchema parsing
- [ ] Implement UserSchema with graceful fallbacks
- [ ] Write tests for PersonaSchema configuration parsing
- [ ] Implement PersonaSchema with validation
- [ ] Create Result type utilities for error handling
- [ ] Implement parsing helper functions

### Database Setup

- [ ] Configure Supabase connection
- [ ] Create database migrations from Zod schemas
- [ ] Set up database seeding scripts
- [ ] Write tests for database repository pattern
- [ ] Implement repository with parsed results

### API Development (TDD)

- [ ] Write tests for bookmark creation with data parsing
- [ ] Implement bookmark controller with safeParse
- [ ] Write tests for bookmark update with partial data
- [ ] Implement update with graceful handling
- [ ] Write tests for tag normalization and deduplication
- [ ] Implement tag service with parsing
- [ ] Write tests for auth with Supabase
- [ ] Implement auth with parsed tokens

### Web App Foundation (TDD)

- [ ] Write tests for BookmarkCard with various props
- [ ] Implement BookmarkCard with prop parsing
- [ ] Write tests for BookmarkForm validation
- [ ] Implement form with Zod parsing and error display
- [ ] Write E2E tests for bookmark creation flow
- [ ] Implement creation with graceful error handling
- [ ] Write tests for bookmark list with filtering
- [ ] Implement list with parsed query params

### AI Personas (TDD)

- [ ] Write tests for persona configuration parsing
- [ ] Implement persona base class with safeParse
- [ ] Write tests for tag suggestion parsing
- [ ] Implement suggestion service with fallbacks
- [ ] Write tests for batch processing
- [ ] Implement batch with error recovery

### Scrapers (TDD)

- [ ] Write tests for scraper data parsing
- [ ] Implement base scraper with data normalization
- [ ] Write tests for Reddit data parsing
- [ ] Implement Reddit scraper with safeParse
- [ ] Write tests for HackerNews data parsing
- [ ] Implement HN scraper with transforms
- [ ] Write tests for Lemmy data parsing
- [ ] Implement Lemmy scraper with fallbacks
- [ ] Write tests for Twitter/X data parsing
- [ ] Implement Twitter scraper with coercion

### Browser Extension (TDD)

- [ ] Set up Firefox WebExtensions configuration
- [ ] Write tests for page metadata extraction
- [ ] Implement extraction with parsing
- [ ] Write tests for bookmark capture
- [ ] Implement capture with data normalization
- [ ] Write tests for quick tag interface
- [ ] Implement tagging with validation
- [ ] Connect to API with parsed responses

### CLI Tool (TDD)

- [ ] Write tests for CLI argument parsing
- [ ] Implement command parser with Zod
- [ ] Write tests for bookmark add command
- [ ] Implement add with input parsing
- [ ] Write tests for search command
- [ ] Implement search with query parsing
- [ ] Write tests for config file parsing
- [ ] Implement config with schema validation

### Testing Infrastructure

- [ ] Set up Jest for all packages
- [ ] Configure Playwright for E2E
- [ ] Create test data factories with valid schemas
- [ ] Set up test database with seed data
- [ ] Configure coverage reporting
- [ ] Create parsing test utilities

### CI/CD

- [ ] Set up GitHub Actions for testing
- [ ] Configure test matrix for packages
- [ ] Set up build pipeline
- [ ] Configure deployment with environment validation
- [ ] Add schema compatibility checks

### Documentation

- [ ] Create README.md with architecture overview
- [ ] Document parsing patterns and examples
- [ ] Create API documentation with schemas
- [ ] Document error handling patterns
- [ ] Add TDD workflow guide
- [ ] Create contribution guidelines

## Completed

<!-- Completed items will be moved here with completion dates -->
