describe('Smoke', () => {
    it('The site works bruh', () => {
      cy.visit('http://localhost:3000')
      cy.get('[data-cy-button="reload"]')
        .should('exist')
    })
  })