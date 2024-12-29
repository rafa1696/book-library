/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

type ContextProviderProps = {
  children: React.ReactNode;
};

interface IBookLibraryContext {
  savedBooks: string[];
  saveBook: (bookId: string) => void;
}

const BookLibraryContext = createContext({} as IBookLibraryContext);

export const BookLibraryProvider = ({ children }: ContextProviderProps) => {
  const [savedBooks, setSavedBooks] = useState<string[]>([]);

  const getSavedBooks = () => {
    const books = localStorage.getItem("books");

    if (books) {
      return setSavedBooks(JSON.parse(books));
    }

    return setSavedBooks([]);
  };

  useEffect(() => {
    getSavedBooks();
  }, []);

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

  return (
    <BookLibraryContext.Provider value={{ saveBook, savedBooks }}>
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
