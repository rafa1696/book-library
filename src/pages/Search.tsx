import { useState } from "react";
import BookCard from "../components/BookCard/BookCard";
import BookGallery from "../components/BookGallery/BookGallery";
import { useBooks } from "../hooks/useBooks";
import { GoogleBookVolumes } from "../types/GoogleBookVolumes.type";
import SearchFunction from "../components/SearchFunction";

const Search = () => {
  const [query, setQuery] = useState("");
  const { data: books, isLoading, isError } = useBooks(query);

  return (
    <div>
      <SearchFunction onSearch={setQuery} />

      {isLoading && <p>Carregando...</p>}
      {isError && <p>Ocorreu um erro. Tente novamente.</p>}

      <BookGallery>
        {books?.map((book: GoogleBookVolumes) => (
          <li key={book.id}>
            <BookCard book={book} />
          </li>
        ))}
      </BookGallery>
    </div>
  );
};

export default Search;
