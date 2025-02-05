import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../enums/NavigationRoutes.enum";

const SeeMoreButton = () => {
  const navigate = useNavigate();

  return <button onClick={() => navigate(NavigationRoutes.MyBooks)}>+</button>;
};

export default SeeMoreButton;
