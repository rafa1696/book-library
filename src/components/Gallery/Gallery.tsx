import { FC } from "react";
import styles from "./Gallery.module.css";
import { useLocation } from "react-router-dom";
import { NavigationRoutes } from "../../enums/NavigationRoutes.enum";

interface IGallery {
  children: React.ReactNode;
}

const Gallery: FC<IGallery> = ({ children }) => {
  const location = useLocation();

  return (
    <section
      className={[
        styles.container,
        location.pathname === NavigationRoutes.Home && styles.isOnHome,
      ].join(" ")}
    >
      <ul>{children}</ul>
    </section>
  );
};

export default Gallery;
