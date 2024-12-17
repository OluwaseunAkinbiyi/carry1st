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
//CHIPPER CASH PAYMENT METHOD
      cy.get(':nth-child(17) > .relative', { timeout: 50000 })
      .scrollIntoView()
      .should('be.visible')
      .click();

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
      cy.wait(9000)

      cy.get('#email') 
  .clear() 
  .type('networkapi+1@chippercash.com'); 
  cy.get('.h-full > .justify-center').click()

  // Extracting and validating the payment summary and total to pay
  cy.wait(5000); // Optional wait to allow for UI updates (adjust timing as needed)
  cy.get(':nth-child(4) > .rounded-2xl')
    .invoke('text')
    .then((paymentSummaryText) => {
      const paymentSummaryAmount = parseFloat(paymentSummaryText.replace(/[^\d.]/g, '').trim()) / 100;

      cy.get('.max-lg\\:fixed > .flex-col')
        .invoke('text')
        .then((totalToPayText) => {
          const totalToPayAmount = parseFloat(totalToPayText.replace(/[^\d.]/g, '').trim()) / 100;
          expect(paymentSummaryAmount).to.be.closeTo(totalToPayAmount, 0.01);
        });
    });


  })
})