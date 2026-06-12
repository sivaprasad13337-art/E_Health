import { auth_path, login_path } from "@/data/paths";
import LoginForm from "@/features/auth";
import { Navigate, Route, Routes } from "react-router-dom";

const Login = () => {
  return (
    <Routes>
      <Route path={login_path} element={<LoginForm />} />
      {/* <Route path={otp_path} element={<Otp />} /> */}
      <Route
        path="*"
        element={<Navigate to={`${auth_path}${login_path}`} replace={true} />}
      />
    </Routes>
  );
};

export default Login;
