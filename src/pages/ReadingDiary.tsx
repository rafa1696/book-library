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
