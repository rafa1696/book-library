/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { ReadingDiaryEntry } from "../types/ReadingDiaryEntry.type";

type ContextProviderProps = {
  children: React.ReactNode;
};

interface IBookLibraryContext {
  readingDiary: ReadingDiaryEntry[];
  removeBook: (bookId: string) => void;
  saveBook: (bookId: string) => void;
  savedBooks: string[];
  saveReadingDiary: (diaryEntry: ReadingDiaryEntry) => void;
  removeReadingDiaryEntry: (entryId: string | number) => void;
}

const BookLibraryContext = createContext({} as IBookLibraryContext);

export const BookLibraryProvider = ({ children }: ContextProviderProps) => {
  const [savedBooks, setSavedBooks] = useState<string[]>([]);
  const [readingDiary, setReadingDiary] = useState<ReadingDiaryEntry[]>([]);

  const getSavedBooks = () => {
    const books = localStorage.getItem("books");

    if (books) {
      return setSavedBooks(JSON.parse(books));
    }

    return setSavedBooks([]);
  };

  const saveBook = (bookId: string) => {
    const books = localStorage.getItem("books");

    if (books) {
      const parsedBooks = JSON.parse(books);

      if (parsedBooks.includes(bookId.toString())) return;

      localStorage.setItem("books", JSON.stringify([...parsedBooks, bookId]));
    } else {
      localStorage.setItem("books", JSON.stringify([bookId]));
    }

    getSavedBooks();
  };

  const removeBook = (bookId: string) => {
    const books = localStorage.getItem("books");

    if (!books) return;

    const parsedBooks = JSON.parse(books);

    localStorage.setItem(
      "books",
      JSON.stringify(parsedBooks.filter((book: string) => book !== bookId))
    );

    getSavedBooks();
  };

  const getReadingDiary = () => {
    const readingDiary = localStorage.getItem("readingDiary");

    if (readingDiary) {
      return setReadingDiary(JSON.parse(readingDiary));
    }

    return setReadingDiary([]);
  };

  const saveReadingDiary = (entry: ReadingDiaryEntry) => {
    const diary = localStorage.getItem("readingDiary");

    console.log("save entry", entry);

    if (diary) {
      const parsedDiary = JSON.parse(diary);
      const foundEntry = parsedDiary.find(
        (registeredEntry: ReadingDiaryEntry) => registeredEntry.id === entry.id
      );
      console.log("foundEntry", foundEntry);

      if (!foundEntry) {
        localStorage.setItem(
          "readingDiary",
          JSON.stringify([...parsedDiary, entry])
        );
        getReadingDiary();

        return;
      }

      const updatedDiary = parsedDiary.map(
        (registeredEntry: ReadingDiaryEntry) =>
          registeredEntry.id === entry.id ? entry : registeredEntry
      );

      localStorage.setItem("readingDiary", JSON.stringify(updatedDiary));
    } else {
      localStorage.setItem("readingDiary", JSON.stringify([entry]));
    }

    getReadingDiary();
  };

  const removeReadingDiaryEntry = (entryId: string) => {
    const diary = localStorage.getItem("readingDiary");

    if (!diary) return;

    const parsedDiary = JSON.parse(diary);

    localStorage.setItem(
      "readingDiary",
      JSON.stringify(
        parsedDiary.filter((entry: ReadingDiaryEntry) => entry.id !== entryId)
      )
    );

    getReadingDiary();
  };

  useEffect(() => {
    getSavedBooks();
    getReadingDiary();
  }, []);

  return (
    <BookLibraryContext.Provider
      value={{
        saveBook,
        savedBooks,
        removeBook,
        readingDiary,
        saveReadingDiary,
        removeReadingDiaryEntry,
      }}
    >
      {children}
    </BookLibraryContext.Provider>
  );
};

export const useBookLibraryContext = () => {
  const context = useContext(BookLibraryContext);

  if (!context) {
    throw new Error(
      "useBookLibraryContext deve ser usado dentro de um BookLibraryContext"
    );
  }
  return context;
};
