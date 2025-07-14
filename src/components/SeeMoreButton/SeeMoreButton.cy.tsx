import { StaticRouter } from 'react-router-dom'
import SeeMoreButton from './SeeMoreButton'

describe('<SeeMoreButton />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<StaticRouter location={'/'}>
				<SeeMoreButton />
			</StaticRouter>
		)
	})
})
