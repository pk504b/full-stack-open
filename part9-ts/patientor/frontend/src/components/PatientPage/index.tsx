import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Diagnosis, EntryWithoutId, Gender, Patient } from "../../types";
import { Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import diagnosesServices from "../../services/diagnoses";
import ShowEntry from "./Entry";
import NewEntry from "./NewEntry";
import axios from "axios";
import { Alert } from "@mui/material";

export default function PatientPage() {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [error, setError] = useState<string>();
  const { id } = useParams();

  const addEntry = async (entry: EntryWithoutId) => {
    try {
      const addedEntry = await patientService.addEntry(id!, entry);
      const updatedPatient = { ...patient!, entries: [...patient!.entries, addedEntry] };
      setPatient(updatedPatient);
      setError(undefined);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err?.response?.data.error.map((issue: any) => `invalid ${issue.path}`).join(', ');
        console.error(message);
        setError(message);
      } else {
        console.error("Unknown error", err);
        setError("Unknown error");
      }
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };

    void fetchPatient();

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesServices.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, [id]);

  return (
    <div>
      <Typography variant="h5">
          {patient?.name}
          {patient?.gender === Gender.Male && <MaleIcon />}
          {patient?.gender === Gender.Female && <FemaleIcon />}
          {patient?.gender === Gender.Other && <TransgenderIcon />}
        </Typography>
        <Typography variant="body1">
          ssn: {patient?.ssn} <br />
          occupation: {patient?.occupation} <br />
          date of birth: {patient?.dateOfBirth}
        </Typography>

        <br />

        <Typography variant="h6">
          Entries
        </Typography>
        {patient?.entries.map((entry) => (
          <div key={entry.id} style={{ border: "solid", margin: "0.5em", padding: "0.5em" }}>
            {entry.date} <br />
            <i>{entry.description}</i>
            <ul style={{ margin: "0" }}>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>{code} {diagnoses?.find((d) => d.code === code)?.name}</li>
              ))}
            </ul>
            <ShowEntry entry={entry} />
            <br />
            diagnose by {entry.specialist}
          </div>
        ))}

        <h3>Add New Entry</h3>
        {error && <Alert severity="error" style={{ marginBottom: "1rem" }}>{error}</Alert>}
        <NewEntry addEntry={addEntry} />
    </div>
  );
}