import * as z from "zod";

export const PracticeInfoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Designation or Degree must be at least 2 characters")
    .max(200, "Designation or Degree must be below 200 characters"),

  type: z.enum(["Education", "Experience"], {
    error: "Please select the valid type.",
  }),

  where: z
    .string()
    .trim()
    .min(2, "Hospital or University must be at least 2 characters")
    .max(200, "Hospital or University must be below 200 characters"),

  when: z.coerce.date().refine((date) => date <= new Date(), {
    message: "You cannot add education or experience in the future",
  }),
});
