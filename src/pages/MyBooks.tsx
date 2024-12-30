import { useFetchBooks } from "../api/fetchMultipleBooks";
import BookCard from "../components/BookCard/BookCard";
import BookGallery from "../components/BookGallery/BookGallery";
import { useBookLibraryContext } from "../context/BookLibraryContext";

const MyBooks = () => {
  const { savedBooks } = useBookLibraryContext();

  const myBooksQuery = useFetchBooks({ ids: savedBooks });

  if (myBooksQuery.some((query) => query.isLoading)) {
    return <div>Carregando livros...</div>;
  }

  if (myBooksQuery.some((query) => query.isError)) {
    return <div>Erro ao carregar alguns livros.</div>;
  }

  return (
    <>
      <BookGallery>
        {myBooksQuery.map((query, index) => {
          const { data, isError } = query;

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
