/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

type ContextProviderProps = {
  children: React.ReactNode;
};

interface IBookLibraryContext {
  readingDiary: string[];
  removeBook: (bookId: string) => void;
  saveBook: (bookId: string) => void;
  savedBooks: string[];
  saveReadingDiary: (diaryEntryId: string) => void;
}

const BookLibraryContext = createContext({} as IBookLibraryContext);

export const BookLibraryProvider = ({ children }: ContextProviderProps) => {
  const [savedBooks, setSavedBooks] = useState<string[]>([]);
  const [readingDiary, setReadingDiary] = useState<string[]>([]);

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

  const saveReadingDiary = (diaryEntryId: string) => {
    const diary = localStorage.getItem("readingDiary");

    if (diary) {
      const parsedDiary = JSON.parse(diary);

      if (parsedDiary.includes(diaryEntryId.toString())) return;

      localStorage.setItem(
        "readingDiary",
        JSON.stringify([...parsedDiary, diaryEntryId])
      );
    } else {
      localStorage.setItem("readingDiary", JSON.stringify([diaryEntryId]));
    }

    getReadingDiary();
  };

  useEffect(() => {
    getSavedBooks();
  }, []);

  return (
    <BookLibraryContext.Provider
      value={{
        saveBook,
        savedBooks,
        removeBook,
        readingDiary,
        saveReadingDiary,
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
