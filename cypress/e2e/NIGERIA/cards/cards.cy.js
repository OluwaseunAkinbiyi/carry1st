describe('Payment Validation SA', () => {
  beforeEach(() => {
    // Set the viewport size before each test
    cy.viewport(1920, 1080);
  });

  it('validates payment flow in SA', () => {
    // Visit the website with increased timeout
    cy.visit('https://shop.platform.stage.carry1st.com', { timeout: 90000 });

    // Scroll into view and click the specified element
    cy.get('.max-sm\\:hidden > [href="/en/NG/product/carry1st-trivia-1/direct-topup"] > .group > .h-full > .relative > .rounded-lg', { timeout: 50000 })
      .scrollIntoView()
      .should('be.visible')
      .click();

    // Type into the recipientIdentifier input field
    cy.wait(9000); // Adjusted wait time
    cy.get('#recipientIdentifier').type('test');

    // Scroll into view and click another element
    cy.get('.grid-cols-1 > :nth-child(5)', { timeout: 50000 })
      .scrollIntoView()
      .should('be.visible')
      .click();

    // PAYMENT WITH VERVE CARD  
    cy.get(':nth-child(12) > .relative', { timeout: 50000 })
      .scrollIntoView()
      .should('be.visible')
      .click();

    // Type into the fields
    cy.get('#firstName', { timeout: 50000 })
      .scrollIntoView()
      .should('be.visible')
      .type('Eniola');
    cy.get('#lastName').type('Agbaje');
    cy.get('#email').type('eniolaomoyanola@gmail.com');
    cy.get('#phone').type('8147633414');

    // Click the button
    cy.get('.flex-row > :nth-child(1) > .flex > button').click();

    // Handle bottom button click with force if necessary
    cy.get('.bottom-\\[66px\\] > .flex-row > .justify-center', { timeout: 50000 })
      .should('exist')
      .should('be.visible')
      .click({ force: true });

    // Fill in card details
   
    // Validate payment summary and total to pay
    cy.wait(50000)
    cy.get(':nth-child(4) > .rounded-2xl') // Selector for the payment summary
      .invoke('text')
      .then((paymentSummaryText) => {
        // Log the raw text to debug the content
        cy.log(`Raw Payment Summary Text: ${paymentSummaryText}`);

        // Clean and convert the payment summary amount
        const paymentSummaryAmount = parseFloat(paymentSummaryText.replace(/[^\d.]/g, '').trim()) / 100;
        
        // Log the cleaned amount to check for NaN
        cy.log(`Cleaned Payment Summary Amount: ${paymentSummaryAmount}`);

        // Get the total to pay amount
        cy.get('.max-lg\\:fixed > .flex-col') // Selector for total to pay
          .invoke('text')
          .then((totalToPayText) => {
            // Log the raw text to debug the content
            cy.log(`Raw Total To Pay Text: ${totalToPayText}`);

            // Clean and convert the total to pay amount
            const totalToPayAmount = parseFloat(totalToPayText.replace(/[^\d.]/g, '').trim()) / 100;

            // Log the cleaned amount to check for NaN
            cy.log(`Cleaned Total To Pay Amount: ${totalToPayAmount}`);

            // Assert that the payment summary matches the total to pay within a tolerance of 0.01
            expect(paymentSummaryAmount).to.be.closeTo(totalToPayAmount, 0.01);

            // Log the values for debugging
            cy.log(`Payment Summary Amount: ${paymentSummaryAmount}`);
            cy.log(`Total To Pay Amount: ${totalToPayAmount}`);
             




            //PAYMENT WITH CREDIT/DEBIT CARD 
            cy.get(':nth-child(1) > a > .flex-nowrap').click()
            // Scroll into view and click the specified element
   cy.get('[href="/en/NG/product/carry1st-trivia-1/direct-topup"] > .group > .h-full > .relative > .rounded-lg', { timeout: 50000 })
    .scrollIntoView()
    .should('be.visible')
    .click();

  // Type into the recipientIdentifier input field
  cy.wait(9000); // Adjusted wait time
  cy.get('#recipientIdentifier').type('test');

  // Scroll into view and click another element
  cy.get('.grid-cols-1 > :nth-child(5)', { timeout: 50000 })
    .scrollIntoView()
    .should('be.visible')
    .click();

    cy.get(':nth-child(4) > .gap-3 > :nth-child(1)').click()
    cy.get('.my-3 > button.w-full > .relative').click()
    cy.get('#firstName', { timeout: 50000 })
      .scrollIntoView()
      .should('be.visible')
      .type('Eniola');
    cy.get('#lastName').type('Agbaje');
    cy.get('#email').type('eniolaomoyanola@gmail.com');
    cy.get('#phone').type('8147633414');

    // Click the button
    cy.get('.flex-row > :nth-child(1) > .flex > button').click();

    // Handle bottom button click with force if necessary
    cy.get('.bottom-\\[66px\\] > .flex-row > .justify-center', { timeout: 50000 })
      .should('exist')
      .should('be.visible')
      .click({ force: true });

      cy.wait(9000)
    cy.get('#cardNumber').type('4084084084084081', { force: true });

    // Focus on the expiry date field and type the value
    cy.get('#expiryDate')
      .scrollIntoView()
      .type('06/25', { force: true });

    // Type CVV
    cy.get('#cvv').type('408', { force: true });

    // Click the confirm payment button
    cy.get('.text-\\[\\#757575\\] > .flex')
      .scrollIntoView()
      .should('be.visible')
      .click();

      

      

      cy.get('.max-lg\\:fixed > .flex-col > .justify-center', { timeout: 50000 })
            .should('be.visible')
            .click();

           



            

            
          

          });
      });
  });
});
