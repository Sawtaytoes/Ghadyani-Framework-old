describe('Kitchen Sink', () => {
	it('.should() - assert that <title> is correct', function(){
		cy.visit('/')
		cy.title().should('include', 'Kitchen Sink')
	})
})

describe('Home', () => {
	beforeEach(() => cy.visit('/'))

	it('Has the correct <title>', () => {
		cy.title().should.be('Home')
	})

	it('Has the correct page title', () => {
		cy.get('h1').should.be('Hello World')
	})

	it('Has a clickable link', () => {
		cy.get('[href=/about').should.exist()
	})
})

// describe('About', () => {
// 	beforeEach(() => cy.visit('/about'))

// 	it('Has the correct <title>', () => {
// 		cy.title().should.be('About')
// 	})

// 	it('Has the correct page title', () => {
// 		cy.get('h1').should.be('About')
// 	})

// 	it('Has a clickable link', () => {
// 		cy.get('[href=/').should.exist()
// 	})
// })
