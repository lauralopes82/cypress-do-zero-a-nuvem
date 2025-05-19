//para colocar eles para funcionar e só colocar o '.only' no 'it'
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  });

  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatorios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxzy', 10)
    cy.get('#firstName').type('Laura')
    cy.get('#lastName').type('Santos Lopes')
    cy.get('#email').type('laurasantoslopes92@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0 })
   cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')})
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Laura')
    cy.get('#lastName').type('Santos Lopes')
    cy.get('#email').type('laurasantoslopes92@gmail,com')
    cy.get('#open-text-area').type('test')
   cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

  })
  
  it('campo de telefone continua  vazio quando preenchido com um numero não-numerico', () => {
    cy.get('#phone')
    .type('abcde')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Laura')
    cy.get('#lastName').type('Santos Lopes')
    cy.get('#email').type('laurasantoslopes92@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('#phone-checkbox').check()
   cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => { 
    cy.get('#firstName')
      .type('Laura')
      .should('have.value', 'Laura')
      .clear()      
      .should('have.value', '')
     
      cy.get('#lastName')
      .type('Santos Lopes')
      .should('have.value', 'Santos Lopes')
      .clear()      
      .should('have.value', '')

      cy.get('#email')
      .type('laurasantoslopes92@gmail.com')
      .should('have.value', 'laurasantoslopes92@gmail.com')
      .clear()      
      .should('have.value', '')

      cy.get('#phone')
      .type('098766')
      .should('have.value', '098766')
      .clear()      
      .should('have.value', '')
 })

 it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=> {
 cy.contains('button', 'Enviar').click()

  cy.get('.error').should('be.visible')
 })

 it('envia o formuário com sucesso usando um comando customizado', () => {
  cy.fillMandatoryFieldsAndSubmit()

  cy.get('.success').should('be.visible')
 })

it('seleciona um produto (YouTube) por seu texto', () => {
  cy.get('#product')
  .select('YouTube')
    .should('have.value', 'youtube')
})

it('selecione uma produto (Mentoria) por seu valor (value)', () => {
  cy.get('#product')
  .select('mentoria')
  .should('have.value', 'mentoria')
})

it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
  
  cy.get('#product')
  .select(1)
  .should('have.value', 'blog')

})

it('marca o tipo de atendimento "Feedback"', () => {
  cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked') // (opcional, mas recomendado)
})

it('marca cada tipo de atendimento', () => {
  cy.get('input[type="radio"]')
  .each(type0Service => {
    cy.wrap(type0Service)
    .check()
    .should('be.checked')
  })
})

it('marca ambos checkboxes, depois desmarca o último', () => {
  cy.get('input[type="checkbox"]').check()
  .should('be.checked')
  .last()
  .uncheck()
  .should('not.be.checked')
})

it('seleciona um arquivo da pasta fixtures', () => {
  cy.get('#file-upload')
  .selectFile('cypress/fixtures/example.json')
  .should(input => {
    expect(input[0].files[0].name).to.equal('example.json')
  })
})

it('seleciona um arquivo simulando um drag-and-drop', () =>{
  cy.get('#file-upload')
  .selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
  .should(input => {
    expect(input[0].files[0].name).to.equal('example.json')
  }) 
})


it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
  cy.get('#file-upload')
  .selectFile('cypress/fixtures/example.json', { action:'drag-drop'})
  .should(input => {
    expect(input[0].files[0].name).to.equal('example.json')
  }) 
})

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
  cy.fixture('example.json').as('sampleFile')
  cy.get('#file-upload')
  .selectFile('@sampleFile')
  .should(input => {
    expect(input[0].files[0].name).to.equal('example.json')
  })
})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
  cy.contains('a', 'Política de Privacidade')
  .should('have.attr', 'href', 'privacy.html')
  .and('have.attr', 'target', '_blank')
})

it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
  cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()

    cy.get('h1').should('contain.text', 'Política de Privacidade').and('be.visible')
});


})
