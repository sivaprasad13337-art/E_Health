import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, BadgeX, FlaskConical } from "lucide-react";
// import { Link } from "react-router-dom";

function LabReportHeader({ action }: { action: boolean }) {
  // "patient_name": "Mr.SIVA PRASAD",
  //   "lab_details": {
  //       "name": "SRINIVASA CLINICAL LAB",
  //       "location": null,
  //       "collected": "25/Jun/2025 02:52PM",
  //       "reported": "25/Jun/2025 06:20PM"
  //   },
  return (
    <Card
    className="px-6 py-10"
      style={{ background: "linear-gradient(90deg, #166a9e 0%, #199193 100%)" }}
    >
      <CardContent className="flex justify-between items-center text-gray-200">
        <section className="flex gap-6 items-center">
          <div className="flex justify-center items-center w-12 h-12 rounded-md bg-white/10 text-white">
            <FlaskConical />
          </div>

          <div>
            <h2 className="text-xl font-bold">CBC + Lipid Panel</h2>
            <p className="text-sm font-semibold text-gray-300 my-2">
              City Diagnostics Lab · Sample collected 3 Jun 2026, 8:00 AM ·
              Fasting
            </p>

            <div className="my-2">
              {action ? (
                <Badge className="bg-yellow-100 backdrop-blur-md border border-white/20 text-yellow-600 shadow-none">
                  <>
                    <AlertTriangle /> 2 values need attention
                  </>
                </Badge>
              ) : (
                <Badge className="bg-red-100 backdrop-blur-md border border-white/20 text-destructive shadow-none">
                  <>
                    <BadgeX className="text-destructive" /> Unverified
                  </>
                </Badge>
              )}

              <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-none mx-2">
                Blood test
              </Badge>

              <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-none mr-2">
                Fasting sample
              </Badge>
            </div>
          </div>
        </section>

        {/* <Button className="bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-none px-6 py-6">
          <Camera /> Change Photo
        </Button> */}

        <section>
          <div>
            <p className="text-gray-400">Report ID</p>
            <p>#RPT-20260603-018</p>
          </div>

          <div>
            <p className="text-gray-400">Reported</p> <p>3 Jun 2026, 4:30 PM</p>
          </div>
        </section>
        {/* <Link
          to={"/settings"}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-none px-6 py-3 rounded-md"
        >
          <SquarePen className="w-4 h-4 inline-block -mt-1" /> Edit
        </Link> */}
      </CardContent>
    </Card>
  );
}

export default LabReportHeader;
