import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBookLibraryContext } from "../../context/BookLibraryContext";
import { ReadingDiaryEntry } from "../../types/ReadingDiaryEntry.type";
import styles from "./DiaryEntry.module.css";

const DiaryEntry = () => {
  const { diaryEntryId } = useParams<{ diaryEntryId: string }>();
  const { readingDiary, saveReadingDiary } = useBookLibraryContext();
  const [entry, setEntry] = useState<ReadingDiaryEntry | null>(null);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const foundEntry =
      readingDiary && readingDiary.find((entry) => entry.id === diaryEntryId);

    if (foundEntry) {
      setEntry(foundEntry);
      setText(foundEntry.entry);
    } else {
      if (diaryEntryId) {
        setEntry({
          id: diaryEntryId,
          title: "",
          associatedBooks: [diaryEntryId],
          entry: "",
        });
      }
    }
  }, [diaryEntryId, readingDiary]);

  const handleSave = () => {
    if (entry) {
      saveReadingDiary({ ...entry, entry: text });
      navigate("/reading-diary");
    }
  };

  useEffect(() => {
    console.log("entry", entry);
  }, [entry]);

  // if (!entry) {
  //   return <div>Entrada não encontrada</div>;
  // }

  return (
    <section className={styles.container}>
      <span className={styles.container_entryTitle}>
        <h1>Entrada do Diário</h1>
      </span>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSave}>Salvar</button>
    </section>
  );
};

export default DiaryEntry;
