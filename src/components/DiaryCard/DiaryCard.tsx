import { FC } from "react";
import { ReadingDiaryEntry } from "../../types/ReadingDiaryEntry.type";
import styles from "./DiaryCard.module.css";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../../utils/truncateText";
import { useBookLibraryContext } from "../../context/BookLibraryContext";

interface IDiaryCard {
  diaryEntry: ReadingDiaryEntry;
}

const DiaryCard: FC<IDiaryCard> = ({ diaryEntry }) => {
  console.log("diaryEntry", diaryEntry);
  const navigate = useNavigate();
  const { removeReadingDiaryEntry } = useBookLibraryContext();

  return (
    <article className={styles.container}>
      <span className={styles.container_imageDiv}>
        {diaryEntry.associatedBooksImages &&
          diaryEntry.associatedBooksImages.length > 0 && (
            <img
              className={styles.container_imageDiv__image}
              src={diaryEntry.associatedBooksImages[0]}
              alt="Imagem do livro"
            />
          )}
      </span>
      <span className={styles.container_textsDiv}>
        <h2 className={styles.container_textsDiv__bookTitle}>
          {diaryEntry.bookTitle || ""}
        </h2>
        <h3 className={styles.container_textsDiv__title}>
          {diaryEntry.title || "Sem título"}
        </h3>
        <p className={styles.container_textsDiv__excerpt}>
          {diaryEntry.entry.length > 100
            ? truncateText(diaryEntry.entry, 100)
            : diaryEntry.entry}
        </p>
        <button
          className={styles.container_textsDiv__editLink}
          onClick={() => navigate("/reading-diary/edit/" + diaryEntry.id)}
        >
          Editar
        </button>
        <button
          onClick={() => removeReadingDiaryEntry(diaryEntry.id)}
          className={styles.container_textsDiv__deleteLink}
        >
          Remover Entrada
        </button>
      </span>
    </article>
  );
};

export default DiaryCard;
