import { PatientSchema, type NewPatient, type Patient, type PatientSanitized } from '../types.ts';
import data from '../data/patients.ts';
import { v1 as uuid } from 'uuid';
import { z } from "zod";

const patients = z.array(PatientSchema).parse(data);

const getAll = (): Patient[] => {
  return patients.map(p => ({ ...p, entries: [] }));
};

const getAllSanitized = (): PatientSanitized[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const getById = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  if (patient) {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      ssn: patient.ssn,
      gender: patient.gender,
      occupation: patient.occupation,
      entries: []
    };
  }
  return undefined;
};

const create = (object: NewPatient): PatientSanitized => {
  const newPatient = {
    id: uuid(),
    name: object.name,
    dateOfBirth: object.dateOfBirth,
    gender: object.gender,
    occupation: object.occupation,
    ssn: object.ssn
  };
  patients.push(newPatient);
  return newPatient;
};
export default {
  getAll,
  getAllSanitized,
  getById,
  create,
};