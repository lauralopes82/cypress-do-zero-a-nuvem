//criando comando custumizado
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Bruno',
    lastName: 'Alba', 
    email: 'bruno.albaxonadodemaislaura@gmail.com',
    text: 'Teste.'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()
})