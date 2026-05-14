import { PatientSchema, type NewPatient, type Patient, type PatientSanitized } from '../types.ts';
import data from '../data/patients.ts';
import { v1 as uuid } from 'uuid';
import { z } from "zod";

const patients: Patient[] = z.array(PatientSchema).parse(data);

const getAll = (): Patient[] => {
  return patients;
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

const create = (object: NewPatient): Patient => {
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
  create,
};