import { useFetchBooks } from "../hooks/useFetchBooks";
import BookCard from "../components/BookCard/BookCard";
import Gallery from "../components/Gallery/Gallery";
import { useBookLibraryContext } from "../context/BookLibraryContext";
import GalleryFilter from "../components/GalleryFilter/GalleryFilter";
import { FilterTypes } from "../enums/FilterTypes.enum";
import { ContentType } from "../enums/ContentType.enum";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyBooks = () => {
  const { savedBooks, reorderEntries } = useBookLibraryContext();

  const myBooksQuery = useFetchBooks({
    ids: savedBooks.map((book) => book.id),
  });

  const handleFilterChange = (filterType: FilterTypes) => {
    reorderEntries(filterType, ContentType.Book);
  };

  if (myBooksQuery.some((query) => query.isLoading)) {
    return (
      <div>
        <Skeleton height={"100vh"} />
      </div>
    );
  }

  if (myBooksQuery.some((query) => query.isError)) {
    return <div>Erro ao carregar alguns livros.</div>;
  }

  return (
    <>
      <h1>Meus Livros</h1>
      <GalleryFilter onFilterChange={handleFilterChange} />
      <Gallery>
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
      </Gallery>
    </>
  );
};

export default MyBooks;
