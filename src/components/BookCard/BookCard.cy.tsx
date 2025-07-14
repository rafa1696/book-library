import { StaticRouter } from 'react-router-dom'
import BookCard from './BookCard'

describe('<BookCard />', () => {
	beforeEach(() => {
		cy.fixture('singleBook').then((book) => {
			//@ts-ignore
			cy.mount(
				<StaticRouter location="/">
					<BookCard book={book} />
				</StaticRouter>
			)
		})
	})

	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.get('[data-cy=book-card]').should('exist')
	})
})
