import { StaticRouter } from 'react-router-dom'
import Home from './Home'
import { QueryClient, QueryClientProvider } from 'react-query'

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
})
