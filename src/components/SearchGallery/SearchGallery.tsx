import { FC } from "react";
import styles from "./SearchGallery.module.css";

interface ISearchGallery {
  children: React.ReactNode;
}

const SearchGallery: FC<ISearchGallery> = ({ children }) => {
  return (
    <section className={styles.container}>
      <ul>{children}</ul>
    </section>
  );
};

export default SearchGallery;
