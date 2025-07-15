import { StaticRouter } from 'react-router-dom'
import SeeMoreButton from './SeeMoreButton'

describe('<SeeMoreButton />', () => {
	it('renders', () => {
		cy.mount(
			<StaticRouter location={'/'}>
				<SeeMoreButton />
			</StaticRouter>
		)
	})
})
