describe('Calorie Count', () => {
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

      cy.get('[data-cy-total-calories]')
        .contains('0')
      cy.get('[data-cy-food-name="Avacado"]')
        .click()
      cy.get('[data-cy-total-calories]')
          .contains('160')
    
    })
  })