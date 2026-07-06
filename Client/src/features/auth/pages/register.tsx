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
import { useFlareStore } from "@/zustand";
import { Spinner } from "@/components/ui/spinner";

const Register = () => {
  const { loading, setLoading } = useFlareStore();
  const [pwdType, setpwdType] = useState(true);
  const navigate = useNavigate();

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
    setLoading(true);
    await registerUser(data);
    setLoading(false);
    navigate(`${auth_path}${login_path}`);
  };

  return (
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
              {loading ? <Spinner /> : "Register"}
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
      </div>
    </section>
  );
};

export default Register;
