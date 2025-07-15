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

	it('renders', () => {
		cy.get('[data-cy=book-card]').should('exist')
	})
})
