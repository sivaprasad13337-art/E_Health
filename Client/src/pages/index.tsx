import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./home";
import { auth_path } from "@/data/paths";

const index = () => {
  const auth = true;
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={auth ? <Home /> : <Navigate replace to={auth_path} />}
          />

          {/* <Route
            path=""
            element={auth ? <Home /> : <Navigate replace to={auth_path} />}
          /> */}
        </Routes>
      </Router>
    </>
  );
};

export default index;
