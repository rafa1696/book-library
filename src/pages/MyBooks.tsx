import { useFetchBooks } from "../hooks/useFetchBooks";
import BookCard from "../components/BookCard/BookCard";
import Gallery from "../components/Gallery/Gallery";
import { useBookLibraryContext } from "../context/BookLibraryContext";
import GalleryFilter from "../components/GalleryFilter/GalleryFilter";
import { FilterTypes } from "../enums/FilterTypes.enum";
import { ContentType } from "../enums/ContentType.enum";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NavigationRoutes } from "../enums/NavigationRoutes.enum";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

const MyBooks: FC = () => {
  const location = useLocation();
  const { savedBooks, reorderEntries } = useBookLibraryContext();

  const myBooksQuery = useFetchBooks({
    ids:
      location.pathname === NavigationRoutes.Home
        ? savedBooks.slice(0, 4).map((book) => book.id)
        : savedBooks.map((book) => book.id),
  });

  const handleFilterChange = (filterType: FilterTypes) => {
    reorderEntries(filterType, ContentType.Book);
  };

  const returnTitle = () => {
    switch (location.pathname) {
      case NavigationRoutes.MyBooks:
        return <h1>Meus Livros</h1>;
      case NavigationRoutes.Home:
        return null;
      default:
        break;
    }
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
      {returnTitle()}
      {location.pathname === NavigationRoutes.MyBooks && (
        <GalleryFilter onFilterChange={handleFilterChange} />
      )}
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
        {location.pathname === NavigationRoutes.Home && (
          <Link to={NavigationRoutes.MyBooks}>Ver todos</Link>
        )}
      </Gallery>
    </>
  );
};

export default MyBooks;
