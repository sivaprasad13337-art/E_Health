import ConditionsAndSurgeries from "../components/conditions-sugeries";
import PatientCard from "../components/patient-header-card";
import VitalsCards from "../components/vitals-cards";
import { getAllergies, getMedicalConditions, getSurgeries } from "@/api/records";
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
    surgeries: []
  });

  const getMedicalConditionsBypatient = async () => {
    const data = await getMedicalConditions(patient?.id);
    setPatientDetails((prev) => ({ ...prev, medicalConditions: data }));
  };

  const getAllergiesBypatient = async () => {
    const data = await getAllergies(patient?.id);
    setPatientDetails((prev) => ({ ...prev, allergies: data }));
  };

    const getSurgeriessBypatient = async () => {
    const data = await getSurgeries(patient?.id);
    setPatientDetails((prev) => ({ ...prev, surgeries: data }));
  };

  useEffect(() => {
    getMedicalConditionsBypatient();
    getAllergiesBypatient();
    getSurgeriessBypatient()
  }, []);
  return (
    <>
      <PatientCard />

      <VitalsCards />

      <ConditionsAndSurgeries patient={patientDetails}/>
    </>
  );
};

export default History;
