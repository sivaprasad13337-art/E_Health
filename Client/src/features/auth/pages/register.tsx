import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import poster from "@/assets/hero.png";
import { registerUser } from "@/api/auth";
import { auth_path, login_path } from "@/data/paths";
import { RegisterUserFormSchema } from "@/zod/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  //   FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Register = () => {
  const [pwdType, setpwdType] = useState(true);
  // const [data, setData] = useState({
  //   first_name: "",
  //   last_name: "",
  //   username: "",
  //   phone: "",
  //   role: "",
  //   email: "",
  //   password: "",
  // });
  const navigate = useNavigate();

  // const handleUserRegistration = async () => {
  //   const res = await registerUser(data);
  //   navigate(`${auth_path}${login_path}`);
  //   return res;
  // };

  //

  const form = useForm<z.infer<typeof RegisterUserFormSchema>>({
    resolver: zodResolver(RegisterUserFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      phone: "",
      role: "PATIENT",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterUserFormSchema>) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    await registerUser(data);
    navigate(`${auth_path}${login_path}`);
  };

  return (
    // <section className="flex w-[70%] h-[90vh] mx-auto rounded-2xl overflow-hidden shadow-xl">
    //   <div className="w-[55%] h-full px-10 py-32">
    //     <h1 className="text-4xl font-bold text-center mb-6">Register</h1>

    //     <div>
    //       <div className="flex justify-between">
    //         <input
    //           type="text"
    //           name=""
    //           id=""
    //           className="w-[49%] border-2 border-gray-400 p-2 rounded-xl text-center outline-none"
    //           placeholder="First Name"
    //           required
    //           value={data.firstName}
    //           onInput={(e) => {
    //             const value = e.currentTarget.value;
    //             setData((state) => ({
    //               ...state,
    //               firstName: value,
    //             }));
    //           }}
    //         />

    //         <input
    //           type="text"
    //           name=""
    //           id=""
    //           className="w-[49%] border-2 border-gray-400 p-2 rounded-xl text-center outline-none"
    //           placeholder="Last Name"
    //           required
    //           value={data.lastName}
    //           onInput={(e) => {
    //             const value = e.currentTarget.value;
    //             setData((state) => ({
    //               ...state,
    //               lastName: value,
    //             }));
    //           }}
    //         />
    //       </div>
    //       {/*  */}
    //       <div className="flex justify-between mt-3">
    //         <input
    //           type="text"
    //           name=""
    //           id=""
    //           className="w-[49%] border-2 border-gray-400 p-2 rounded-xl text-center outline-none"
    //           placeholder="Phone"
    //           required
    //           value={data.phone}
    //           onInput={(e) => {
    //             const value = e.currentTarget.value;
    //             setData((state) => ({
    //               ...state,
    //               phone: value,
    //             }));
    //           }}
    //         />

    //         <input
    //           type="text"
    //           name=""
    //           id=""
    //           className="w-[49%] border-2 border-gray-400 p-2 rounded-xl text-center outline-none"
    //           placeholder="Role"
    //           required
    //           value={data.role}
    //           onInput={(e) => {
    //             const value = e.currentTarget.value;
    //             setData((state) => ({
    //               ...state,
    //               role: value,
    //             }));
    //           }}
    //         />
    //       </div>
    //       {/*  */}

    //       <input
    //         type="text"
    //         name=""
    //         id=""
    //         className="block w-full border-2 border-gray-400 p-2 rounded-xl my-3 text-center outline-none"
    //         placeholder="Username"
    //         required
    //         value={data.userName}
    //         onInput={(e) => {
    //           const value = e.currentTarget.value;
    //           setData((state) => ({
    //             ...state,
    //             userName: value,
    //           }));
    //         }}
    //       />

    //       <input
    //         type="text"
    //         name=""
    //         id=""
    //         className="block w-full border-2 border-gray-400 p-2 rounded-xl my-3 text-center outline-none"
    //         placeholder="Email"
    //         required
    //         value={data.email}
    //         onInput={(e) => {
    //           const value = e.currentTarget.value;
    //           setData((state) => ({
    //             ...state,
    //             email: value,
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
    //         onClick={() => handleUserRegistration()}
    //       >
    //         Register
    //       </button>
    //     </div>

    //     <p className="text-gray-500">
    //       Already have an account?{" "}
    //       <Link
    //         to="/users/login"
    //         className="text-gray-500 hover:text-gray-400 font-semibold"
    //       >
    //         Login
    //       </Link>
    //     </p>
    //   </div>

    //   {/*  */}
    //   <div className="w-[45%] h-full">
    //     <img src={poster} alt="" className="w-full h-full object-cover" />
    //   </div>
    // </section>

    <section className="flex w-[70%] h-[90vh] mx-auto rounded-2xl overflow-hidden shadow-xl mt-[5vh] bg-white">
      <Card className="w-full sm:max-w-xl my-auto rounded-none bg-transparent !ring-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Create account</CardTitle>
          <CardDescription>Join E-Hospital today.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex gap-2">
                <Controller
                  name="first_name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-first_name">
                        First Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-first_name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Jhon.."
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                {/* last_name */}
                <Controller
                  name="last_name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-last_name">
                        Last Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-last_name"
                        aria-invalid={fieldState.invalid}
                        placeholder="doe"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="flex gap-2">
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

                {/* role */}
                <Controller
                  name="role"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Role</FieldLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full max-w-48">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Role</SelectLabel>

                            <SelectItem value="PATIENT">Patient</SelectItem>

                            <SelectItem value="DOCTOR">Doctor</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div className="flex gap-2">
                {/* email */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-email">
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="jhondoe@gmail.com"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* phone */}
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-phone">
                        Phone
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-phone"
                        aria-invalid={fieldState.invalid}
                        placeholder="Phone No"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

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
            {/* <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button> */}
            <Button
              type="submit"
              form="form-rhf-demo"
              className="py-5 w-full rounded-sm my-2 font-bold text-white"
            >
              Register
            </Button>
          </Field>
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
      </Card>

      <div className="relative w-[50%] h-full overflow-hidden">
        <img
          src={poster}
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

export default Register;
