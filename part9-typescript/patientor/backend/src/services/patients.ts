import data from '../data/patients.ts';
import type { NewPatient, Patient, PatientSanitized } from '../types.ts';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = [];

const getAll = (): Patient[] => {
  return data;
};

const getAllSanitized = (): PatientSanitized[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => {
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