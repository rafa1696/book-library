import { useFetchBooks } from '../hooks/useFetchBooks'
import BookCard from '../components/BookCard/BookCard'
import Gallery from '../components/Gallery/Gallery'
import { useBookLibraryContext } from '../context/BookLibraryContext'
import GalleryFilter from '../components/GalleryFilter/GalleryFilter'
import { FilterTypes } from '../enums/FilterTypes.enum'
import { ContentType } from '../enums/ContentType.enum'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { locationCheck } from '../utils/locationCheck'
import SeeMoreButton from '../components/SeeMoreButton/SeeMoreButton'

const MyBooks: FC = () => {
	const [searchParams] = useSearchParams()
	const [hasRun, setHasRun] = useState(false)

	const checkForLocation = locationCheck()

	const bookIdFromHome = searchParams.get('bookId') || ''

	const { savedBooks, reorderEntries } = useBookLibraryContext()

	const myBooksQuery = useFetchBooks({
		ids: savedBooks
			? checkForLocation === 0
				? savedBooks.slice(0, 4).map((book) => book.id)
				: savedBooks.map((book) => book.id)
			: [],
	})

	const handleFilterChange = (filterType: FilterTypes) => {
		reorderEntries(filterType, ContentType.Book)
	}

	const returnTitle = () => {
		switch (checkForLocation) {
			case 1:
				return <h1>Biblioteca</h1>
			case 0:
				return null
			default:
				break
		}
	}

	useEffect(() => {
		if (bookIdFromHome && hasRun === true) {
			const elementToScroll = document.querySelector(`[book-id-data="${bookIdFromHome}"]`)

			if (elementToScroll) elementToScroll.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}, [hasRun, bookIdFromHome])

	if (myBooksQuery.some((query) => query.isLoading)) {
		return (
			<div>
				<Skeleton height={'100vh'} />
			</div>
		)
	}

	if (myBooksQuery.some((query) => query.isError)) {
		return <div>Erro ao carregar alguns livros.</div>
	}

	if (
		!hasRun &&
		checkForLocation === 1 &&
		myBooksQuery.some((query) => query.data?.id === bookIdFromHome)
	) {
		setHasRun(true)
	}

	return (
		<>
			{returnTitle()}
			{checkForLocation === 1 && <GalleryFilter onFilterChange={handleFilterChange} />}
			<Gallery>
				{myBooksQuery.length > 0 ? (
					myBooksQuery?.map((query, index) => {
						const { data, isError } = query

						// TODO - Implementar mensagem de erro dentro do cartão do livro

						if (isError) {
							return <li key={index}>Erro ao carregar livro.</li>
						}

						return (
							data && (
								<li key={data.id}>
									<BookCard book={data} />
								</li>
							)
						)
					})
				) : (
					<span>Parece que não há livros em sua biblioteca, comece pesquisando!</span>
				)}
				{checkForLocation === 0 && myBooksQuery.length > 0 && <SeeMoreButton />}
			</Gallery>
		</>
	)
}

export default MyBooks
