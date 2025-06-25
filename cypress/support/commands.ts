/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Example custom commands (commented out to avoid TypeScript errors)
// Uncomment and modify these as needed for your specific use cases

// Custom command to wait for page load
// Cypress.Commands.add('waitForPageLoad', () => {
//   cy.get('body').should('be.visible')
//   cy.window().its('document').its('readyState').should('eq', 'complete')
// })

// Custom command to check if element is visible and clickable
// Cypress.Commands.add('shouldBeVisibleAndClickable', (selector: string) => {
//   cy.get(selector).should('be.visible').should('not.be.disabled')
// })

// Custom command to type with delay (useful for forms)
// Cypress.Commands.add('typeWithDelay', (selector: string, text: string, delay: number = 100) => {
//   cy.get(selector).clear().type(text, { delay })
// })