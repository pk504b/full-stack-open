import { type NewPatient, type Patient, type PatientSanitized } from '../types.ts';
import data from '../data/patients.ts';
import { v1 as uuid } from 'uuid';

const patients = data;

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
  return patients.find((patient) => patient.id === id);
};

const create = (object: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    name: object.name,
    dateOfBirth: object.dateOfBirth,
    gender: object.gender,
    occupation: object.occupation,
    ssn: object.ssn,
    entries: [],
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