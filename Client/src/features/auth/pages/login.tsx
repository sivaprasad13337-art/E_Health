import { Link, useNavigate } from "react-router-dom";
import image from "@/assets/imgs/doctor-hero.webp";
import { useState } from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { loginUser } from "@/api/auth";
import {
  auth_path,
  forget_password_path,
  registor_path,
  root,
} from "@/data/paths";

const Login = () => {
  const [pwdType, setpwdType] = useState(true);
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await loginUser(data);
    navigate(root);
    return res;
  };
  return (
    <section className="flex w-[60%] h-[90vh] mx-auto rounded-2xl overflow-hidden shadow-xl mt-4">
      <div className="w-[50%] h-full">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="w-[50%] h-full px-6 py-40">
        <h1 className="text-4xl font-bold text-center mb-6">Login</h1>

        <div>
          <input
            type="text"
            name=""
            id=""
            className="block w-full border-2 border-gray-400 p-2 rounded-xl my-3 text-center outline-none"
            placeholder="Username"
            required
            value={data.username}
            onInput={(e) => {
              const value = e.currentTarget.value;
              setData((state) => ({
                ...state,
                username: value,
              }));
            }}
          />

          <div className="relative">
            <input
              type={pwdType ? "password" : "text"}
              name=""
              id=""
              className="block w-full border-2 border-gray-400 p-2 rounded-xl my-3 text-center outline-none"
              placeholder="Password"
              required
              value={data.password}
              onInput={(e) => {
                const value = e.currentTarget.value;
                setData((state) => ({
                  ...state,
                  password: value,
                }));
              }}
            />

            <button
              className="absolute top-3 right-3"
              onClick={() => setpwdType(!pwdType)}
            >
              {pwdType ? (
                <EyeOpenIcon className="w-[1.3rem] h-[1.3rem]" />
              ) : (
                <EyeClosedIcon className="w-[1.1rem] h-[1.1rem]" />
              )}
            </button>
          </div>

          <button
            className="w-full bg-blue-700 p-2 rounded-2xl my-2 font-semibold text-white"
            onClick={() => handleLogin()}
          >
            Login
          </button>
        </div>

        <Link
          to={`${auth_path}${forget_password_path}`}
          className="text-gray-500 hover:text-gray-400 font-semibold"
        >
          Forgot possword?
        </Link>
        <p className="text-gray-500">
          Don't have an account?{" "}
          <Link
            to={`${auth_path}${registor_path}`}
            className="text-gray-500 hover:text-gray-400 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
