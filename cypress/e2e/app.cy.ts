const baseURL = 'http://localhost:4200';

describe('App', () => {
  describe('Register Form', () => {
    it('should display Register when access root page', () => {
      cy.visit(baseURL);
      cy.contains(/register/i);
      cy.contains(/add/i);
    });

    it('should emit errors when inputs are invalid', () => {
      cy.get('#name-input').click();
      cy.get('#phone-input').click();
      cy.contains(/register/i).click();

      cy.get('#name-input').should('have.class', 'ng-invalid');
      cy.get('#phone-input').should('have.class', 'ng-invalid');
      cy.contains(/name is required/i);
      cy.contains(/phone number is required/i);
      cy.get('#action-button').should('be.disabled');
    });

    it('should routes to dashboard when complete form stage', () => {
      cy.get('#name-input').type('John Doe');
      cy.get('#phone-input').type('1234567890');
      cy.get('#action-button').click();

      cy.url().should('include', '/dashboard');
      cy.contains(/john doe/i);
      cy.contains(/1234567890/i);
    });
  });

  describe('Dashboard', () => {
    it('should display user info', () => {
      cy.contains(/john doe/i);
      cy.contains(/1234567890/i);
    });

    it('should remove user', () => {
      cy.get('#delete-button').click();
      cy.contains(/john doe/i).should('not.exist');
      cy.contains(/1234567890/i).should('not.exist');
    });

    it('should add user', () => {
      cy.get('#add-button').click();
      cy.url().should('include', '/add');
      cy.get('#name-input').type('John Doe');
      cy.get('#phone-input').type('1234567890');
      cy.get('#action-button').click();

      cy.url().should('include', '/dashboard');
      cy.contains(/john doe/i);
      cy.contains(/1234567890/i);
    });

    it('should edit user', () => {
      cy.get('#edit-button').click();
      cy.url().should('include', '/edit');
      cy.get('#name-input').should('have.value', 'John Doe');
      cy.get('#phone-input').should('have.value', '1234567890');
      cy.get('#name-input').clear().type('James Smith');
      cy.get('#phone-input').clear().type('0987654321');
      cy.get('#action-button').click();
      cy.url().should('include', '/dashboard');
      cy.contains(/james smith/i);
      cy.contains(/0987654321/i);
    });
  });
});
