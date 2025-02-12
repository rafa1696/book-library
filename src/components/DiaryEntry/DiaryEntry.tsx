import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useBookLibraryContext } from "../../context/BookLibraryContext";
import { ReadingDiaryEntry } from "../../types/ReadingDiaryEntry.type";
import { returnRandomNumber } from "../../utils/returnRandomNumber";
import styles from "./DiaryEntry.module.css";

const DiaryEntry = () => {
  const { diaryEntryId } = useParams<{ diaryEntryId: string }>();
  const [searchParams] = useSearchParams();

  const bookName = searchParams.get("bookName") || "";
  const bookPicture = searchParams.get("bookPicture") || "";

  const { readingDiary, saveReadingDiary } = useBookLibraryContext();
  const [entry, setEntry] = useState<ReadingDiaryEntry | null>(null);

  const [entryTitle, setEntryTitle] = useState("");
  const [entryText, setEntryText] = useState("");
  const navigate = useNavigate();

  console.log("bookInfo", searchParams);

  useEffect(() => {
    const foundEntry =
      readingDiary && readingDiary.find((entry) => entry.id === diaryEntryId);

    if (foundEntry) {
      setEntry(foundEntry);
      setEntryText(foundEntry.entry);
      setEntryTitle(foundEntry.title);
    } else {
      if (diaryEntryId) {
        setEntry({
          id: diaryEntryId + "-" + returnRandomNumber(0, 100000),
          associatedBooks: [diaryEntryId],
          associatedBooksImages: [bookPicture],
          bookTitle: bookName,
          entry: "",
          timestamp: Date.now(),
          title: "",
        });
      }
    }
  }, [diaryEntryId, readingDiary, bookPicture]);

  const handleSave = () => {
    // TODO - Trocar nome de entry para diaryEntryText ou algo parecido
    if (entry && entryText.length > 0) {
      saveReadingDiary({ ...entry, title: entryTitle, entry: entryText });
      navigate("/reading-diary");
    }
  };

  return (
    <section className={styles.container}>
      <span className={styles.container_sectionTitle}>
        <h1>Entrada do Diário</h1>
      </span>
      <div className={styles.container_bookInfo}>
        <h2 className={styles.container_bookInfo__bookTitle}>{bookName}</h2>
        <span>
          <img
            src={bookPicture}
            alt={`Capa do livro ${bookName}`}
          />
        </span>
      </div>
      <span className={styles.container_entryTitle}>
        <h2>Título da entrada</h2>
        <textarea
          value={entryTitle}
          onChange={(e) => setEntryTitle(e.target.value)}
        />
      </span>
      <span className={styles.container_entryText}>
        <h2>Texto</h2>
        <textarea
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
        />
      </span>
      <button onClick={handleSave}>Salvar</button>
    </section>
  );
};

export default DiaryEntry;
