# Cypress Testing Suite

This project includes a comprehensive Cypress testing suite for both end-to-end (E2E) and component testing.

## Setup

Cypress is already installed and configured. The following files have been set up:

- `cypress.config.ts` - Main Cypress configuration
- `cypress/support/` - Support files and custom commands
- `cypress/e2e/` - End-to-end test files
- `cypress/component/` - Component test files
- `cypress/fixtures/` - Test data files

## Available Scripts

- `npm run cypress:open` - Open Cypress Test Runner in interactive mode
- `npm run cypress:run` - Run Cypress tests in headless mode
- `npm run test:e2e` - Start dev server and run E2E tests
- `npm run test:component` - Run component tests

## Test Structure

### E2E Tests (`cypress/e2e/`)

- `homepage.cy.ts` - Tests for the main homepage
- `search.cy.ts` - Tests for search functionality
- `archive.cy.ts` - Tests for archive page

### Component Tests (`cypress/component/`)

- `example.cy.tsx` - Example component test

## Writing Tests

### E2E Test Example

```typescript
describe('Page Name', () => {
  beforeEach(() => {
    cy.visit('/page-url')
  })

  it('should load successfully', () => {
    cy.get('body').should('be.visible')
    cy.title().should('not.be.empty')
  })
})
```

### Component Test Example

```typescript
import React from 'react'

describe('Component Name', () => {
  it('should render correctly', () => {
    cy.mount(<YourComponent />)
    cy.get('[data-testid="component"]').should('be.visible')
  })
})
```

## Best Practices

1. Use descriptive test names
2. Test user interactions, not implementation details
3. Use data-testid attributes for reliable element selection
4. Keep tests independent and isolated
5. Use beforeEach hooks for common setup
6. Test both happy path and error scenarios

## Configuration

The Cypress configuration is in `cypress.config.ts` and includes:

- Base URL: `http://localhost:3000`
- Viewport: 1280x720
- Screenshots on failure enabled
- Video recording disabled
- Support for both E2E and component testing

## Running Tests

1. **Interactive Mode**: `npm run cypress:open`
2. **Headless Mode**: `npm run cypress:run`
3. **With Dev Server**: `npm run test:e2e`

## Troubleshooting

- Make sure the dev server is running on port 3000 for E2E tests
- Check that all dependencies are installed
- Verify TypeScript configuration is correct
- Ensure test files follow the naming convention `*.cy.{js,jsx,ts,tsx}` 