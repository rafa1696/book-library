import { FC } from "react";
import styles from "./BookCard.module.css";
import { GoogleBookVolumes } from "../../types/GoogleBookVolumes.type";
import { BookCardButtons } from "../../enums/BookCardButtons.enum";
import { truncateText } from "../../utils/truncateText";
import { useBookLibraryContext } from "../../context/BookLibraryContext";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../enums/NavigationRoutes.enum";
import { createBookPictureForDiary } from "../../utils/createBookCoverForDiary";

interface IBookCard {
  book: GoogleBookVolumes;
}

const BookCard: FC<IBookCard> = ({ book }) => {
  const { saveBook, removeBook } = useBookLibraryContext();

  const location = useLocation();
  const navigate = useNavigate();

  const handleButtons = (type: BookCardButtons) => {
    switch (type) {
      case BookCardButtons.Home:
        navigate(NavigationRoutes.MyBooks + "/?bookId=" + book.id);
        break;
      case BookCardButtons.ProductPage:
        window.open(book.volumeInfo.infoLink, "_blank", "noopener,noreferrer");
        break;
      case BookCardButtons.AddToLibrary:
        saveBook({
          bookName: book.volumeInfo.title,
          id: book.id,
          bookAddDate: Date.now(),
        });
        break;
      case BookCardButtons.RemoveFromLibrary:
        removeBook(book.id);
        break;
      case BookCardButtons.CreateDiaryEntry:
        // NOTE - A formatação abaixo impede um falso erro
        navigate(
          NavigationRoutes.ReadingDiary +
            "/edit/" +
            book.id +
            createBookPictureForDiary(book.volumeInfo?.imageLinks?.thumbnail)
        );
        break;
      default:
        break;
    }
  };

  //  TODO - executar scroll até elemento quando clicar na Home

  return (
    <article
      onClick={() => {
        if (location.pathname === NavigationRoutes.Home)
          handleButtons(BookCardButtons.Home);
      }}
      book-id-data={book.id}
      className={[
        styles.container,
        location.pathname === NavigationRoutes.Home && styles.isOnHome,
      ].join(" ")}
    >
      <span
        onClick={() => {
          if (location.pathname !== NavigationRoutes.Home)
            handleButtons(BookCardButtons.ProductPage);
        }}
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
          {truncateText(book.volumeInfo.title, 35)}
        </h3>
        {book.volumeInfo.authors && (
          <h4 className={styles.container_textsDiv__authorName}>
            {truncateText(book?.volumeInfo?.authors?.join(", "), 40)}
          </h4>
        )}
        {location.pathname === NavigationRoutes.Home ? null : (
          <button
            onClick={() => handleButtons(BookCardButtons.ProductPage)}
            className={styles.container_textsDiv__productPageButton}
          >
            Comprar
          </button>
        )}
        {location.pathname === NavigationRoutes.MyBooks && (
          <button
            onClick={() => handleButtons(BookCardButtons.CreateDiaryEntry)}
            className={styles.container_textsDiv__CreateDiaryEntryButton}
          >
            Escrever Diário
          </button>
        )}
        {location.pathname ===
        NavigationRoutes.Home ? null : location.pathname ===
          NavigationRoutes.MyBooks ? (
          <button
            onClick={() => handleButtons(BookCardButtons.RemoveFromLibrary)}
            className={
              styles.container_textsDiv__productRemoveFromLibraryButton
            }
          >
            Remover Da Biblioteca
          </button>
        ) : (
          <button
            onClick={() => handleButtons(BookCardButtons.AddToLibrary)}
            className={styles.container_textsDiv__productAddToLibraryButton}
          >
            Adicionar À Biblioteca
          </button>
        )}
      </div>
    </article>
  );
};

export default BookCard;
