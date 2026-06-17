import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginFormSchema } from "@/zod/auth";

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
  // const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  // const handleLogin = async () => {
  //   const res = await loginUser(data);
  //   navigate(root);
  //   return res;
  // };

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    await loginUser(data);
    navigate(root);
  };

  return (
    // <section className="flex w-[60%] h-[90vh] mx-auto rounded-2xl overflow-hidden shadow-xl mt-4">
    //   <div className="w-[50%] h-full">
    //     <img src={image} alt="" className="w-full h-full object-cover" />
    //   </div>

    //   <div className="w-[50%] h-full px-6 py-40">
    //     <h1 className="text-4xl font-bold text-center mb-6">Login</h1>

    //     <div>
    //       <input
    //         type="text"
    //         name=""
    //         id=""
    //         className="block w-full border-2 border-gray-400 p-2 rounded-xl my-3 text-center outline-none"
    //         placeholder="Username"
    //         required
    //         value={data.username}
    //         onInput={(e) => {
    //           const value = e.currentTarget.value;
    //           setData((state) => ({
    //             ...state,
    //             username: value,
    //           }));
    //         }}
    //       />

    //       <div className="relative">
    //         <input
    //           type={pwdType ? "password" : "text"}
    //           name=""
    //           id=""
    //           className="block w-full border-2 border-gray-400 p-2 rounded-xl my-3 text-center outline-none"
    //           placeholder="Password"
    //           required
    //           value={data.password}
    //           onInput={(e) => {
    //             const value = e.currentTarget.value;
    //             setData((state) => ({
    //               ...state,
    //               password: value,
    //             }));
    //           }}
    //         />

    //         <button
    //           className="absolute top-3 right-3"
    //           onClick={() => setpwdType(!pwdType)}
    //         >
    //           {pwdType ? (
    //             <EyeOpenIcon className="w-[1.3rem] h-[1.3rem]" />
    //           ) : (
    //             <EyeClosedIcon className="w-[1.1rem] h-[1.1rem]" />
    //           )}
    //         </button>
    //       </div>

    //       <button
    //         className="w-full bg-blue-700 p-2 rounded-2xl my-2 font-semibold text-white"
    //         onClick={() => handleLogin()}
    //       >
    //         Login
    //       </button>
    //     </div>

    //     <Link
    //       to={`${auth_path}${forget_password_path}`}
    //       className="text-gray-500 hover:text-gray-400 font-semibold"
    //     >
    //       Forgot possword?
    //     </Link>
    //     <p className="text-gray-500">
    //       Don't have an account?{" "}
    //       <Link
    //         to={`${auth_path}${registor_path}`}
    //         className="text-gray-500 hover:text-gray-400 font-semibold"
    //       >
    //         Register
    //       </Link>
    //     </p>
    //   </div>
    // </section>

    <section className="flex w-[70%] h-[90vh] mx-auto rounded-2xl overflow-hidden shadow-xl">
      <Card className="w-full sm:max-w-xl my-auto rounded-none bg-transparent !ring-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Sign in to manage your health journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* username */}
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-username">
                      UserName
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="@Jhon_Doe"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="relative">
                    <FieldLabel htmlFor="form-rhf-demo-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-password"
                      type={pwdType ? "password" : "text"}
                      aria-invalid={fieldState.invalid}
                      placeholder="Password"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}

                    <button
                      className="absolute top-8 right-3 !w-[1rem]"
                      type="button"
                      onClick={() => setpwdType((prev) => !prev)}
                    >
                      {pwdType ? (
                        <EyeOpenIcon className="w-[1.3rem] h-[1.3rem]" />
                      ) : (
                        <EyeClosedIcon className="w-[1.1rem] h-[1.1rem]" />
                      )}
                    </button>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <div className="px-4">
          <Field orientation="horizontal">
            <Button
              type="submit"
              form="form-rhf-demo"
              className="w-full py-5 font-bold"
            >
              Login
            </Button>
          </Field>

          <div className="my-2">
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
        </div>
      </Card>

      <div className="relative w-[50%] h-full overflow-hidden">
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#0a4f47]/90 via-[#1A9E8F]/80 to-[#22C993]/70" />

        {/* <div className="relative z-10 h-full flex flex-col justify-between p-8">
          <div>tag</div>
          <div>headline</div>
        </div> */}
      </div>
    </section>
  );
};

export default Login;
