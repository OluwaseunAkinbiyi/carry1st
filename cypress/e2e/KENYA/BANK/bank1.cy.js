describe('Payment Validation SA', () => {
    beforeEach(() => {
      // Set the viewport size before each test
      cy.viewport(1920, 1080);
    });
  
    it('validates payment flow in SA', () => {
      // Visit the website with increased timeout
      cy.visit('https://shop.platform.stage.carry1st.com', { timeout: 90000 });
  
      // Wait for the page to fully load by checking a key element
      cy.get('.rtl\\:font-noto-sans-arabic', { timeout: 60000 }).should('exist');
  
      // Click the first matching element
      cy.get('.rtl\\:font-noto-sans-arabic > :nth-child(4) > .gap-4', { timeout: 30000 }).first().click();
  
      // Focus on the input field, type the country, and select the suggestion
      cy.get('.countrySelectButton').type('Kenya'); // Type in the input
  
      // Replace the previous suggestion selector with your provided one
      cy.contains('Kenya')
        .should('be.visible')
        .click({ force: true });

        cy.get('[data-testid="save-settings"]').click();

        
         // Scroll into view and click the specified element
         cy.get('.max-sm\\:hidden > [href="/en/KE/product/carry1st-trivia-1/direct-topup"] > .group > .h-full', { timeout: 50000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });

;

  // Type into the recipientIdentifier input field (implicitly waits for the element)
  cy.get('#recipientIdentifier', { timeout: 20000 })
    .should('be.visible') // Ensure the element is visible
    .type('test');

  // Scroll into view and click another element
  cy.get('.grid-cols-1 > :nth-child(5)', { timeout: 50000 })
    .scrollIntoView()
    .should('be.visible')
    .click();

    cy.get(':nth-child(4) > .gap-3 > :nth-child(1)', { timeout: 50000 })
    .scrollIntoView()
    .should('be.visible')
    .click();

    cy.get(':nth-child(1) > button.w-full > .relative', { timeout: 50000 })
    .scrollIntoView()
    .should('be.visible')
    .click();


 // Type into the fields
 cy.get('#firstName', { timeout: 50000 }).scrollIntoView().should('be.visible').type('Eniola');
 cy.get('#lastName').type('Agbaje');
 cy.get('#email').type('eniolaomoyanola@gmail.com');
 cy.get('#phone').type('708374149');

 // Click the button
 cy.get('.flex-row > :nth-child(1) > .flex > button').click();


 // Handle bottom button click with force if necessary
 cy.get('.bottom-\\[66px\\] > .flex-row > .justify-center', { timeout: 50000 })
 .should('exist')
 .should('be.visible')
 .click({ force: true });


 cy.wait(9000)
  

     cy.get('.max-lg\\:fixed > .flex-col > .justify-center', { timeout: 50000 })
     .should('be.visible')
     .click();



   })
})