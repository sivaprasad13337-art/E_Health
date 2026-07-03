import type { LabReport } from "@/types/reports";
import LabReportHeader from "../components/lab-report/lap-report-header";
import TestResultes from "../components/lab-report/test-results";
import LabDetailsAndNotes from "../components/lab-report/lab-details-notes";
import { useState } from "react";

const LabReport = ({ report }: { report: LabReport }) => {
  console.log(report);

  // const LabReport = {
  //   patient_name: "Mr.GANDHI SID",
  //   lab_details: {
  //     name: null,
  //     location: null,
  //     collected: "15-03-2026 07:26 AM",
  //     reported: "15-03-2026 10:30 AM",
  //   },
  //   tests: [
  //     {
  //       panel: "BIO CHEMISTRY",
  //       subtests: [
  //         {
  //           name: "BLOOD GLUCOSE -(FBS)",
  //           value: {
  //             raw: "94",
  //             numeric: 94,
  //             text: null,
  //           },
  //           unit: "mg/dL",
  //           reference_range:
  //             "Normal: 70 -100 mg/dL Impaired FG: 100-125 mg/dL Diabetes mellitus: >/=126 mg/dL",
  //           status: "Normal",
  //           flag: null,
  //         },
  //         {
  //           name: "BLOOD GLUCOSE, POST PRANDIAL (PP), 2 HOURS, PLASMA",
  //           value: {
  //             raw: "135",
  //             numeric: 135,
  //             text: null,
  //           },
  //           unit: "mg/dL",
  //           reference_range: "80 - 140",
  //           status: "Normal",
  //           flag: null,
  //         },
  //       ],
  //     },
  //   ],
  // };

  console.log("====================================");
  console.log(report);
  console.log("====================================");
  const [overView, setOverview] = useState({
    normal: [],
    attention: [],
    critical: [],
  });

  report.tests.filter((item) =>
    item.subtests.filter((subItem) => subItem.status === "Normal"),
  );
  return (
    <>
      <LabReportHeader report={report} action={true} />
      <section className="flex gap-6">
        <div className="w-[60%]">
          <TestResultes tests={report.tests} />
        </div>

        <div className="w-[40%]">
          <LabDetailsAndNotes report={report} />
        </div>
      </section>
    </>
  );
};

export default LabReport;
