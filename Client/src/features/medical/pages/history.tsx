import ConditionsAndSurgeries from "../components/conditions-sugeries";
import PatientCard from "../components/patient-header-card";
import VitalsCards from "../components/vitals-cards";
import {
  getAllergies,
  getLifeStyle,
  getMedicalConditions,
  getSurgeries,
} from "@/api/records";
import { useHospitalStore } from "@/zustand/hospital";
import { useEffect, useState } from "react";
import type { PatientDetails } from "../interface";

const History = () => {
  // const appointment = {
  //   apt_id: "APT-20260616-084",
  //   date: "Mon, 16 Jun 2026",
  //   time: " 10:30 AM",
  //   location: "Apollo Hospital",
  //   type: " In-person",
  // };
  const { patient } = useHospitalStore();
  const [patientDetails, setPatientDetails] = useState<PatientDetails>({
    age: patient?.age || 0,
    sex: patient?.gender || "",
    dob: patient?.DOB || "",
    pat_id: "PAT-00421",
    bloog_grp: patient?.blood_group || "",
    allergies: [],
    medicalConditions: [],
    surgeries: [],
  });

  const getMedicalConditionsByPatient = async () => {
    const data = await getMedicalConditions(patient?.id);
    setPatientDetails((prev) => ({ ...prev, medicalConditions: data }));
  };

  const getAllergiesByPatient = async () => {
    const data = await getAllergies(patient?.id);
    setPatientDetails((prev) => ({ ...prev, allergies: data }));
  };

  const getSurgeriesByPatient = async () => {
    const data = await getSurgeries(patient?.id);
    setPatientDetails((prev) => ({ ...prev, surgeries: data }));
  };

  const getLifestyleByPatient = async () => {
    const data = await getLifeStyle(patient?.id);
    setPatientDetails((prev) => ({ ...prev, lifyeStyle: data }));
  };

  useEffect(() => {
    getMedicalConditionsByPatient();
    getAllergiesByPatient();
    getSurgeriesByPatient();
    getLifestyleByPatient();
  }, []);
  return (
    <>
      <PatientCard />

      <VitalsCards />

      <ConditionsAndSurgeries patient={patientDetails} />
    </>
  );
};

export default History;
