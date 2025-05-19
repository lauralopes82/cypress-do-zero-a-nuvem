it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')

    cy.get('h1').should('contain.text', 'Política de Privacidade').and('be.visible')
    cy.contains('p', 'Talking About Testing').should('be.visible')
})