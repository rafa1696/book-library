import BookGallery from "../components/BookGallery/BookGallery";
import { useBookLibraryContext } from "../context/BookLibraryContext";

const MyBooks = () => {
  const { savedBooks } = useBookLibraryContext();

  return (
    <>
      <BookGallery>
        {savedBooks.map((bookId) => (
          <li key={bookId}>
            <span>Book ID: {bookId}</span>
          </li>
        ))}
      </BookGallery>
    </>
  );
};

export default MyBooks;
