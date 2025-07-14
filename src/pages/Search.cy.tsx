import { QueryClient, QueryClientProvider } from 'react-query'
import Search from './Search'
import { StaticRouter } from 'react-router-dom'

const queryClient = new QueryClient()

describe('<Search />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<QueryClientProvider client={queryClient}>
				<StaticRouter location="/search">
					<Search />
				</StaticRouter>
			</QueryClientProvider>
		)
	})
})
