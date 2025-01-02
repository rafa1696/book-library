import { FC } from "react";
import styles from "./BookGallery.module.css";

interface IBookGallery {
  children: React.ReactNode;
}

const BookGallery: FC<IBookGallery> = ({ children }) => {
  return (
    <section className={styles.container}>
      <ul>{children}</ul>
    </section>
  );
};

export default BookGallery;
