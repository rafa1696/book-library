import { FC } from "react";
import styles from "./BookCard.module.css";
import { GoogleBookVolumes } from "../../types/GoogleBookVolumes.type";
import { BookCardButtons } from "../../enums/BookCardButtons.enum";
import { truncateText } from "../../utils/truncateText";

interface IBookCard {
  book: GoogleBookVolumes;
}

const BookCard: FC<IBookCard> = ({ book }) => {
  const handleButtons = (type: BookCardButtons) => {
    switch (type) {
      case BookCardButtons.ProductPage:
        window.open(book.volumeInfo.infoLink, "_blank", "noopener,noreferrer");
        break;
      case BookCardButtons.AddToLibrary:
        console.log("Adicionado à Biblioteca");
        break;
      default:
        break;
    }
  };

  return (
    <section className={styles.container}>
      <span
        onClick={() => handleButtons(BookCardButtons.ProductPage)}
        className={styles.container_imageDiv}
      >
        {book.volumeInfo.imageLinks?.thumbnail ? (
          <img
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt={`Capa da publicação ${book.volumeInfo.title}`}
          />
        ) : (
          <div className={styles.container_imageDiv__noCover}>SEM CAPA</div>
        )}
      </span>
      <div className={styles.container_textsDiv}>
        <h3 className={styles.container_textsDiv__publicationName}>
          {truncateText(book.volumeInfo.title, 45)}
        </h3>
        <button
          onClick={() => handleButtons(BookCardButtons.ProductPage)}
          className={styles.container_textsDiv__productPageButton}
        >
          Comprar
        </button>
        <button
          onClick={() => handleButtons(BookCardButtons.AddToLibrary)}
          className={styles.container_textsDiv__productAddToLibraryButton}
        >
          Adicionar À Biblioteca
        </button>
      </div>
    </section>
  );
};

export default BookCard;
