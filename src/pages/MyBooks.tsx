import { useFetchBooks } from "../hooks/useFetchBooks";
import BookCard from "../components/BookCard/BookCard";
import BookGallery from "../components/BookGallery/BookGallery";
import { useBookLibraryContext } from "../context/BookLibraryContext";
import GalleryFilter from "../components/GalleryFilter/GalleryFilter";
import { FilterTypes } from "../enums/FilterTypes.enum";

const MyBooks = () => {
  const { savedBooks, reorderBooks } = useBookLibraryContext();

  const myBooksQuery = useFetchBooks({
    ids: savedBooks.map((book) => book.id),
  });

  const handleFilterChange = (filterType: FilterTypes) => {
    reorderBooks(filterType);
  };

  if (myBooksQuery.some((query) => query.isLoading)) {
    return <div>Carregando livros...</div>;
  }

  if (myBooksQuery.some((query) => query.isError)) {
    return <div>Erro ao carregar alguns livros.</div>;
  }

  return (
    <>
      <GalleryFilter onFilterChange={handleFilterChange} />
      <BookGallery>
        {myBooksQuery?.map((query, index) => {
          const { data, isError } = query;

          // TODO - Implementar mensagem de erro dentro do cartão do livro

          if (isError) {
            return <li key={index}>Erro ao carregar livro.</li>;
          }

          return (
            data && (
              <li key={data.id}>
                <BookCard book={data} />
              </li>
            )
          );
        })}
      </BookGallery>
    </>
  );
};

export default MyBooks;
