describe('Login', () => {
    it('If I login with an amazing user and pass it should work', ()=> {
        cy.server()
        cy.route({
            method: 'POST',
            url: '/login',
            response: '{"result": "login success"}',
            status: 200
        })

        cy.fixture('foods').as('foodlist')
        cy.route({
            method: 'GET',
            url: '/food/list',
            response: '@foodlist',
            status: 200
        })

        cy.visit('http://localhost:3000')
        cy.get('#username')
            .type('cow')
        cy.get('#password')
            .type('moo')
        cy.get('[data-cy-login-button]')
            .click()
            
        cy.get('[data-cy-food-name="Avacado"]')
            .should('exist')
    })
    it('it should fail if bad user pass', ()=> {
        cy.server()
        cy.route({
            method: 'POST',
            url: '/login',
            response: '',
            status: 401
        })

        cy.visit('http://localhost:3000')
        cy.get('#username')
            .type('asdf')
        cy.get('#password')
            .type('asdf')
        cy.get('[data-cy-login-button]')
            .click()

        cy.contains('Login Failed')
    })
})