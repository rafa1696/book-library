import { FC } from "react";
import styles from "./Gallery.module.css";
import { locationCheck } from "../../utils/locationCheck";

interface IGallery {
  children: React.ReactNode;
}

const Gallery: FC<IGallery> = ({ children }) => {
  const checkForLocation = locationCheck();

  return (
    <section
      className={[
        styles.container,
        checkForLocation === 0 && styles.isOnHome,
      ].join(" ")}
    >
      <ul>{children}</ul>
    </section>
  );
};

export default Gallery;
