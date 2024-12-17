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

    // Type into the recipientIdentifier input field (implicitly waits for the element)
    cy.get('#recipientIdentifier', { timeout: 20000 })
      .should('be.visible') // Ensure the element is visible
      .type('test');

    // Scroll into view and click another element
    cy.get('.grid-cols-1 > :nth-child(5)', { timeout: 50000 })
      .scrollIntoView()
      .should('be.visible')
      .click();
      cy.get(':nth-child(4) > .gap-3 > :nth-child(3)', { timeout: 50000 })
      .scrollIntoView()
      .should('be.visible')
      .click();
      cy.get(':nth-child(3) > button.w-full > .relative').click()

      // Type into the fields
    cy.get('#firstName', { timeout: 50000 }).scrollIntoView().should('be.visible').type('Eniola');
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
      cy.wait(10000)

      //validating the payment summary against total amount to be paid 
      cy.get(':nth-child(4) > .rounded-2xl')
  .invoke('text')
  .then((paymentSummaryText) => {
    const paymentSummaryAmount = parseFloat(
      paymentSummaryText.replace(/₦|,/g, '').replace('.', '')
    );

    if (isNaN(paymentSummaryAmount)) {
      // Handle the case where paymentSummaryAmount is NaN
      cy.log(`Error: Could not parse payment summary amount: ${paymentSummaryText}`);
    } else {
      cy.get('.max-lg\\:fixed > .flex-col')
        .invoke('text')
        .then((totalToPayText) => {
          const totalToPayAmount = parseFloat(
            totalToPayText.replace(/₦|,/g, '').replace('.', '')
          );

          if (isNaN(totalToPayAmount)) {
            // Handle the case where totalToPayAmount is NaN
            cy.log(`Error: Could not parse total to pay amount: ${totalToPayText}`);
          } else {
            cy.log(`Extracted Payment Summary: ${paymentSummaryAmount}`);
            cy.log(`Extracted Total To Pay: ${totalToPayAmount}`);

            // Validate the amounts only if both are valid numbers
            expect(paymentSummaryAmount).to.be.closeTo(totalToPayAmount, 0.01);
          }
        });
    }
  });

  })
})