import { ReportTypes } from "@/data";
import * as z from "zod";

export const ReportSchema = z.object({
  title: z
    .string()
    .trim()
    .min(4, "Report title must be at least 4 characters")
    .max(100, "Report title must be below 100 characters"),

  note: z
    .string()
    .trim()
    .min(10, "Report description must be at least 10 characters")
    .max(500, "Report description must be below 500 characters"),

  type: z.enum(ReportTypes, {
    error: "Please select a valid report type",
  }),
});

export const VitalSchema = z.object({
  blood_pressure: z
    .string()
    .trim()
    .regex(/^\d{2,3}\/\d{2,3}$/, "Blood pressure must be in the format 120/80"),

  heart_rate: z.coerce
    .number()
    .min(40, "Heart rate must be at least 40 BPM")
    .max(200, "Heart rate must be below 200 BPM"),

  temperature: z.coerce
    .number()
    .min(90, "Temperature must be at least 90°F")
    .max(110, "Temperature must be below 110°F"),

  spo2: z.coerce
    .number()
    .min(50, "SpO₂ must be at least 50%")
    .max(100, "SpO₂ cannot exceed 100%"),

  weight: z.coerce
    .number()
    .min(2, "Weight must be at least 2 kg")
    .max(500, "Weight must be below 500 kg"),
});

export const DiagnosisAndFindingsSchema = z.object({
  primary_diagnosis: z
    .string()
    .trim()
    .min(5, "Primary diagnosis must be at least 5 characters")
    .max(250, "Primary diagnosis must be below 250 characters"),

  secondary_findings: z
    .string()
    .trim()
    .max(250, "Secondary findings must be below 250 characters")
    .optional()
    .or(z.literal("")),

  notes: z
    .string()
    .trim()
    .max(300, "Notes must be below 300 characters")
    .optional()
    .or(z.literal("")),
});

export const PrescriptionItemSchema = z.object({
  medicine: z
    .string()
    .trim()
    .min(2, "Medicine name must be at least 2 characters")
    .max(100, "Medicine name must be below 100 characters"),

  dosage: z.coerce.number().positive("Dosage must be greater than 0"),

  frequency: z.enum(
    [
      "Once a day",
      "Twice a day",
      "Thrice a day",
      "Once a week",
      "Twice a week",
      "Thrice a week",
    ],
    { error: "Please select the frequency of this medicine" },
  ),

  time: z
    .string()
    .trim()
    .min(2, "Administration instructions are required")
    .max(150, "Administration instructions must be below 150 characters"),
  // Example:
  // Before Food
  // After Breakfast
  // Before Sleep

  duration: z.coerce
    .number()
    .min(1, "Duration must be at least 1 day")
    .max(365, "Duration cannot exceed 365 days"),
});

export const PrescriptionSchema = z.object({
  medicines: z.array(PrescriptionItemSchema).min(1),
});
