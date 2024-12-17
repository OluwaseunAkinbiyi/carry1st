const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    CLOUDFLARE_SITE_KEY: '1x00000000000000000000AA', // Test key
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Add Cypress custom command in the browser context
      on('task', {
        registerCustomCommands() {
          Cypress.Commands.add('waitForPageLoad', () => {
            cy.window().then((win) => {
              return new Cypress.Promise((resolve) => {
                win.addEventListener('load', () => resolve());
              });
            });
          });
          return null;
        },
      });
    },
    pageLoadTimeout: 1000000, // Increase page load timeout to ~16 minutes
    chromeWebSecurity: false, // Disable Chrome web security for iframe interactions
    viewportWidth: 1920, // Set default viewport width
    viewportHeight: 1080, // Set default viewport height
  },
  defaultCommandTimeout: 10000, // Set default command timeout to 10 seconds
});

