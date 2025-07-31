describe('googleBooks API', () => {
	it('fetches books based on query using cy.api', () => {
		const query = '-bF2CwAAQBAJ'
		cy.api({
			url: `https://www.googleapis.com/books/v1/volumes?q=${query}`,
			method: 'GET',
		}).then((response) => {
			expect(response.status).to.eq(200)
			expect(response.body.items).to.be.an('array')
			expect(response.body.items.length).to.be.at.most(10)
		})
	})
})
