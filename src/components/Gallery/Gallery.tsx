import { FC } from "react";
import styles from "./Gallery.module.css";

interface IGallery {
  children: React.ReactNode;
}

const Gallery: FC<IGallery> = ({ children }) => {
  return (
    <section className={styles.container}>
      <ul>{children}</ul>
    </section>
  );
};

export default Gallery;
