/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */
    beforeEach(() => {
        produtosPage.visitarUrl()
    });
    
    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        let qtd = 2
        produtosPage.buscarProdutoLista('Ariel Roll Sleeve Sweatshirt')
        cy.wait(500)
        produtosPage.addProdutoCarrinho('M', 'Green', qtd)
        cy.get('.woocommerce-message').should('contain', qtd + ' × “Ariel Roll Sleeve Sweatshirt” foram adicionados no seu carrinho.')
        cy.get('.woocommerce-message > .button').click()
    
        produtosPage.visitarUrl()
        produtosPage.buscarProdutoLista('Aether Gym Pant')
        cy.wait(500)
        produtosPage.addProdutoCarrinho('36', 'Brown', qtd)
        cy.get('.woocommerce-message').should('contain', qtd + ' × “Aether Gym Pant” foram adicionados no seu carrinho.')
        cy.get('.woocommerce-message > .button').click()
    
        produtosPage.visitarUrl()
        produtosPage.buscarProdutoLista('Abominable Hoodie')
        cy.wait(500)
        produtosPage.addProdutoCarrinho('M', 'Green', qtd)
        cy.get('.woocommerce-message').should('contain', qtd + ' × “Abominable Hoodie” foram adicionados no seu carrinho.')
        cy.get('.woocommerce-message > .button').click()
        
        produtosPage.visitarUrl()
        produtosPage.buscarProdutoLista('Aero Daily Fitness Tee')
        cy.wait(500)
        produtosPage.addProdutoCarrinho('M', 'Brown', qtd)
        cy.get('.woocommerce-message').should('contain', qtd + ' × “Aero Daily Fitness Tee” foram adicionados no seu carrinho.')
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        
        cy.get('#billing_first_name').type('Maria')
        cy.get('#billing_last_name').type('Chesp')
        cy.get('#select2-billing_country-container').click()
        cy.wait(500)
        cy.get('.select2-search__field').type('Brasil').type('{enter}')
        cy.get('#billing_address_1').type('av123, numero20')
        cy.get('#billing_city').type('São Paulo')
        cy.get('#select2-billing_state-container').click()
        cy.get('.select2-search__field').type('São Paulo').type('{enter}')
        cy.get('#billing_postcode').type('01153 000')
        cy.get('#billing_phone').type('0119223300')
        cy.get('#billing_email').type('chesp.teste@teste.com')
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    
    
    });
});

