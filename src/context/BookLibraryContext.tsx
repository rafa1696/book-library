/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { ReadingDiaryEntry } from "../types/ReadingDiaryEntry.type";
import { BookInfo } from "../types/BookInfo.type";
import { FilterTypes } from "../enums/FilterTypes.enum";
import filterEntries from "../utils/filterEntries";
import { ContentType } from "../enums/ContentType.enum";
import { ToastType } from "../enums/ToastType.enum";

type ContextProviderProps = {
  children: React.ReactNode;
};

interface IBookLibraryContext {
  readingDiary: ReadingDiaryEntry[];
  removeBook: (bookId: string) => void;
  saveBook: (bookInfo: BookInfo) => void;
  savedBooks: BookInfo[];
  reorderEntries: (filterType: FilterTypes, contentType: ContentType) => void;
  saveReadingDiary: (diaryEntry: ReadingDiaryEntry) => void;
  removeReadingDiaryEntry: (entryId: string | number) => void;
  toastMessageDefinition: (messageType: ToastType) => void;
  seenToastMessage: ToastType | null;
}

const BookLibraryContext = createContext({} as IBookLibraryContext);

export const BookLibraryProvider = ({ children }: ContextProviderProps) => {
  const [savedBooks, setSavedBooks] = useState<BookInfo[]>([]);
  const [readingDiary, setReadingDiary] = useState<ReadingDiaryEntry[]>([]);
  const [toastMessagePipeline, setToastMessagePipeline] = useState<ToastType[]>(
    []
  );
  const [seenToastMessage, setSeenToastMessage] = useState<ToastType | null>(
    null
  );

  const getSavedBooks = () => {
    const books = localStorage.getItem("books");

    if (books) {
      return setSavedBooks(JSON.parse(books));
    }

    return setSavedBooks([]);
  };

  const saveBook = (bookInfo: BookInfo) => {
    const books = localStorage.getItem("books");

    // TODO - Adicionar condição para não adicionar duplicata

    if (books) {
      const parsedBooks = JSON.parse(books);

      if (parsedBooks.includes(bookInfo.id.toString())) return;

      localStorage.setItem("books", JSON.stringify([...parsedBooks, bookInfo]));
    } else {
      localStorage.setItem("books", JSON.stringify([bookInfo]));
    }

    toastMessageDefinition(ToastType.success);

    getSavedBooks();
  };

  const removeBook = (bookId: string) => {
    const books = localStorage.getItem("books");

    if (!books) return;

    const parsedBooks = JSON.parse(books);

    localStorage.setItem(
      "books",
      JSON.stringify(parsedBooks.filter((book: BookInfo) => book.id !== bookId))
    );

    toastMessageDefinition(ToastType.success);

    getSavedBooks();
  };

  const reorderEntries = (
    filterType: FilterTypes,
    contentType: ContentType
  ) => {
    switch (contentType) {
      case ContentType.Book: {
        const books = localStorage.getItem("books");

        if (books) {
          const parsedBooks = JSON.parse(books);
          const sortedBooks = filterEntries(parsedBooks, filterType);

          localStorage.setItem("books", JSON.stringify(sortedBooks));
          getSavedBooks();
        }
        break;
      }
      case ContentType.DiaryEntry: {
        const diary = localStorage.getItem("readingDiary");

        if (diary) {
          const parsedDiary = JSON.parse(diary);
          const sortedDiary = filterEntries(parsedDiary, filterType);

          localStorage.setItem("readingDiary", JSON.stringify(sortedDiary));
          getReadingDiary();
        }
        break;
      }
      default:
        break;
    }
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

    toastMessageDefinition(ToastType.success);

    getReadingDiary();
  };

  const removeReadingDiaryEntry = (entryId: string | number) => {
    const diary = localStorage.getItem("readingDiary");

    if (!diary) return;

    const parsedDiary = JSON.parse(diary);

    localStorage.setItem(
      "readingDiary",
      JSON.stringify(
        parsedDiary.filter((entry: ReadingDiaryEntry) => entry.id !== entryId)
      )
    );

    toastMessageDefinition(ToastType.success);

    getReadingDiary();
  };

  useEffect(() => {
    getSavedBooks();
    getReadingDiary();
  }, []);

  const toastMessageDefinition = (messageType: ToastType) => {
    setToastMessagePipeline((toastMessagePipeline) => [
      ...toastMessagePipeline,
      messageType,
    ]);
  };

  useEffect(() => {
    if (toastMessagePipeline.length === 0) return;

    setSeenToastMessage(toastMessagePipeline[0]);

    const timeoutToResetMessage = setTimeout(() => {
      setSeenToastMessage(ToastType.unset);

      if (toastMessagePipeline.length > 1)
        setToastMessagePipeline((toastMessagePipeline) =>
          toastMessagePipeline.slice(1)
        );
      else if (toastMessagePipeline.length === 1) setToastMessagePipeline([]);
    }, 5000);

    return () => {
      clearTimeout(timeoutToResetMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastMessagePipeline]);

  return (
    <BookLibraryContext.Provider
      value={{
        saveBook,
        savedBooks,
        removeBook,
        readingDiary,
        saveReadingDiary,
        removeReadingDiaryEntry,
        reorderEntries,
        toastMessageDefinition,
        seenToastMessage,
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
