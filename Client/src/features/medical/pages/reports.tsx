import { DateFilter } from "@/components/shared-components/date-filter";
import { Filter } from "@/components/shared-components/filter";
import Searchbar from "@/components/shared-components/searchbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { detailedMedicalReport } from "@/data/paths";
import {
  ArrowRight,
  Bone,
  Calendar1,
  FlaskConical,
  HeartPulse,
  Stethoscope,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const filters = [
    "cardio",
    "blood-report",
    "Pulmonology",
    "ECG",
    "Echo",
    "X-Ray",
  ];

  const renderConditions = [
    {
      code: "Cardiac",
      icon: HeartPulse,
      bg: "bg-red-50",
      text: "text-red-700",
    },
    {
      code: "Lab",
      icon: FlaskConical,
      bg: "bg-sky-100",
      text: "text-sky-600",
    },
    {
      code: "Pulmonol",
      icon: Stethoscope,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      code: "X-ray",
      icon: Bone,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
  ];

  const Reports = [
    {
      name: "Cardiology Report",
      from: "Dr. Meera Nair",
      date: "16 Jun 2026",
      status: "Normal",
      cat: "Cardiac",
    },
    {
      name: "CBC + Lipid Panel",
      from: "City Diagnostics Lab",
      date: "3 Jun 2026",
      status: "Normal",
      cat: "Lab",
    },
    {
      name: "Pulmonology Report",
      from: "Dr. Priya Sharma",
      date: "15 May 2026",
      status: "Review",
      cat: "Pulmonol",
    },
    {
      name: "ECG Report",
      from: "Dr. Meera Nair",
      date: "1 May 2026",
      status: "Attention",
      cat: "Cardiac",
    },
    {
      name: "X-Ray Report",
      from: "Dr. Raj Kumar",
      date: "20 Apr 2026",
      status: "Normal",
      cat: "X-ray",
    },
  ];

  const Icon = ({ cat }: { cat: string }) => {
    const style = renderConditions.find((condition) => condition.code === cat);

    return style ? (
      <div
        className={`${style.bg} w-10 h-10 rounded-md flex justify-center items-center`}
      >
        <style.icon className={style?.text} />
      </div>
    ) : (
      ""
    );
  };
  const handler = (data: string) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  };

  const handleDateFilter = (data: string) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  };

  const navigate = useNavigate();

  const navigateToDetailPage = (cat: string) => {
    const style = renderConditions.find((condition) =>
      condition.code === cat ? condition.text : "",
    );
    navigate(detailedMedicalReport);
  };

  return (
    <section>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">Medical Reports</p>
        </div>
        <div className="flex gap-4 items-center">
          <Searchbar className="md:w-[60%]" placeholder="Search reports" />
          <Filter values={filters} handler={handler} />
          <DateFilter onClick={handleDateFilter} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-between">
        {Reports.map((report) => (
          <Card className="w-[22%] mt-4">
            <CardContent>
              <div className="flex justify-between">
                {/* <div className="bg-green-100 w-10 h-10 rounded-md flex justify-center items-center">
                  
                  <TestTube
                    className={
                      renderConditions.find(
                        (condition) => condition.code === report.cat,
                      )?.text
                    }
                  />
                </div> */}

                <Icon cat={report.cat} />

                <Badge
                  className={
                    report.status === "Normal"
                      ? "bg-green-100 py-3 px-4 text-green-600"
                      : report.status === "Review"
                        ? "bg-yellow-100 py-3 px-4 text-yellow-600"
                        : "bg-red-100 py-3 px-4 text-red-600"
                  }
                >
                  {report.status}
                </Badge>
              </div>

              <div className="my-4">
                <h2 className="font-bold text-gray-700">{report.name}</h2>
                <p className="font-semibold text-gray-500">{report.from}</p>
              </div>
              <Separator className="mt-2" />

              <div className="flex justify-between items-center mt-4">
                <p className="text-gray-500 text-sm font-semibold">
                  <Calendar1 className="w-4 h-4 inline-block -mt-1" />{" "}
                  {report.date}
                </p>

                <Button
                  className="w-8 h-8 rounded-full bg-gray-200"
                  onClick={() => navigateToDetailPage(report.cat)}
                >
                  <ArrowRight className="text-gray-600" />
                </Button>
              </div>
            </CardContent>

            {/* <CardFooter>
            
          </CardFooter> */}
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Reports;
