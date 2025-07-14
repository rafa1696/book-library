import BookCard from './BookCard'

describe('<BookCard />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(<BookCard />)
	})
})
