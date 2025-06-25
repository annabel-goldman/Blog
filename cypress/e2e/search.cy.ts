describe('Search Functionality', () => {
  beforeEach(() => {
    cy.visit('/search')
  })

  it('should load the search page successfully', () => {
    cy.get('body').should('be.visible')
    cy.title().should('not.be.empty')
  })

  it('should have a search input field', () => {
    cy.get('.max-w-2xl > form.relative > .relative > .w-full').should('exist')
  })

  it('should allow typing in search field', () => {
    const searchTerm = 'test search'
    cy.get('.max-w-2xl > form.relative > .relative > .w-full')
      .first()
      .type(searchTerm)
      .should('have.value', searchTerm)
  })

  it('should show search results or no results message', () => {
    // Type a search term
    cy.get('.max-w-2xl > form.relative > .relative > .w-full')
      .first()
      .type('test')
      .type('{enter}')
    // Should show either results or a no results message
    cy.get('body').should('contain.text', 'test')
  })
}) 