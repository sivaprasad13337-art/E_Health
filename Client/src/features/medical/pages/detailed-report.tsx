import { useParams } from "react-router-dom";
import AppointmentReport from "../report/pages/appointment-report";
import LabReport from "../report/pages/lab-report";
import { useEffect, useState } from "react";
import { getMedicalReportById } from "@/api/appointment";

const MedicalDetailedReport = () => {
  const { id } = useParams();
  const type = id?.split("-");
  const [report, setReport] = useState();

  useEffect(() => {
    const getReport = async () => {
      const data = await getMedicalReportById(type[0], type[1]);
      setReport(data);
      // console.log(data);
    };

    getReport();
  }, []);

  //   [
  //   "Lab",
  //   "Imaging",
  //   "Prescription",
  //   "Discharge Summary",
  //   "Surgical",
  //   "Vaccination",
  //   "Cardiology",
  //   "Neurology",
  //   "Pulmonology",
  //   "Orthopedics",
  //   "Dermatology",
  //   "Other",
  // ];

  return (
    <>
      {report
        ? [
            "Cardiology",
            "Neurology",
            "Pulmonology",
            "Orthopedics",
            "Dermatology",
          ].includes(type[0]) && <AppointmentReport report={report} />
        : null}
      {report
        ? ["Lab"].includes(type[0]) && <LabReport report={report} />
        : null}
    </>
  );
};

export default MedicalDetailedReport;
