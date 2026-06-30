import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { writeMedicalReport } from "@/data/paths";
import {
  AlertTriangle,
  Clock,
  FileClock,
  // FilePenLineIcon,
  FilePlus,
  FlaskConical,
  NotebookText,
  Stethoscope,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ReportCards = () => {
  const navigate = useNavigate();
  return (
    <Card className="my-4 hover:outline-2 hover:outline-primary/70 relative px-2 py-6 cursor-pointer">
      <div className="absolute top-0 left-0 bg-sky-400 h-full w-1.5"></div>
      <CardContent className="flex justify-between">
        <section className="flex gap-6 items-center">
          <div className="w-14 h-14 flex justify-center items-center rounded-md bg-blue-100 text-blue-600">
            <FlaskConical />
          </div>

          <div>
            <p className="text-lg font-semibold">CBC + Lipid Panel</p>
            <p className="text-gray-600 font-semibold">
              Uploaded by City Diagnostics Lab · 3 Jun 2026 · Fasting blood
              sample · Auto-parsed ✓
            </p>

            <Badge className="p-3 mt-3 bg-yellow-100 text-yellow-700">
              <AlertTriangle className="icon-text mt-0.5" /> 2 values flagged —
              LDL High · Total Cholesterol Borderline
            </Badge>
          </div>
        </section>

        <section className="flex flex-col items-end gap-2">
          <Badge className="p-4 text-blue-600 bg-blue-100">Needs review</Badge>
          <Button
            className="flex text-blue-600 bg-blue-100 py-6 px-5 hover:bg-blue-200 cursor-pointer"
            onClick={() => navigate(`${writeMedicalReport}/rpt-16257`)}
          >
            <NotebookText /> View & add notes
          </Button>
        </section>
      </CardContent>
    </Card>
  );
};

const AppoitmentReportsAndDocuments = () => {
  return (
    <Card className="px-4 py-6">
      <CardTitle className="px-4">
        <FileClock className="icon-text text-primary" /> Reports & documents
      </CardTitle>

      <CardContent>
        <p className="bg-blue-50 text-blue-600 py-2 px-4 rounded-md font-semibold text-[.9rem]">
          <FlaskConical className="icon-text" /> Access point 1 — Lab tests &
          imaging (uploaded by lab or patient, auto-parsed)
        </p>

        <ReportCards />
        <ReportCards />

        <Separator className="bg-gray-400 my-4" />

        <p className="bg-teal-50 text-primary py-2 px-4 rounded-md font-semibold text-[.9rem]">
          <Stethoscope className="icon-text" /> Access point 2 — Appointment
          consultation report (written by doctor after visit)
        </p>

        <ReportCards />

        <Separator className="bg-gray-400 my-4" />

        <Card
          className="shadow-none text-white px-4 py-10"
          style={{
            background: "linear-gradient(90deg, #106d62 2%, #21c493 90%)",
          }}
        >
          <CardContent className="flex">
            <section className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex justify-center items-center">
                <FilePlus className="w-9 h-9 font-bold" />
              </div>

              <div className="w-[75%]">
                <p className="text-2xl font-bold mb-2">
                  {/* {" "}<FilePenLineIcon className="inline-block -mt-0.5"/> */}
                  📝 Write the appointment report
                </p>
                <p className="text-gray-200 font-semibold">
                  Record your findings from this visit — diagnosis, vitals,
                  prescription, health updates, and doctor notes. The patient
                  sees it immediately after you submit. You can edit within 24
                  hours of submission.
                </p>
              </div>
            </section>

            <section className="w-[30%]">
              <Link
                to={`${writeMedicalReport}/rpt-16257`}
                className="flex text-gray-700 bg-white py-3.5 justify-center rounded-md hover:bg-gray-100 cursor-pointer w-full"
              >
                <FilePlus className="icon-text mt-0.5 mr-1" /> Start writing
                report
              </Link>
              <Button className="flex text-white bg-white/10 border border-white/30 py-6 px-5 hover:bg-white/20 cursor-pointer w-full mt-2">
                <Clock /> Save as draft later
              </Button>
            </section>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default AppoitmentReportsAndDocuments;
