/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";
import { ReadingDiaryEntry } from "../types/ReadingDiaryEntry.type";
import { BookInfo } from "../types/BookInfo.type";
import { FilterTypes } from "../enums/FilterTypes.enum";
import filterEntries from "../utils/filterEntries";
import { ContentType } from "../enums/ContentType.enum";
import { ToastType } from "../enums/ToastType.enum";

type ContextProviderProps = {
  children: React.ReactNode;
};

interface IBookLibraryState {
  savedBooks: BookInfo[];
  readingDiary: ReadingDiaryEntry[];
  toastMessagePipeline: ToastType[];
  seenToastMessage: ToastType | null;
}

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
  toastMessagePipeline: ToastType[];
}

type Action =
  | { type: "SET_SAVED_BOOKS"; payload: BookInfo[] }
  | { type: "SET_READING_DIARY"; payload: ReadingDiaryEntry[] }
  | { type: "ADD_BOOK"; payload: BookInfo }
  | { type: "REMOVE_BOOK"; payload: string }
  | { type: "ADD_DIARY_ENTRY"; payload: ReadingDiaryEntry }
  | { type: "REMOVE_DIARY_ENTRY"; payload: string | number }
  | { type: "ADD_TOAST_MESSAGE"; payload: ToastType }
  | { type: "REMOVE_ONE_TOAST_MESSAGE"; payload?: ToastType }
  | { type: "SET_SEEN_TOAST_MESSAGE"; payload: ToastType | null };

const initialState: IBookLibraryState = {
  savedBooks: [],
  readingDiary: [],
  toastMessagePipeline: [],
  seenToastMessage: null,
};

const reducer = (
  state: IBookLibraryState,
  action: Action
): IBookLibraryState => {
  switch (action.type) {
    case "SET_SAVED_BOOKS":
      return { ...state, savedBooks: action.payload };
    case "SET_READING_DIARY":
      return { ...state, readingDiary: action.payload };
    case "ADD_BOOK":
      return { ...state, savedBooks: [...state.savedBooks, action.payload] };
    case "REMOVE_BOOK":
      return {
        ...state,
        savedBooks: state.savedBooks.filter(
          (book) => book.id !== action.payload
        ),
      };
    case "ADD_DIARY_ENTRY":
      return {
        ...state,
        readingDiary: [...state.readingDiary, action.payload],
      };
    case "REMOVE_DIARY_ENTRY":
      return {
        ...state,
        readingDiary: state.readingDiary.filter(
          (entry) => entry.id !== action.payload
        ),
      };
    case "ADD_TOAST_MESSAGE":
      return {
        ...state,
        toastMessagePipeline: [...state.toastMessagePipeline, action.payload],
      };
    case "REMOVE_ONE_TOAST_MESSAGE":
      return {
        ...state,
        toastMessagePipeline:
          state.toastMessagePipeline.length > 0
            ? state.toastMessagePipeline.slice(1)
            : [],
      };
    case "SET_SEEN_TOAST_MESSAGE":
      return { ...state, seenToastMessage: action.payload };
    default:
      return state;
  }
};

const BookLibraryContext = createContext({} as IBookLibraryContext);

export const BookLibraryProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getSavedBooks = () => {
    const books = localStorage.getItem("books");
    const parsedBooks = books ? JSON.parse(books) : [];
    dispatch({ type: "SET_SAVED_BOOKS", payload: parsedBooks });
  };

  const saveBook = (bookInfo: BookInfo) => {
    const books = localStorage.getItem("books");
    const parsedBooks = books ? JSON.parse(books) : [];

    if (!parsedBooks.find((book: BookInfo) => book.id === bookInfo.id)) {
      localStorage.setItem("books", JSON.stringify([...parsedBooks, bookInfo]));
      dispatch({ type: "ADD_BOOK", payload: bookInfo });
    }

    dispatch({ type: "ADD_TOAST_MESSAGE", payload: ToastType.success });
  };

  const removeBook = (bookId: string) => {
    const books = localStorage.getItem("books");
    const parsedBooks = books ? JSON.parse(books) : [];

    localStorage.setItem(
      "books",
      JSON.stringify(parsedBooks.filter((book: BookInfo) => book.id !== bookId))
    );
    dispatch({ type: "REMOVE_BOOK", payload: bookId });
    dispatch({ type: "ADD_TOAST_MESSAGE", payload: ToastType.success });
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
    const diary = localStorage.getItem("readingDiary");
    const parsedDiary = diary ? JSON.parse(diary) : [];
    dispatch({ type: "SET_READING_DIARY", payload: parsedDiary });
  };

  const saveReadingDiary = (entry: ReadingDiaryEntry) => {
    const diary = localStorage.getItem("readingDiary");
    const parsedDiary = diary ? JSON.parse(diary) : [];

    const updatedDiary = parsedDiary.some(
      (registeredEntry: ReadingDiaryEntry) => registeredEntry.id === entry.id
    )
      ? parsedDiary.map((registeredEntry: ReadingDiaryEntry) =>
          registeredEntry.id === entry.id ? entry : registeredEntry
        )
      : [...parsedDiary, entry];

    localStorage.setItem("readingDiary", JSON.stringify(updatedDiary));
    dispatch({ type: "SET_READING_DIARY", payload: updatedDiary });
    dispatch({ type: "ADD_TOAST_MESSAGE", payload: ToastType.success });
  };

  const removeReadingDiaryEntry = (entryId: string | number) => {
    const diary = localStorage.getItem("readingDiary");
    const parsedDiary = diary ? JSON.parse(diary) : [];

    localStorage.setItem(
      "readingDiary",
      JSON.stringify(
        parsedDiary.filter((entry: ReadingDiaryEntry) => entry.id !== entryId)
      )
    );
    dispatch({ type: "REMOVE_DIARY_ENTRY", payload: entryId });
    dispatch({ type: "ADD_TOAST_MESSAGE", payload: ToastType.success });
  };

  useEffect(() => {
    getSavedBooks();
    getReadingDiary();
  }, []);

  const toastMessageDefinition = (messageType: ToastType) => {
    dispatch({ type: "ADD_TOAST_MESSAGE", payload: messageType });
  };

  useEffect(() => {
    console.log("message pipeline", state.toastMessagePipeline);
    if (state.toastMessagePipeline.length === 0) return;

    dispatch({
      type: "SET_SEEN_TOAST_MESSAGE",
      payload: state.toastMessagePipeline[0],
    });

    const timeoutToResetMessage = setTimeout(() => {
      dispatch({ type: "SET_SEEN_TOAST_MESSAGE", payload: ToastType.unset });

      if (state.toastMessagePipeline.length > 0) {
        dispatch({
          type: "REMOVE_ONE_TOAST_MESSAGE",
        });
      }
    }, 5000);

    return () => {
      clearTimeout(timeoutToResetMessage);
    };
  }, [state.toastMessagePipeline]);

  return (
    <BookLibraryContext.Provider
      value={{
        ...state,
        saveBook,
        removeBook,
        saveReadingDiary,
        removeReadingDiaryEntry,
        reorderEntries,
        toastMessageDefinition,
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
