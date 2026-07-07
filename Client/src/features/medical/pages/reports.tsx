import {
  // getMedicalReportById,
  getMedicalReportsByType,
  getMedicalReportsByPatient,
} from "@/api/appointment";
// import { getDoctor, getDoctorByDocID } from "@/api/hospital";
import { DateFilter } from "@/components/shared-components/date-filter";
import { Filter } from "@/components/shared-components/filter";
import Searchbar from "@/components/shared-components/searchbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ReportTypes } from "@/constants";
import { detailedMedicalReport } from "@/constants/paths";
import { formateDateAndTime } from "@/lib/utils";
import type { Doctor } from "@/types/hospital";
import { useHospitalStore } from "@/zustand/hospital";
import {
  ArrowRight,
  Bone,
  Calendar1,
  FlaskConical,
  HeartPulse,
  Stethoscope,
  FilterIcon,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Report {
  id: number;
  title: string;
  type: string;
  status: string;
  lab_details: {
    name: string;
    location: string;
    reported: string;
    collected: string;
  };
  created_at: string;
  updated_at: string;
  patient: number;
  appointment: number;
  doctor: Doctor[];
}

const Reports = () => {
  const filters = ReportTypes;
  const { patient } = useHospitalStore();
  const [reports, setReports] = useState<Report[]>([]);
  useEffect(() => {
    const getMedicalReports = async () => {
      const data = await getMedicalReportsByPatient(patient?.id);
      setReports(data);
    };

    getMedicalReports();
  }, []);

  const renderConditions = [
    {
      code: "Cardiology",
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
      code: "Pulmonology",
      icon: Stethoscope,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      code: "Imaging",
      icon: Bone,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
  ];

  // const Reports = [
  //   {
  //     name: "Cardiology Report",
  //     from: "Dr. Meera Nair",
  //     date: "16 Jun 2026",
  //     status: "Normal",
  //     cat: "Cardiology",
  //   },
  //   {
  //     name: "CBC + Lipid Panel",
  //     from: "City Diagnostics Lab",
  //     date: "3 Jun 2026",
  //     status: "Normal",
  //     cat: "Lab",
  //   },
  //   {
  //     name: "Pulmonology Report",
  //     from: "Dr. Priya Sharma",
  //     date: "15 May 2026",
  //     status: "Review",
  //     cat: "Pulmonology",
  //   },
  //   {
  //     name: "ECG Report",
  //     from: "Dr. Meera Nair",
  //     date: "1 May 2026",
  //     status: "Attention",
  //     cat: "Cardiology",
  //   },
  //   {
  //     name: "X-Ray Report",
  //     from: "Dr. Raj Kumar",
  //     date: "20 Apr 2026",
  //     status: "Normal",
  //     cat: "Imaging",
  //   },
  // ];

  // const [reports, setReports] = useState(Reports);
  const [filter, setFilter] = useState("");

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

  const handleFilter = async (filter: string) => {
    const data = await getMedicalReportsByType(filter, patient?.id);
    if (data) {
      setReports(data);
      setFilter(filter);
    }
  };

  const handleDateFilter = (data: string) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  };

  const handleSearchBar = (data: string) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  };

  const navigate = useNavigate();

  const navigateToDetailPage = (type: string, id: number) => {
    // const style = renderConditions.find((condition) =>
    //   condition.code === cat ? condition.text : "",
    // );
    navigate(`${detailedMedicalReport}/${type}-${id}`);
  };

  // const renderDoctor = async (ids: number[]) => {
  //   console.log("====================================");
  //   console.log(ids[0]);
  //   console.log("====================================");
  //   const doctor: Doctor = await getDoctorByDocID(ids[0]);
  //   return `Dr. ${doctor.user.first_name} ${doctor.user.last_name}`;
  // };

  return (
    <section>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">Medical Reports</p>
        </div>
        <div className="flex gap-4 items-center">
          <Searchbar
            handler={handleSearchBar}
            className="md:w-[60%]"
            placeholder="Search reports"
          />
          <Filter
            icon={FilterIcon}
            text="Filter"
            values={filters}
            handler={handleFilter}
          />
          <DateFilter onClick={handleDateFilter} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-8">
        {reports.length ? (
          reports.map((report) => (
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

                  <Icon cat={report.type} />

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
                  <h2 className="font-bold text-gray-700">{report.title}</h2>
                  <p className="font-semibold text-gray-500">
                    {report.lab_details?.name
                      ? `${report.lab_details.name} Lab`
                      : `Dr. ${
                          report.doctor.length > 1
                            ? ` ${report?.doctor[0]?.user.first_name}
                              ${report?.doctor[0]?.user.last_name} & ...`
                            : ` ${report?.doctor[0]?.user.first_name}
                              ${report?.doctor[0]?.user.last_name}`
                        } `}
                  </p>
                </div>
                <Separator className="mt-2" />

                <div className="flex justify-between items-center mt-4">
                  <p className="text-gray-500 text-sm font-semibold">
                    <Calendar1 className="w-4 h-4 inline-block -mt-1" />{" "}
                    {formateDateAndTime(report.created_at)[0]}
                  </p>

                  <Button
                    className="w-8 h-8 rounded-full bg-gray-200 cursor-pointer"
                    onClick={() => navigateToDetailPage(report.type, report.id)}
                  >
                    <ArrowRight className="text-gray-600" />
                  </Button>
                </div>
              </CardContent>

              {/* <CardFooter>
            
          </CardFooter> */}
            </Card>
          ))
        ) : (
          <h1 className="text-center mt-10 w-full text-lg text-gray-400 font-semibold">
            No Reports Found on {filter}
          </h1>
        )}
      </div>
    </section>
  );
};

export default Reports;
