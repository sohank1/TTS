describe("auth", () => {
    beforeEach(() => {
        cy.loginTestUser();
    });

    it("login should login test user", () => {
        cy.waitFor(".dashboard-user");
        cy.get(".dashboard-user").contains("Test1");
    });

    it("logout", () => {
        cy.waitFor(".dashboard-user");
        cy.get(".dashboard-user").click();
        cy.get(".logout").click();
        expect(localStorage.getItem("ac")).to.be.null;
    });
});
