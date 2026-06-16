import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import poster from "@/assets/hero.png";
import { registerUser } from "@/api/auth";
import { auth_path, login_path } from "@/data/paths";
import { Form } from "@/hooks/form";
import { RegisterUserFormSchema } from "@/zod/auth";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    username: "",
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
    // {
    //   title: "",
    //   description: "",
    // },
  });

  const onSubmit = async(data: z.infer<typeof RegisterUserFormSchema>) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    const res = await registerUser(data);
    navigate(`${auth_path}${login_path}`);
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 7)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

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

    <section className="flex w-[70%] h-[90vh] mx-auto rounded-2xl overflow-hidden shadow-xl">
      <Card className="w-full sm:max-w-xl">
        <CardHeader>
          <CardTitle>Bug Report</CardTitle>
          <CardDescription>
            Help us improve by reporting bugs you encounter.
          </CardDescription>
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

              {/* <Controller
                   name="last_name"
                   control={form.control}
                   render={({ field, fieldState }) => (
                     <Field data-invalid={fieldState.invalid}>
                       <FieldLabel htmlFor="form-rhf-demo-description">
                         Description
                       </FieldLabel>
                       <InputGroup>
                         <InputGroupTextarea
                           {...field}
                           id="form-rhf-demo-description"
                           placeholder="I'm having an issue with the login button on mobile."
                           rows={6}
                           className="min-h-24 resize-none"
                           aria-invalid={fieldState.invalid}
                         />
                         <InputGroupAddon align="block-end">
                           <InputGroupText className="tabular-nums">
                             {field.value.length}/100 characters
                           </InputGroupText>
                         </InputGroupAddon>
                       </InputGroup>
                       <FieldDescription>
                         Include steps to reproduce, expected behavior, and what
                         actually happened.
                       </FieldDescription>
                       {fieldState.invalid && (
                         <FieldError errors={[fieldState.error]} />
                       )}
                     </Field>
                   )}
                 /> */}
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="block">
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="form-rhf-demo"
              className="bg-blue-700 p-2 rounde my-2 font-semibold text-white"
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
        </CardFooter>
      </Card>

      {/* <button
        className="w-full bg-blue-700 p-2 rounded-2xl my-2 font-semibold text-white"
        onClick={() => handleUserRegistration()}
      >
        Register
      </button> */}

      {/*  */}
      <div className="w-[45%] h-full">
        <img src={poster} alt="" className="w-full h-full object-cover" />
      </div>
    </section>
  );
};

export default Register;
