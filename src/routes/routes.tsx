import Home from "../pages/Home";
import MyBooks from "../pages/MyBooks";
import Search from "../pages/Search";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/search", element: <Search /> },
  { path: "/my-books", element: <MyBooks /> },
];

export default routes;
