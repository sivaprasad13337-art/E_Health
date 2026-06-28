import Pic from "@/components/Pic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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

const AppointmentReport = () => {
  const Vitals = [
    {
      vital: "Blood pressure",
      value: "138/88 mmHg",
      status: "Elevated",
      bg: "blue-100",
      text: "blue-600",
      icon: ActivitySquare,
    },
    {
      vital: "Heart rate",
      value: "88 bpm",
      status: "Normal",
      bg: "red-100",
      text: "red-600",
      icon: HeartPulse,
    },
    {
      vital: "Temperature",
      value: "98.4 °F",
      status: "Normal",
      bg: "yellow-100",
      text: "yellow-500",
      icon: Thermometer,
    },
    {
      vital: "SpO₂",
      value: "98%",
      status: "Normal",
      bg: "sky-100",
      text: "sky-600",
      icon: Stethoscope,
    },
    {
      vital: "Weight",
      value: "68 kg",
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
              Cardiology Report Visit on Mon, 16 Jun 2026 · Apollo Hospital,
              Chennai
            </p>
          </div>

          <div>
            <p>#APT-20260616-042</p>
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
                <p className="font-bold">Dr. Meera Nair</p>
                <p className="my-1 font-semibold text-gray-600">
                  Cardiologist · MBBS, MD, DM (Cardiology)
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
              <div className="p-4 bg-gray-200 rounded-md">
                <p className="text-gray-700">Primary diagnosis</p>
                <p className="font-semibold">
                  Essential Hypertension (Stage 1) — I10
                </p>
              </div>

              <div className="p-4 bg-gray-200 rounded-md my-2">
                <p className="text-gray-700">Secondary finding</p>
                <p className="font-semibold">
                  Mild tachycardia — under observation
                </p>
              </div>

              <p className="font-semibold text-gray-500">
                Patient presented with elevated BP readings over the past 3
                months. ECG shows normal sinus rhythm. Echo findings within
                normal limits. Continue current medication and lifestyle
                modifications advised.
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
                Patient is responding well to Amlodipine 5mg. Advised to reduce
                sodium intake, maintain regular exercise routine, and monitor BP
                at home twice daily. Stress management techniques recommended.
                Return for follow-up in 4 weeks.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Right Half */}
        <section className="w-[50%]">
          <Card className="p-4">
            <CardTitle className="text-sm font-semibold px-5">
              <Activity className="inline-block w-4 h-4 -my-1 text-primary" />{" "}
              Doctor's notes
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
              {Array(3)
                .fill(0)
                .map((item) => (
                  <div
                    className="flex justify-between items-center bg-gray-200 p-2 rounded-md my-3"
                    key={item}
                  >
                    <div className="flex gap-4 items-center">
                      <div className="flex justify-center items-center bg-red-100 w-10 h-10 rounded-md">
                        <Pill className="w-6 h-6 text-red-600" />
                      </div>

                      <div>
                        <p className="font-bold text-gray-700">
                          Amlodipine 5mg
                        </p>
                        <p className="text-[.9rem] text-gray-700 font-semibold">
                          1 tablet · Once daily · After breakfast
                        </p>
                      </div>
                    </div>

                    <Badge className="px-5 py-3 bg-teal-200 text-teal-600">
                      30 days
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
