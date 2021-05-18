Cypress.Commands.add("loginTestUser", () => {
    cy.viewport(1920, 1080);
    return cy.visit("http://localhost:8000/api/test/login");
});
