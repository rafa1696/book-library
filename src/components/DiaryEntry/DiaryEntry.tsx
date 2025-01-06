import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookLibraryContext } from "../../context/BookLibraryContext";
import { ReadingDiaryEntry } from "../../types/ReadingDiaryEntry.type";
import { returnRandomNumber } from "../../utils/returnRandomNumber";
import styles from "./DiaryEntry.module.css";

const DiaryEntry = () => {
  const { diaryEntryId } = useParams<{ diaryEntryId: string }>();
  const { readingDiary, saveReadingDiary } = useBookLibraryContext();
  const [entry, setEntry] = useState<ReadingDiaryEntry | null>(null);

  const [entryTitle, setEntryTitle] = useState("");
  const [entryText, setEntryText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const foundEntry =
      readingDiary && readingDiary.find((entry) => entry.id === diaryEntryId);

    if (foundEntry) {
      setEntry(foundEntry);
      setEntryText(foundEntry.entry);
    } else {
      if (diaryEntryId) {
        setEntry({
          id: diaryEntryId + "-" + returnRandomNumber(0, 100000),
          title: "",
          associatedBooks: [diaryEntryId],
          entry: "",
          timestamp: Date.now(),
        });
      }
    }
  }, [diaryEntryId, readingDiary]);

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
