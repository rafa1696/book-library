import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../enums/NavigationRoutes.enum";
import styles from "./Footer.module.css";

const Footer = () => {
  const navigate = useNavigate();

  const navigateToRoute = (routeName: NavigationRoutes) => {
    // console.log(routeName);
    navigate(routeName);
  };

  return (
    <footer className={styles.container}>
      <button onClick={() => navigateToRoute(NavigationRoutes.Home)}>
        Home
      </button>
      <button onClick={() => navigateToRoute(NavigationRoutes.MyBooks)}>
        Meus Livros
      </button>
    </footer>
  );
};

export default Footer;
