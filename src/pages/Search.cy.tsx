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

	it('renders', () => {})

	it('renders the search input', () => {
		cy.get('[data-cy="search-input-textbox"]').should('exist')
	})

	it('text is inputed correctly', () => {
		cy.get('[data-cy="search-input-textbox"]').type('Harry Potter')
		cy.get('[data-cy="search-input-textbox"]').should('have.value', 'Harry Potter')
	})

	it('displays loading skeleton when data is loading', () => {
		cy.intercept(
			'GET',
			'https://www.googleapis.com/books/v1/volumes?q=Harry+Potter&maxResults=10',
			{
				delay: 1000,
				fixture: 'books.json',
			}
		).as('getBooks')

		cy.get('[data-cy="search-input-textbox"]').type('Harry Potter')
		cy.get('[data-cy="search-input-textbox"]').should('have.value', 'Harry Potter')

		cy.get('[data-cy="search-button"]').click()

		cy.wait('@getBooks').then((interception) => {
			cy.log('Intercepted:', interception)
		})

		cy.get('.react-loading-skeleton').should('exist')
	})
})
