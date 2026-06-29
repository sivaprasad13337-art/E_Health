import LabReportHeader from "../components/lab-report/lap-report-header";
import TestResultes from "../components/lab-report/test-results";

const LabReport = () => {
  const LabReport = {
    patient_name: "Mr.GANDHI SID",
    lab_details: {
      name: null,
      location: null,
      collected: "15-03-2026 07:26 AM",
      reported: "15-03-2026 10:30 AM",
    },
    tests: [
      {
        panel: "BIO CHEMISTRY",
        subtests: [
          {
            name: "BLOOD GLUCOSE -(FBS)",
            value: {
              raw: "94",
              numeric: 94,
              text: null,
            },
            unit: "mg/dL",
            reference_range:
              "Normal: 70 -100 mg/dL Impaired FG: 100-125 mg/dL Diabetes mellitus: >/=126 mg/dL",
            status: "Normal",
            flag: null,
          },
          {
            name: "BLOOD GLUCOSE, POST PRANDIAL (PP), 2 HOURS, PLASMA",
            value: {
              raw: "135",
              numeric: 135,
              text: null,
            },
            unit: "mg/dL",
            reference_range: "80 - 140",
            status: "Normal",
            flag: null,
          },
        ],
      },
    ],
  };

  console.log("====================================");
  console.log(LabReport);
  console.log("====================================");
  return (
    <>
      <LabReportHeader action={true} />
      <section>
        <div className="w-[60%]">
          <TestResultes tests={LabReport.tests} />
        </div>
      </section>
    </>
  );
};

export default LabReport;
