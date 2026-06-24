import ConditionsAndSurgeries from "../components/conditions-sugeries";
import PatientCard from "../components/patient-header-card";
import VitalsCards from "../components/vitals-cards";

const History = () => {
  // const appointment = {
  //   apt_id: "APT-20260616-084",
  //   date: "Mon, 16 Jun 2026",
  //   time: " 10:30 AM",
  //   location: "Apollo Hospital",
  //   type: " In-person",
  // };
  return (
    <>
      <PatientCard />

      <VitalsCards />

      <ConditionsAndSurgeries />
    </>
  );
};

export default History;
