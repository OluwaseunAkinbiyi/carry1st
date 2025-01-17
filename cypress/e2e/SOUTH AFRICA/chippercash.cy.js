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
      cy.get('.rtl\\:font-noto-sans-arabic > :nth-child(4) > .gap-4').first().click();
  
      // Focus on the input field, type the country, and select the suggestion
      cy.get('.countrySelectButton').type('South Africa'); // Type in the input
  
      // Replace the previous suggestion selector with your provided one
      cy.contains('South Africa')
        .should('be.visible')
        .click();
  
      cy.get('[data-testid="save-settings"]').click();
  
      // Wait for the next page to load by checking a key element
      cy.get('#autocomplete-5-input', { timeout: 60000 }).should('be.visible');
  
      // Type into the search bar
      cy.get('#autocomplete-5-input').type('Razer Gold', { delay: 100 });
  
      // Select the product from the suggestion list
      cy.get('[id^="autocomplete-5-productsPlugin-item"] > div > div', { timeout: 10000 })
        .contains('Razer Gold')
        .should('be.visible')
        .click();
        cy.wait(20000)
  
      // Choose Razer Gold
      cy.get('[href="/en/ZA/productBundle/razer-gold-pin-usd-5-261"]').click();
      cy.wait(30000)
  
      // Enter the recipient identifier
      cy.get('#recipientIdentifier').type('eniolaomoyanola@gmail.com');
      cy.wait(20000)
  
      // Click the submit button
      cy.get('.flex-col > .justify-center').click();
      cy.wait(20000)
  
      // Wait for the button to appear and be clickable
      cy.get('.bg-\\[\\#83CB3D\\]', { timeout: 20000 })
        .should('exist') // Verify it exists
        .should('be.enabled') // Verify it's enabled (if applicable)
        .click({ force: true });
  
      // Proceed with payment
      cy.get('.h-max > .justify-center').click(); 
      cy.wait(30000)
  
      // Select the card method
      cy.get('[data-sentry-element="Link"] > .relative.flex-col > .card').click();
  
      cy.wait(30000)
  
      cy.contains('.relative.flex-col > .card', 'Chipper South Africa')
      .scrollIntoView()
    .should('be.visible')
    .click();

    cy.get('#phoneNumber', { timeout: 50000 }) // Target the email input field
  .should('exist')                  // Ensure it exists
  .should('be.visible')             // Ensure it's visible
  .click({ force: true });    // Input the new number


    cy.get('#email', { timeout: 50000 }) // Target the email input field
  .should('exist')                  // Ensure it exists
  .should('be.visible')             // Ensure it's visible
  .clear()                          // Clear any existing value
  .type('network+2@chippercash.com');    // Input the new email


  cy.get('.h-full > .justify-center', { timeout: 20000 })
  .should('exist') // Verify it exists
  .should('be.enabled') // Verify it's enabled (if applicable)
  .click({ force: true });

//asserting user can proceed to pay with chipper cash
cy.get('.max-lg\\:fixed > .flex-col > .justify-center', { timeout: 50000 })
.should('exist')
.should('be.visible')
.debug() // This will log the element details to the Cypress console
.click({ force: true }); 


    })
})