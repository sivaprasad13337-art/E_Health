import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./home";
import {
  auth_path,
  forget_password_path,
  registor_path,
  root,
} from "@/data/paths";
import SignUp from "./sign-up";
import Login from "./login";
import Forgetpassword from "./forget-password";
import { useAuthStore } from "@/zustand/auth";

const index = () => {
  const { auth } = useAuthStore();
  // const auth = false;
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={auth ? <Home /> : <Navigate replace to={auth_path} />}
          />

          <Route
            path={`${auth_path}/*`}
            element={auth ? <Navigate replace to={root} /> : <Login />}
          />

          <Route
            path={`${auth_path}${registor_path}`}
            element={auth ? <Navigate replace to={root} /> : <SignUp />}
          />
          <Route
            path={`${auth_path}${forget_password_path}`}
            element={auth ? <Navigate replace to={root} /> : <Forgetpassword />}
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
