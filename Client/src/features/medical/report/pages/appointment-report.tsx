import Pic from "@/components/Pic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { formatDateForBill } from "@/lib/utils";
import type { AppointmentMedicalReport } from "@/types/reports";
import {
  Activity,
  ActivitySquare,
  CalendarPlus,
  ClipboardList,
  HeartPulse,
  NotepadText,
  Pill,
  Stethoscope,
  Thermometer,
  UserCircle,
  Weight,
} from "lucide-react";

const AppointmentReport = ({
  report,
}: {
  report: AppointmentMedicalReport;
}) => {
  console.log(report);

  const Vitals = [
    {
      vital: "Blood pressure",
      value: `${report.vitals.blood_pressure} mmHg`,
      status: "Elevated",
      bg: "blue-100",
      text: "blue-600",
      icon: ActivitySquare,
    },
    {
      vital: "Heart rate",
      value: `${report.vitals.heart_rate} bpm`,
      status: "Normal",
      bg: "red-100",
      text: "red-600",
      icon: HeartPulse,
    },
    {
      vital: "Temperature",
      value: `${report.vitals.temperature} °F`,
      status: "Normal",
      bg: "yellow-100",
      text: "yellow-500",
      icon: Thermometer,
    },
    {
      vital: "SpO₂",
      value: `${report.vitals.spo2}%`,
      status: "Normal",
      bg: "sky-100",
      text: "sky-600",
      icon: Stethoscope,
    },
    {
      vital: "Weight",
      value: `${report.vitals.weight} kg`,
      status: "Normal",
      bg: "orange-100",
      text: "orange-600",
      icon: Weight,
    },
  ];
  return (
    <section>
      {" "}
      <Card
        className="relative"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 151, 138, 1), rgba(0, 151, 138, .6))",
        }}
      >
        <CardContent className="flex text-gray-200 justify-between text-[1rem] font-bold items-center">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-md bg-teal-400 text-white flex justify-center items-center">
              <Stethoscope />
            </div>
            <p>
              {report.title} Report Visit on{" "}
              {formatDateForBill(report.appointment.date)} ·{" "}
              {report.appointment.appointment_type}
            </p>
          </div>

          <div>
            <p>#{report.appointment.appointment_code}</p>
            <p className="text-gray-300 text-end">Generated</p>
          </div>
        </CardContent>
      </Card>
      {/* Report */}
      <div className="mt-8 flex justify-between">
        {/* Left half */}
        <section className="w-[40%]">
          <Card className="p-4 py-8">
            <CardTitle className="text-sm font-semibold px-5">
              <UserCircle className="inline-block w-4 h-4 -my-1 text-primary" />{" "}
              Consulting doctor
            </CardTitle>
            <CardContent className="flex gap-4 items-center">
              <Pic className="w-14 h-14" img="" />

              <div>
                <p className="font-bold">
                  Dr. {report.doctor[0].user.first_name}{" "}
                  {report.doctor[0].user.last_name}
                </p>
                <p className="my-1 font-semibold text-gray-600">
                  {report.doctor[0].specialization.name} ·{" "}
                  {report.doctor[0].education} (
                  {report.doctor[0].department.name})
                </p>
                <p className="text-gray-500">
                  Apollo Hospital, Chennai · Reg: MCI-48291
                </p>
              </div>
            </CardContent>
          </Card>

          {/*  */}
          <Card className="p-4 my-6">
            <CardTitle className="text-sm font-semibold px-5">
              <ClipboardList className="inline-block w-4 h-4 -my-1 text-primary" />{" "}
              Diagnosis & findings
            </CardTitle>
            <CardContent className="">
              {/* {report} */}
              <div className="p-4 bg-gray-200 rounded-md">
                <p className="text-gray-700">Primary diagnosis</p>
                <p className="font-semibold">
                  {report.diagnosis_and_findings.primary_diagnosis}
                </p>
              </div>

              <div className="p-4 bg-gray-200 rounded-md my-2">
                <p className="text-gray-700">Secondary finding</p>
                <p className="font-semibold">
                  {report.diagnosis_and_findings.secondary_findings}
                </p>
              </div>

              <p className="font-semibold text-gray-500">
                {report.diagnosis_and_findings.notes}
              </p>
            </CardContent>
          </Card>

          <Card className="p-4 my-6">
            <CardTitle className="text-sm font-semibold px-5">
              <NotepadText className="inline-block w-4 h-4 -my-1 text-primary" />{" "}
              Doctor's notes
            </CardTitle>
            <CardContent className="bg-gray-200 p-4 rounded-md border-l-4 border-primary">
              <p className="font-semibold text-gray-500">
               {report.notes}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Right Half */}
        <section className="w-[50%]">
          <Card className="p-4">
            <CardTitle className="text-sm font-semibold px-5">
              <Activity className="inline-block w-4 h-4 -my-1 text-primary" />{" "}
              Vitals
            </CardTitle>
            <CardContent className="">
              {Vitals.map((item) => (
                <div
                  className="flex justify-between items-center bg-gray-200 p-2 rounded-md my-3"
                  key={item.vital}
                >
                  <div className="flex gap-4 items-center">
                    <div
                      className={`flex justify-center items-center bg-${item.bg} w-10 h-10 rounded-md`}
                    >
                      <item.icon className={`w-6 h-6 text-${item.text}`} />
                    </div>

                    <p className="font-semibold text-gray-700">{item.vital}</p>
                  </div>

                  <div className="flex gap-4">
                    <p className="font-bold">{item.value}</p>
                    <Badge
                      className={`px-5 py-3 bg-${item.status === "Elevated" ? "red-100" : item.status === "Normal" ? "green-100" : "yellow-100"} text-${item.status === "Elevated" ? "red-600" : item.status === "Normal" ? "green-600" : "yellow-500"}`}
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="p-4 my-6">
            <CardTitle className="text-sm font-semibold px-5">
              <Pill className="inline-block w-4 h-4 -my-1 text-primary" />{" "}
              Prescription
            </CardTitle>
            <CardContent className="">
              {report.prescription.medicines.map((item) => (
                  <div
                    className="flex justify-between items-center bg-gray-200 p-2 rounded-md my-3"
                    key={item.medicine}
                  >
                    <div className="flex gap-4 items-center">
                      <div className="flex justify-center items-center bg-red-100 w-10 h-10 rounded-md">
                        <Pill className="w-6 h-6 text-red-600" />
                      </div>

                      <div>
                        <p className="font-bold text-gray-700">
                          {item.medicine} {item.dosage}mg
                        </p>
                        <p className="text-[.9rem] text-gray-700 font-semibold">
                          1 tablet · {item.frequency} · {item.time}
                        </p>
                      </div>
                    </div>

                    <Badge className="px-5 py-3 bg-teal-200 text-teal-600">
                      {item.duration} days
                    </Badge>
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card className="bg-teal-100 p-6">
            <CardContent className="flex gap-4">
              <div className="flex justify-center items-center bg-teal-600 w-10 h-10 rounded-md">
                <CalendarPlus className="w-6 h-6 text-white" />
              </div>

              <div className="text-teal-600">
                <p className="font-bold">Follow-up scheduled</p>
                <p className="font-semibold">
                  Mon, 14 Jul 2026 · 10:30 AM · Dr. Meera Nair
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </section>
  );
};

export default AppointmentReport;
