describe('Archive Page', () => {
  beforeEach(() => {
    cy.visit('/archive')
  })

  it('should load the archive page successfully', () => {
    cy.get('body').should('be.visible')
    cy.title().should('not.be.empty')
  })

  it('should display archive content', () => {
    // Check if there's any content on the archive page
    cy.get('main').should('exist')
    cy.get('main').should('not.be.empty')
  })

  it('should have proper page structure', () => {
    cy.get('header').should('exist')
    cy.get('main').should('exist')
    cy.get('footer').should('exist')
  })

  it('should be accessible', () => {
    // Check for proper heading structure
    cy.get('h1, h2, h3, h4, h5, h6').should('exist')
    
    // Check for proper link structure
    cy.get('a').should('have.attr', 'href')
  })
}) 