import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import routes from "./routes/routes";
import { BookLibraryProvider } from "./context/BookLibraryContext";

const App = () => {
  return (
    <BookLibraryProvider>
      <Router>
        <Header />
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
        <Footer />
      </Router>
    </BookLibraryProvider>
  );
};

export default App;
