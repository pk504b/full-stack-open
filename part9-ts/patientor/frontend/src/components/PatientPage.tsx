import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Diagnosis, Gender, Patient } from "../types";
import { Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import diagnosesServices from "../services/diagnoses";

export default function PatientPage() {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const { id } = useParams();
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
          <div key={entry.id}>
            {entry.date} <i>{entry.description}</i>
            <ul style={{ margin: "0" }}>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>{code} {diagnoses?.find((d) => d.code === code)?.name}</li>
              ))}
            </ul>
            {entry.type === 'Hospital' && (
              <>
                discharge: {entry.discharge.date}
                <br />
                criteria: {entry.discharge.criteria}
              </>
            )}
            {entry.type === 'OccupationalHealthcare' && (
              <>
                employer: {entry.employerName}
                <br />
                sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
              </>
            )}
            {entry.type === 'HealthCheck' && (
              <>
                health check rating: {entry.healthCheckRating}
              </>
            )}
            <br />
            <br />
          </div>
        ))}
    </div>
  );
}