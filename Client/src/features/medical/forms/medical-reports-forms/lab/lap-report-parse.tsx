import { parseLabReport } from "@/api/ai";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { LabReportFromProps } from "@/features/medical/interface";
import { TestsTable } from "@/features/medical/report/components/lab-report/tests-table";
import { useEffect, useState } from "react";

const ParseLabReport = ({ setFormData }: LabReportFromProps) => {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [tests, setTests] = useState([]);
  const handelParse = async () => {
    setLoading(true);
    const data = await parseLabReport(file);
    setFormData((prev) => ({
      ...prev,
      tests: data.tests,
      lab_details: data.lab_details,
    }));
    setTests(data.tests);

    if (data) setLoading(false);
  };

  useEffect(() => {
    console.log("====================================");
    console.log(file);
    console.log("====================================");
  }, [file]);
  return (
    <>
      <div className="flex justify-between items-center">
        <input
          type="file"
          name=""
          id=""
          onChange={(e) => {
            const File = e.target.files?.[0];
            setFile(File);
          }}
        />
        <Button
          className="py-5 px-6 rounded-s-md"
          disabled={loading}
          onClick={handelParse}
        >
          {loading ? <Spinner /> : "Parse"}
        </Button>
      </div>

      <section className="min-h-40 w-[98%] mt-6">
        <TestsTable tests={tests} />
      </section>
    </>
  );
};

export default ParseLabReport;
