describe('Simple stack tests', () => {
  it('Login flow', () => {
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
    cy.visit('/')
    cy.get('h1').contains('Team')
    cy.get('button').contains('Log in').click()
    cy.url().should('include', '/signin')
    cy.get('input[type="email"]').type('l1@gmail.com')
    cy.get('input[type="password"]').type('1234')
    cy.get('button').contains('Submit').click({timeout: 7500})
    cy.get('a[href*="dashboard"]').should('be.visible')
  })
})