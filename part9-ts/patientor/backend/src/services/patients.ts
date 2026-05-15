import { type Entry, type EntryWithoutId, type NewPatient, type Patient, type PatientSanitized } from '../types.ts';
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

const addEntry = (id: string, object: EntryWithoutId): Entry => {
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) {
    throw new Error(`Patient with id ${id} not found`);
  }
  const newEntry: Entry = {
    ...object,
    id: uuid(),
  };
  patient.entries.push(newEntry);
  return newEntry;
}

export default {
  getAll,
  getAllSanitized,
  getById,
  create,
  addEntry,
};