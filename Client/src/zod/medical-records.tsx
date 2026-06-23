import {
  ActivityOptions,
  BloodGroups,
  Genders,
  SeverityOptions,
  SleepQualityOptions,
  SmokingAndAlcoholOptions,
} from "@/data";
import * as z from "zod";

export const BasicHealthInfoSchema = z.object({
  DOB: z.coerce.date().refine((date) => date <= new Date(), {
    message: "You cannot born be in the future",
  }),

  blood_group: z.enum(BloodGroups, {
    error: "Please select your Blood group.",
  }),

  gender: z.enum(Genders, {
    error: "Please select your gender.",
  }),

  height: z.coerce
    .number()
    .min(50, "Height must be at least 50 cm")
    .max(300, "Height must be below 300 cm"),

  weight: z.coerce
    .number()
    .min(2, "Weight must be at least 2 kg")
    .max(500, "Weight must be below 500 kg"),
});

export const UnderlyingConditionsShecma = z.object({
  condition: z
    .string()
    .trim()
    .min(4, "Condition must be at least 4 characters")
    .max(100, "Condition must be below 100 characters"),

  since: z.coerce
    .number()
    .min(1900, "Year cannot be before 1900")
    .max(new Date().getFullYear(), "Year cannot be in the future"),

  management: z
    .string()
    .trim()
    .min(4, "Management must be at least 4 characters")
    .max(100, "Management must be below 100 characters"),

  medication: z
    .string()
    .trim()
    .min(4, "Medication must be at least 4 characters")
    .max(100, "Medication must be below 100 characters"),
});

export const SurgeryHistorySchema = z.object({
  surgery: z
    .string()
    .trim()
    .min(4, "Surgeryname must be at least 4 characters")
    .max(100, "Surgeryname must be below 100 characters"),

  reason: z
    .string()
    .trim()
    .min(4, "Reason for Surgery must be at least 4 characters")
    .max(100, "Reason for Surgery must be below 100 characters"),

  date: z.coerce.date().refine((date) => date <= new Date(), {
    message: "Surgery date cannot be in the future",
  }),

  hospital: z
    .string()
    .trim()
    .min(4, "Hospital Name must be at least 4 characters")
    .max(100, "Hospital Name must be below 100 characters"),

  notes: z.string().trim().min(10, "Please provide more details").optional(),

  summary: z.string().trim().min(10, "Please provide more details").optional(),
});

export const AllergySchema = z.object({
  allergy: z
    .string()
    .trim()
    .min(4, "Allergy must be at least 4 characters")
    .max(100, "Allergy must be below 100 characters"),

  severity: z.enum(SeverityOptions, {
    error: "Please select the severity of the allergy.",
  }),

  note: z
    .string()
    .trim()
    .min(4, "Note must be at least 4 characters")
    .max(100, "Note must be below 100 characters"),
});

export const LifestyleHabitsSchema = z.object({
  smoking: z.enum(SmokingAndAlcoholOptions, {
    error: "Please select the valid option.",
  }),

  alcohol: z.enum(SmokingAndAlcoholOptions, {
    error: "Please select the valid option.",
  }),

  activity: z.enum(ActivityOptions, {
    error: "Please select the valid option.",
  }),

  diet: z.enum(["Vegetarian", "Non-Vegetarian"], {
    error: "Please select the valid option.",
  }),

  sleep: z.enum(SleepQualityOptions, {
    error: "Please select the valid option.",
  }),

  taking_medication: z.enum(["Yes", "No"], {
    error: "Please select the valid option.",
  }),
});
