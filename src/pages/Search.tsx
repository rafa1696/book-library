import { useState } from 'react'
import BookCard from '../components/BookCard/BookCard'
import BookGallery from '../components/Gallery/Gallery'
import { useBooks } from '../hooks/useBooks'
import { GoogleBookVolumes } from '../types/GoogleBookVolumes.type'
import SearchFunction from '../components/Search/SearchFunction'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Search = () => {
	const [query, setQuery] = useState('')
	const { data: books, isLoading, isError } = useBooks(query)

	return (
		<div cy-data="search-page">
			<SearchFunction onSearch={setQuery} />

			{isLoading && (
				<div>
					<Skeleton height={'100vh'} />
				</div>
			)}
			{isError && <p>Ocorreu um erro. Tente novamente.</p>}

			<BookGallery>
				{books?.map((book: GoogleBookVolumes) => (
					<li key={book.id}>
						<BookCard book={book} />
					</li>
				))}
			</BookGallery>
		</div>
	)
}

export default Search
