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

  return (
    <>
      {report
        ? type[0] === "APPOINTMENT" && <AppointmentReport report={report} />
        : null}
      {report ? type[0] === "LAB" && <LabReport report={report} /> : null}
    </>
  );
};

export default MedicalDetailedReport;
