import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck2, CheckCircle2, Clock, X } from "lucide-react";
import type { Appointment } from "../interface/interface";

const InfoCards = ({ appointments }: { appointments: Appointment[] }) => {
  const RenderData = [
    {
      title: "Total appointments",
      data: appointments.length,
      icon: CalendarCheck2,
      color: "green",
    },

    {
      title: "Completed",
      data: appointments.filter(
        (appointment) => appointment.status === "COMPLETED",
      ).length,
      icon: CheckCircle2,
      color: "blue",
    },
    {
      title: "Upcoming",
      data: appointments.filter(
        (appointment) =>
          appointment.status === "CONFIRMED" ||
          appointment.status === "CONFIRMED",
      ).length,
      icon: Clock,
      color: "yellow",
    },
    {
      title: "Completed",
      data: appointments.filter(
        (appointment) => appointment.status === "CANCELLED",
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
