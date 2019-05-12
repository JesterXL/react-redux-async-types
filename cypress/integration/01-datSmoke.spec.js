describe('Smoke', () => {
    it('Visits the Kitchen Sink', () => {
      cy.visit('http://localhost:3000')
      cy.get('[data-cy-button="reload"]')
        .should('exist')
    })
  })