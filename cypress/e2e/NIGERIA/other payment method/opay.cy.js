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
    cy.get('#recipientIdentifier', { timeout:20000 })
      .should('be.visible') // Ensure the element is visible
      .type('test');

    // Scroll into view and click another element
    cy.get('.grid-cols-1 > :nth-child(5)', { timeout: 50000 })
      .scrollIntoView()
      .should('be.visible')
      .click();


      //select opay wallet as payment method
      cy.get(':nth-child(8) > .relative', { timeout: 50000 })
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
      cy.wait(5000)

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
          })
        })
        // selecting opay QR wallet as payment method
        cy.get(':nth-child(1) > a > .flex-nowrap').click()
        // Scroll into view and click the specified element
cy.get('[href="/en/NG/product/carry1st-trivia-1/direct-topup"] > .group > .h-full > .relative > .rounded-lg', { timeout: 50000 })
.scrollIntoView()
.should('be.visible')
.click();

// Type into the recipientIdentifier input field
cy.wait(90000); // Adjusted wait time
cy.get('#recipientIdentifier').type('test');

// Scroll into view and click another element
cy.get('.grid-cols-1 > :nth-child(5)', { timeout: 50000 })
.scrollIntoView()
.should('be.visible')
.click();
cy.get(':nth-child(9) > .relative', { timeout: 50000 })
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
  cy.wait(50000)

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
        })
      })


      //okra bank
      cy.get('.ml-auto').click()
      cy.get(':nth-child(15) > .relative.flex-col > .card', { timeout: 50000 })
      .scrollIntoView()
      .should('be.visible')
      .click()
      
      //verify user can use edit button to user details
      cy.get('.card-header > .ltr\\:text-right', { timeout: 30000 })
  .should('be.visible')
  .click();
  cy.get('#phoneNumber') // Select the phone number input by ID
  .clear() // Clear any existing text
  .type('08012345678');

  cy.get('.h-full > .justify-center').click()

      //palmpay payment method 
      cy.get('.ml-auto').click()
      cy.get(':nth-child(7) > .relative.flex-col > .card', { timeout: 50000 })
      .scrollIntoView()
      .should('be.visible')
      .click()

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
        })
      })

//VALIDATE FOR GEM PAYMENT METHOD
cy.get('.ml-auto').click()


  })
})