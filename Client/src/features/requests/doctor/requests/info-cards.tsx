import { Card, CardContent } from "@/components/ui/card";
import type { Doctor } from "@/types/hospital";
import { CalendarCheck2, CheckCircle2, Clock, X } from "lucide-react";
// import type { doctor } from "../interface/interface";

const InfoCards = ({ doctors }: { doctors: Doctor[] }) => {
  const RenderData = [
    {
      title: "Total doctors",
      data: doctors.length,
      icon: CalendarCheck2,
      color: "green",
    },

    {
      title: "Pending",
      data: doctors.filter(
        (doctor) =>
          doctor.verification_status === "Pending" && doctor.user.is_verified,
      ).length,
      icon: CheckCircle2,
      color: "blue",
    },
    {
      title: "Verified",
      data: doctors.filter(
        (doctor) =>
          doctor.verification_status === "Verified" && doctor.user.is_verified,
      ).length,
      icon: Clock,
      color: "yellow",
    },
    {
      title: "Rejected",
      data: doctors.filter(
        (doctor) =>
          doctor.verification_status === "Rejected" && doctor.user.is_verified,
      ).length,
      icon: X,
      color: "red",
    },
  ];
  return (
    <section className="flex justify-between">
      {RenderData.map((card) => (
        <Card className="w-[24%] px-4 py-6">
          <CardContent className="flex gap-6 items-center">
            <div
              className={`w-12 h-12 bg-${card.color}-100 text-${card.color}-600 flex justify-center items-center rounded-md`}
            >
              <card.icon />
            </div>

            <div>
              <p className="text-2xl font-extrabold">{card.data}</p>
              <p className="text-gray-600 font-semibold">{card.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default InfoCards;
