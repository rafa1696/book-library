import { Link } from "react-router-dom";
import { useBookLibraryContext } from "../context/BookLibraryContext";

const ReadingDiary = () => {
  const { readingDiary } = useBookLibraryContext();

  return (
    <>
      <h1>Diário de Leitura</h1>
      <section>
        <ul>
          {readingDiary.map((entry) => (
            // TODO - Criar cartão para exibir as entradas
            // TODO - Exibir foto ou título do livro para agrupar. Colocar galeria com filtros.
            <li key={entry.id}>
              <h2>{entry.title}</h2>
              <p>{entry.entry}</p>
              <Link to={`/reading-diary/edit/${entry.id}`}>Editar</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default ReadingDiary;
