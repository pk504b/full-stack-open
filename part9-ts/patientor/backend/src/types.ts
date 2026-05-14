import { z } from "zod";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
};

export const Gender = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  gender: z.enum(Gender),
  occupation: z.string(),
  ssn: z.string(),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export const PatientSchema = z.object({
  id: z.string(),
  ...NewPatientSchema.shape,
});

export type Patient = z.infer<typeof PatientSchema>;

export type PatientSanitized = Omit<Patient, "ssn">;
