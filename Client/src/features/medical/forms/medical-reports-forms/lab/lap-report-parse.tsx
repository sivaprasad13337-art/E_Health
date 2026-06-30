import { parseLabReport } from "@/api/ai";
import { Button } from "@/components/ui/button";
import type { LabReportFromProps } from "@/features/medical/interface";
import { useEffect, useState } from "react";

const ParseLabReport = ({ setFormData }: LabReportFromProps) => {
  const [file, setFile] = useState("");
  const handelParse = async () => {
    const data = await parseLabReport(file);
    setFormData(data);
  };

  useEffect(() => {
    console.log("====================================");
    console.log(file);
    console.log("====================================");
  }, [file]);
  return (
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
      <Button className="py-5 px-6 rounded-s-md" onClick={handelParse}>Parse</Button>
    </div>
  );
};

export default ParseLabReport;
