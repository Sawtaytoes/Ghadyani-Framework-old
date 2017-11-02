describe('Home', () => {
	beforeEach(() => cy.visit('/'))

	it('Has the correct <title>', () => {
		cy.title().should.be.equal('Home')
	})

	it('Has the correct page title', () => {
		cy.get('h1').should.be.equal('Hello World')
	})

	it('Has a clickable link', () => {
		cy.get('[href=/about').should.exist()
	})
})

describe('About', () => {
	beforeEach(() => cy.visit('/about'))

	it('Has the correct <title>', () => {
		cy.title().should.be.equal('About')
	})

	it('Has the correct page title', () => {
		cy.get('h1').should.be.equal('About')
	})

	it('Has a clickable link', () => {
		cy.get('[href=/').should.exist()
	})
})
