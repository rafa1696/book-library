import { StaticRouter } from 'react-router-dom'
import Home from './Home'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BookLibraryContext } from '../context/BookLibraryContext'
import { getMockBookLibraryContext } from '../context/__mocks__/mockBookLibraryContext'

describe('<Home />', () => {
	beforeEach(() => {
		const queryClient = new QueryClient()

		cy.mount(
			<QueryClientProvider client={queryClient}>
				<StaticRouter location={'/'}>
					<Home />
				</StaticRouter>
			</QueryClientProvider>
		)
	})

	context('when the component is rendered', () => {
		it('it should load the home page', () => {
			cy.get("[data-cy='home-page']").should('exist')
		})

		it("the title should be 'Home'", () => {
			cy.get('h1').should('have.text', 'Home')
		})
	})

	context('when we do NOT have books saved', () => {
		it("should display message 'You have no books saved'", () => {
			cy.get("[data-cy='empty-shelf-message']").should('exist')
			cy.get("[data-cy='empty-shelf-message']").should(
				'have.text',
				'Parece que não há livros em sua biblioteca, comece pesquisando!'
			)
		})
	})

	context('when we HAVE books saved', () => {
		it('should display the saved books', () => {
			const queryClient = new QueryClient()

			const mockBooks = [
				{
					id: '-bF2CwAAQBAJ',
					bookAddDate: Date.now(),
					bookName: 'Harry Potter e o prisioneiro de Azkaban',
				},
				{
					id: '-bF2CwAAQBAJ',
					bookAddDate: Date.now(),
					bookName: 'Harry Potter e o prisioneiro de Azkaban',
				},
				{
					id: '-bF2CwAAQBAJ',
					bookAddDate: Date.now(),
					bookName: 'Harry Potter e o prisioneiro de Azkaban',
				},
			]
			const mockContextValue = getMockBookLibraryContext(mockBooks)

			cy.fixture('books.json').then((book) => {
				const bookItem = book.items[0]

				cy.intercept(
					{
						method: 'GET',
						url: 'https://www.googleapis.com/books/v1/volumes/*',
					},
					{
						delay: 2000,
						body: bookItem, // Aqui você passa o objeto diretamente!
					}
				).as('getBookItem')

				cy.mount(
					<BookLibraryContext.Provider value={mockContextValue}>
						<QueryClientProvider client={queryClient}>
							<StaticRouter location={'/'}>
								<Home />
							</StaticRouter>
						</QueryClientProvider>
					</BookLibraryContext.Provider>
				)

				cy.wait('@getBookItem').then((interception) => {
					cy.log('Intercepted:', interception)
					console.log('Intercepted:', interception)
				})

				// Exemplo: verifica se o card do livro aparece
				cy.get('ul li').should('exist')
			})
		})

		it('should display errors when books do not load', () => {
			// Cria um QueryClient sem cache e sem retry para garantir o erro
			const queryClient = new QueryClient({
				defaultOptions: {
					queries: {
						retry: false,
						cacheTime: 0,
					},
				},
			})

			const mockBooks = [
				{
					id: '-bF2CwAAQBAJ',
					bookAddDate: Date.now(),
					bookName: 'Harry Potter e o prisioneiro de Azkaban',
				},
			]
			const mockContextValue = getMockBookLibraryContext(mockBooks)

			cy.intercept(
				{
					method: 'GET',
					url: 'https://www.googleapis.com/books/v1/volumes/*',
				},
				{
					statusCode: 500,
					body: { isError: true },
				}
			).as('getBookItemError')

			cy.mount(
				<BookLibraryContext.Provider value={mockContextValue}>
					<QueryClientProvider client={queryClient}>
						<StaticRouter location={'/'}>
							<Home />
						</StaticRouter>
					</QueryClientProvider>
				</BookLibraryContext.Provider>
			)

			cy.wait('@getBookItemError')

			cy.get('[data-cy="home-page"] > :nth-child(2) > div').should(
				'have.text',
				'Erro ao carregar alguns livros.'
			)
		})
	})
})
