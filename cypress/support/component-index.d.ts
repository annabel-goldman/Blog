/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    mount(component: React.ReactElement): Chainable<void>
  }
} 