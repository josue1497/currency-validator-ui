/* eslint-disable no-undef */
// import { mount } from "@cypress/vue"
import Main from "../../src/views/Main"

describe("App", () => {
  it("render component", () => {
    cy.mount(Main)

    cy.get("h1").should("have.text", "Crypto - Fiat Converter")
  }),
  it('starts with zero items', () => {
    cy.visit('/')
    cy.get('.todo-list')
      .find('li')
      .should('have.length', 0)
  })

})
