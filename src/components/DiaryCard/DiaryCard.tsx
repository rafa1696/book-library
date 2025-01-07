import { FC } from "react";
import { ReadingDiaryEntry } from "../../types/ReadingDiaryEntry.type";
import styles from "./DiaryCard.module.css";
import { Link } from "react-router-dom";
import { truncateText } from "../../utils/truncateText";

interface IDiaryCard {
  diaryEntry: ReadingDiaryEntry;
}

const DiaryCard: FC<IDiaryCard> = ({ diaryEntry }) => {
  console.log("diaryEntry", diaryEntry);

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
      <span className={styles.container_textDiv}>
        <h2 className={styles.container_textDiv__title}>
          {diaryEntry.title || "Sem título"}
        </h2>
        <p className={styles.container_textDiv__excerpt}>
          {diaryEntry.entry.length > 100
            ? truncateText(diaryEntry.entry, 100)
            : diaryEntry.entry}
        </p>
        <Link
          className={styles.container_textDiv__editLink}
          to={`/reading-diary/edit/${diaryEntry.id}`}
        >
          Editar
        </Link>
      </span>
    </article>
  );
};

export default DiaryCard;
