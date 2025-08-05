import { StaticRouter } from 'react-router-dom'
import BookCard from './BookCard'

describe('<BookCard />', () => {
	beforeEach(() => {
		cy.fixture('singleBook').then((book) => {
			cy.mount(
				<StaticRouter location="/">
					<BookCard book={book} />
				</StaticRouter>
			)
		})
	})

	context('when rendered', () => {
		it('it displays the book card', () => {
			cy.get('[data-cy=book-card]').should('exist')
		})
	})

	context('when clicking on the book card "buy button"', () => {
		it('it opens the book product page in a new tab', () => {
			cy.window().then((win) => {
				cy.stub(win, 'open').as('open')
			})

			cy.get('[data-cy=book-card] [data-cy=product-page-button]').should('exist').click()

			cy.get('@open').should('have.been.calledWithMatch')
		})
	})
})
