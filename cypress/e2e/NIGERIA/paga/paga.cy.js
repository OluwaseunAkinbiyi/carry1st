describe('Payment Validation SA', () => {
  // Handle uncaught exceptions to prevent test failures
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes("Cannot read properties of null (reading 'postMessage')")) {
      return false; // Prevent Cypress from failing the test
    }
    return true;
  });

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
    cy.get('#recipientIdentifier', { timeout: 20000 }).should('exist').type('test');

    // Scroll into view and click another element
    cy.get('.grid-cols-1 > :nth-child(5)', { timeout: 50000 })
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.get(':nth-child(4) > .gap-3 > :nth-child(2)', { timeout: 50000 })
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.get(':nth-child(1) > button.w-full > .relative').click();

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

    // Input number and click the orange button
    cy.get('.pc-input').type('07023236680');
    cy.get('.pc-orange-button').click();

    // Assert title is present
    cy.get('.pc-title')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const normalizedText = text.replace(/\s+/g, ' ').trim();
        expect(normalizedText).to.eq('Enter 5-digit verification code to validate your device');
      });

    // Second page wallet v2 option
    cy.get('div.text-center > a').click();
    cy.get('.bg-\\[\\#0072EC\\]', { timeout: 20000 }).should('be.visible').click({ force: true });

    cy.get(':nth-child(2) > .card', { timeout: 20000 }).should('be.visible').click({ force: true });

    // Validating PROVIDUS BANK is not available under the list of PAGA GROUP
    cy.get(':nth-child(4) > .relative.flex-col > .card') // Selector for the payment method
      .should('be.visible')
      .within(() => {
        // Using cy.contains to check for the availability message
        cy.contains('Currently unavailable', { timeout: 20000 }) 
          .should('be.visible')
          .invoke('text')
          .then((text) => {
            const normalizedText = text.replace(/\s+/g, ' ').trim();
            expect(normalizedText).to.eq('Currently unavailable');
          });
      });

    // Click another card option
    cy.get(':nth-child(3) > .relative.flex-col > .card', { timeout: 20000 })
      .should('be.visible')
      .click({ force: true });

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
  });
});
