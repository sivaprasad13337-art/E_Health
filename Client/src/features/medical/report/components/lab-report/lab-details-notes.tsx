import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { LabReport } from "@/types/reports";
import { Building, FileText } from "lucide-react";
// import type { data } from "react-router-dom";

const LabDetailsAndNotes = ({ report }: { report: LabReport }) => {
  const labDetails = [
    { name: "Lab name", data: report.lab_details.name },
    { name: "Location", data: report.lab_details.location },
    { name: "Sample type", data: report.lab_details.name },
    { name: "Collected", data: report.lab_details.collected },
    { name: "Reported", data: report.lab_details.reported },
  ];

  console.log(Object.entries(report.lab_details));

  return (
    <div>
      <Card className="p-4">
        <CardTitle>
          <Building className="icon-text text-primary" /> Lab info
        </CardTitle>

        <CardContent>
          {labDetails.map((item) => (
            <>
              <div className="flex justify-between my-2">
                <p className="text-gray-600 font-semibold">{item.name}</p>
                <p className="text-gray-600 font-bold">{item.data}</p>
              </div>
              <Separator />
            </>
          ))}
        </CardContent>
      </Card>

      <Card className="p-4 my-6">
        <CardTitle>
          <FileText className="icon-text text-primary" /> Lab notes
        </CardTitle>

        <CardContent className="bg-gray-200 rounded-md p-4 border-l-primary border-3">
          <p className="text-gray-600 font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            ratione repellendus reiciendis ea explicabo unde culpa ut itaque
            autem libero! Vero non facere, amet vitae nemo hic doloremque rerum
            beatae!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LabDetailsAndNotes;
