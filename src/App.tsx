import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import routes from "./routes/routes";

const App = () => {
  return (
    <>
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
    </>
  );
};

export default App;
