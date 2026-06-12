import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import poster from "@/assets/hero.png";
import { registerUser } from "@/api/auth";
import { auth_path, login_path } from "@/data/paths";

const Register = () => {
  const [pwdType, setpwdType] = useState(true);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    phone: "",
    role: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleUserRegistration = async () => {
    const res = await registerUser(data);
    navigate(`${auth_path}${login_path}`);
    return res;
  };
  return (
    <section className="flex w-[70%] h-[90vh] mx-auto rounded-2xl overflow-hidden shadow-xl">
      <div className="w-[55%] h-full px-10 py-32">
        <h1 className="text-4xl font-bold text-center mb-6">Register</h1>

        <div>
          <div className="flex justify-between">
            <input
              type="text"
              name=""
              id=""
              className="w-[49%] border-2 border-gray-400 p-2 rounded-xl text-center outline-none"
              placeholder="First Name"
              required
              value={data.firstName}
              onInput={(e) => {
                const value = e.currentTarget.value;
                setData((state) => ({
                  ...state,
                  firstName: value,
                }));
              }}
            />

            <input
              type="text"
              name=""
              id=""
              className="w-[49%] border-2 border-gray-400 p-2 rounded-xl text-center outline-none"
              placeholder="Last Name"
              required
              value={data.lastName}
              onInput={(e) => {
                const value = e.currentTarget.value;
                setData((state) => ({
                  ...state,
                  lastName: value,
                }));
              }}
            />
          </div>
          {/*  */}
          <div className="flex justify-between mt-3">
            <input
              type="text"
              name=""
              id=""
              className="w-[49%] border-2 border-gray-400 p-2 rounded-xl text-center outline-none"
              placeholder="Phone"
              required
              value={data.phone}
              onInput={(e) => {
                const value = e.currentTarget.value;
                setData((state) => ({
                  ...state,
                  phone: value,
                }));
              }}
            />

            <input
              type="text"
              name=""
              id=""
              className="w-[49%] border-2 border-gray-400 p-2 rounded-xl text-center outline-none"
              placeholder="Role"
              required
              value={data.role}
              onInput={(e) => {
                const value = e.currentTarget.value;
                setData((state) => ({
                  ...state,
                  role: value,
                }));
              }}
            />
          </div>
          {/*  */}

          <input
            type="text"
            name=""
            id=""
            className="block w-full border-2 border-gray-400 p-2 rounded-xl my-3 text-center outline-none"
            placeholder="Username"
            required
            value={data.userName}
            onInput={(e) => {
              const value = e.currentTarget.value;
              setData((state) => ({
                ...state,
                userName: value,
              }));
            }}
          />

          <input
            type="text"
            name=""
            id=""
            className="block w-full border-2 border-gray-400 p-2 rounded-xl my-3 text-center outline-none"
            placeholder="Email"
            required
            value={data.email}
            onInput={(e) => {
              const value = e.currentTarget.value;
              setData((state) => ({
                ...state,
                email: value,
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
            onClick={() => handleUserRegistration()}
          >
            Register
          </button>
        </div>

        <p className="text-gray-500">
          Already have an account?{" "}
          <Link
            to="/users/login"
            className="text-gray-500 hover:text-gray-400 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>

      {/*  */}
      <div className="w-[45%] h-full">
        <img src={poster} alt="" className="w-full h-full object-cover" />
      </div>
    </section>
  );
};

export default Register;
