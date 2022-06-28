/* eslint-disable no-undef */

describe("UI", () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  })
  it("loads the app", () => {
    cy.get("h1").should("be.visible")
  })

  it("search inputs", () => {
    cy.get('input[data-cy="currency-input"]').find("input").should("eq", 2)
  })
})
