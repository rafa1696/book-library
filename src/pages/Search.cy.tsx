import { QueryClient, QueryClientProvider } from 'react-query'
import Search from './Search'
import { StaticRouter } from 'react-router-dom'

const queryClient = new QueryClient()

describe('<Search />', () => {
	beforeEach(() => {
		cy.mount(
			<QueryClientProvider client={queryClient}>
				<StaticRouter location="/search">
					<Search />
				</StaticRouter>
			</QueryClientProvider>
		)
	})

	context('when rendered', () => {
		it('it displays the search page', () => {
			cy.get('[cy-data="search-page"]').should('exist')
		})

		it('renders the search input', () => {
			cy.get('[data-cy="search-input-textbox"]').should('exist')
		})
	})

	context('when interacting with the search input', () => {
		it('text is inputed correctly', () => {
			cy.get('[data-cy="search-input-textbox"]').type('Harry Potter')
			cy.get('[data-cy="search-input-textbox"]').should('have.value', 'Harry Potter')
		})
	})

	context('when clicking the search button', () => {
		beforeEach(() => {
			cy.intercept(
				{
					method: 'GET',
					url: 'https://www.googleapis.com/books/v1/volumes*',
				},
				{
					delay: 2000,
					fixture: 'books.json',
				}
			).as('getBooks')

			cy.get('[data-cy="search-input-textbox"]').type('Harry Potter')
			cy.get('[data-cy="search-input-textbox"]').should('have.value', 'Harry Potter')

			cy.get('[data-cy="search-button"]').click()
		})

		it('displays loading skeleton when data is loading', () => {
			cy.get('.react-loading-skeleton').should('exist')
		})

		it('displays book cards when books are loaded', () => {
			cy.wait('@getBooks').then((interception) => {
				cy.log('Intercepted:', interception)
			})

			cy.get("[data-cy='book-card").should('have.length.greaterThan', 0)
		})
	})
})
