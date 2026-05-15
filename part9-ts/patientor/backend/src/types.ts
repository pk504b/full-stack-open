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

export interface EntryBase {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

export interface EntryHealthCheck extends EntryBase {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface EntryOccupationalHealthcare extends EntryBase {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface EntryHospital extends EntryBase {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry = EntryHealthCheck | EntryOccupationalHealthcare | EntryHospital;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

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