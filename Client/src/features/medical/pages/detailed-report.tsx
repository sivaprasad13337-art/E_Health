import AppointmentReport from "../report/pages/appointment-report";
import LabReport from "../report/pages/lab-report";

const MedicalDetailedReport = () => {
  const type = "Lab";

  return (
    <>
      {[
        "Prescription",
        "Cardiology",
        "Neurology",
        "Pulmonology",
        "Orthopedics",
        "Dermatology",
        "Other",
      ].includes(type) && <AppointmentReport />}
      {type === "Lab" && <LabReport />}
    </>
  );
};

export default MedicalDetailedReport;
