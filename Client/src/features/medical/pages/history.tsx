import ConditionsAndSurgeries from "../components/conditions-sugeries";
import PatientCard from "../components/patient-header-card";
import VitalsCards from "../components/vitals-cards";

const History = () => {
  return (
    <>
      <PatientCard />

      <VitalsCards />

      <ConditionsAndSurgeries />
    </>
  );
};

export default History;
