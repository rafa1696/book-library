import MyBooks from './MyBooks'

const Home = () => {
	return (
		<div data-cy="home-page">
			<h1>Home</h1>
			<div>
				<MyBooks />
			</div>
		</div>
	)
}

export default Home
