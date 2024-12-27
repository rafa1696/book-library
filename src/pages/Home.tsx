/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { useBooks } from "../hooks/useBooks";
import Search from "../components/Search";
import { GoogleBookVolumes } from "../types/GoogleBookVolumes.type";

const Home = () => {
  const [query, setQuery] = useState("");
  const { data: books, isLoading, isError } = useBooks(query);

  return (
    <div>
      <h1>Biblioteca Virtual</h1>
      <Search onSearch={setQuery} />

      {isLoading && <p>Carregando...</p>}
      {isError && <p>Ocorreu um erro. Tente novamente.</p>}

      <div>
        {books?.map((book: GoogleBookVolumes) => (
          <div key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors?.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
