import Pic from "@/components/Pic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { appointment, appointment_detail } from "@/data/paths";
import { ArrowRight, CalendarCheck2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AppoitmentsOverviewsCard = () => {
  const navigate = useNavigate();
  const appointments = [{ time: "9:00" }];
  return (
    <Card>
      <CardTitle className="flex justify-between items-center px-4">
        <p className="font-semibold">
          <CalendarCheck2 className="icon-text text-primary" /> Today's
          appointments
        </p>

        <Link to={appointment} className="text-primary">
          View all <ArrowRight className="icon-text" />
        </Link>
      </CardTitle>

      <CardContent>
        {Array(6)
          .fill(0)
          .map((_, idx) => (
            <Card
              className="bg-gray-100 shadow-none px-4 py-6 cursor-pointer my-4 hover:outline-2 outline-primary"
              onClick={() => navigate(`${appointment_detail}/1728`)}
              key={idx}
            >
              <CardContent className="flex justify-between items-center">
                <div>
                  <p className="font-bold">
                    9:00 <span className="text-gray-600 font-semibold text-xs">AM</span>
                  </p>
                </div>

                <section className="flex gap-4 items-center">
                  <Pic img="" className="w-12 h-12" />

                  <div>
                    <p className="font-bold">Raj Kumar</p>
                    <p className="text-gray-600">
                      28 yrs · Routine checkup · In-person
                    </p>
                  </div>
                </section>

                <Badge className="p-3 bg-primary/80 text-white">
                  Confirmed
                </Badge>
              </CardContent>
            </Card>
          ))}
      </CardContent>
    </Card>
  );
};

export default AppoitmentsOverviewsCard;
