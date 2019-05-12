describe('Load Foods', () => {
    it('should show table when successfully loads', () => {
      cy.server()
      cy.fixture('foodlist').as('foodlist')
      cy.route({
        method: 'GET',
        url: '/food/list',
        response: '@foodlist',
        status: 200
      })
      cy.visit('http://localhost:3000')
      cy.get('[data-cy-foods-table]')
        .should('exist')
    })
    it('should show error screen when it fails', () => {
      cy.server()
      cy.route({
        method: 'GET',
        url: '/food/list',
        response: '',
        status: 500
      })
      cy.visit('http://localhost:3000')
      // cy.contains('Failed to load food list')
      cy.get('[data-cy-error-screen]')
        .should('exist')
    })
  })