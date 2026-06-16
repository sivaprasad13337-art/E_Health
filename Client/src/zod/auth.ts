import * as z from "zod";

export const RegisterUserFormSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters.")
    .max(32, "First name cannot exceed 32 characters."),

  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters.")
    .max(32, "Last name cannot exceed 32 characters."),

  username: z
    .string()
    .min(5, "Username must be at least 5 characters.")
    .max(32, "Username cannot exceed 32 characters."),

  email: z.email("Please enter a valid email address."),

  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must contain exactly 10 digits."),

  role: z.enum(["PATIENT", "DOCTOR"], {
    error: "Please select a valid role.",
  }),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(32, "Password cannot exceed 32 characters."),
});
