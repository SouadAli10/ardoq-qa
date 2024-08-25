const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://magento.softwaretestingboard.com',
    viewportHeight: 750,
    viewportWidth: 1500,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: true,
      json: false,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
