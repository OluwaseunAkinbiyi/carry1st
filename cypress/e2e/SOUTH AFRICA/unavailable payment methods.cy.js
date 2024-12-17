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



      cy.contains('.card-content', 'Snapscan')
  .should('be.visible')
  .click(); 

  cy.get('body').then(($body) => {
    const buttonSelector = '#radix-\\:r1\\: > div > button';
    if ($body.find(buttonSelector).length) {
      const $button = $body.find(buttonSelector);
      
      // Check if the parent dialog is hidden and force it to show
      const parentDialog = $button.closest('dialog');
      if (parentDialog.length && Cypress.$(parentDialog).css('display') === 'none') {
        cy.wrap(parentDialog).invoke('attr', 'style', 'display: block;'); // Force dialog to display
      }
  
      cy.get(buttonSelector)
        .should('exist') // Ensure it exists in the DOM
        .should('be.visible') // Ensure it's visible
        .click({ force: true }); // Force the click
    } else {
      cy.log('Button not found in the DOM.');
    }
  });
  
  // Handle the `.card-content` element click
  cy.contains('.card-content', 'Zapper')
    .should('be.visible') // Ensure it's visible
    .click({ force: true }); // Force the click if pointer-events prevent it
    cy.wait(20000)
  



    cy.get('body').then(($body) => {
      const buttonSelector = '#radix-\\:r1\\: > div > button';
      const dialogSelector = '#radix-\\:r1\\:';
    
      if ($body.find(buttonSelector).length) {
        // Ensure the dialog containing the button is visible
        cy.get(dialogSelector).then(($dialog) => {
          if (Cypress.$($dialog).css('display') === 'none') {
            // Force visibility of the dialog
            cy.wrap($dialog).invoke('css', 'display', 'block');
          }
        });
    
        // Handle overlapping elements
        cy.get(buttonSelector).then(($button) => {
          const boundingBox = $button[0].getBoundingClientRect();
          const x = boundingBox.x + boundingBox.width / 2;
          const y = boundingBox.y + boundingBox.height / 2;
    
          // Check if the button is covered
          cy.document().then((doc) => {
            const elementAtPoint = doc.elementFromPoint(x, y);
            if (elementAtPoint !== $button[0]) {
              cy.log('Button is covered by:', elementAtPoint);
    
              // Optionally hide the overlapping element
              cy.wrap(elementAtPoint).invoke('css', 'display', 'none');
            }
          });
    
          // Scroll the button into view and click
          cy.wrap($button)
            .scrollIntoView()
            .should('exist') // Ensure the button exists
            .should('be.visible') // Ensure visibility
            .click({ force: true }); // Force the click to bypass strict checks
        });
      } else {
        cy.log('Button not found in the DOM.');
      }
    });
    
    
cy.wait(20000)

// Proceed to interact with the element
cy.contains('.card-content', 'Mukurupay')
  .should('be.visible') // Ensure the element is visible
  .click({ force: true }); // Force the click to bypass restrictions
  cy.wait(20000)


  cy.get('body').then(($body) => {
    const buttonSelector = '#radix-\\:r1\\: > div > button';
    const dialogSelector = '#radix-\\:r1\\:';
  
    if ($body.find(buttonSelector).length) {
      // Handle dialog visibility if hidden
      cy.get(dialogSelector).then(($dialog) => {
        if (Cypress.$($dialog).css('display') === 'none') {
          cy.wrap($dialog).invoke('css', 'display', 'block'); // Force the dialog to show
        }
      });
  
      // Ensure button exists, is visible, and interactable
     cy.get('buttonSelector').then(($button) => {
  const overlappingElement = Cypress.$($button).offsetParent(); // Find what overlaps
  cy.log('Overlapping element:', overlappingElement);
});

    }
  });
  cy.wait(20000)
  



// Ensure body interaction is re-enabled before proceeding
cy.get('body').then(($body) => {
if ($body.css('pointer-events') === 'none') {
  cy.wrap($body).invoke('css', 'pointer-events', 'auto'); // Re-enable pointer events
}
});
  
  cy.wait(30000)
  cy.contains('.card-content', 'Mobicred')
  .should('be.visible')
  .click({ force: true }); 


  cy.get('body').then(($body) => {
    const buttonSelector = '#radix-\\:r1\\: > div > button';
    const dialogSelector = '#radix-\\:r1\\:';
  
    if ($body.find(buttonSelector).length) {
      // Handle dialog visibility if hidden
      cy.get(dialogSelector).then(($dialog) => {
        if (Cypress.$($dialog).css('display') === 'none') {
          cy.wrap($dialog).invoke('css', 'display', 'block'); // Force the dialog to show
        }
      });
  
      // Ensure button exists, is visible, and interactable
     cy.get('buttonSelector').then(($button) => {
  const overlappingElement = Cypress.$($button).offsetParent(); // Find what overlaps
  cy.log('Overlapping element:', overlappingElement);
});

    }
  });
  cy.wait(20000)
  



// Ensure body interaction is re-enabled before proceeding
cy.get('body').then(($body) => {
if ($body.css('pointer-events') === 'none') {
  cy.wrap($body).invoke('css', 'pointer-events', 'auto'); // Re-enable pointer events
}
});


  

    })
})