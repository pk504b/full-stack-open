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

// export type Patient = z.infer<typeof PatientSchema>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type PatientSanitized = Omit<Patient, 'ssn' | 'entries'>;