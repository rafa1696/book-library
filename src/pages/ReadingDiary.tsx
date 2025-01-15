import { useBookLibraryContext } from "../context/BookLibraryContext";
import DiaryCard from "../components/DiaryCard/DiaryCard";

const ReadingDiary = () => {
  const { readingDiary } = useBookLibraryContext();

  return (
    <>
      <h1>Diário de Leitura</h1>
      <section>
        <ul>
          {readingDiary.map((entry) => (
            // TODO - Exibir foto ou título do livro para agrupar. Colocar galeria com filtros.
            // TODO - Filtrar por livro
            <li key={entry.id}>
              <DiaryCard diaryEntry={entry} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default ReadingDiary;
