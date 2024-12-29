import { useState } from "react";
import { useBooks } from "../hooks/useBooks";
import Search from "../components/Search";
import { GoogleBookVolumes } from "../types/GoogleBookVolumes.type";
import BookCard from "../components/BookCard/BookCard";
import SearchGallery from "../components/SearchGallery/SearchGallery";

const Home = () => {
  const [query, setQuery] = useState("");
  const { data: books, isLoading, isError } = useBooks(query);

  return (
    <div>
      <Search onSearch={setQuery} />

      {isLoading && <p>Carregando...</p>}
      {isError && <p>Ocorreu um erro. Tente novamente.</p>}

      <SearchGallery>
        {books?.map((book: GoogleBookVolumes) => (
          <li key={book.id}>
            <BookCard book={book} />
          </li>
        ))}
      </SearchGallery>
    </div>
  );
};

export default Home;
