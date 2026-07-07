// import { getAppointmentsByDoctor } from "@/api/appointment";
import Pic from "@/components/Pic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { appointment, appointment_detail } from "@/constants/paths";
import type { Appointment } from "@/features/appointment/interface/interface";
// import { useHospitalStore } from "@/zustand/hospital";
import { ArrowRight, CalendarCheck2 } from "lucide-react";
// import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AppoitmentsOverviewsCard = ({
  appointments,
}: {
  appointments: Appointment[];
}) => {
  const navigate = useNavigate();

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
        <ScrollArea className="h-160">
          {appointments.map((appointment, idx) => (
            <Card
              className="bg-gray-100 shadow-none px-4 py-6 cursor-pointer my-4 hover:outline-2 outline-primary"
              onClick={() =>
                navigate(
                  `${appointment_detail}/${appointment.appointment_code}`,
                )
              }
              key={idx}
            >
              <CardContent className="flex justify-between items-center">
                <section className="flex gap-6 items-center">
                  <div>
                    <p className="font-bold">
                      {appointment.time.split(":")[0]}:
                      {appointment.time.split(":")[1]}{" "}
                      <span className="text-gray-600 font-semibold text-xs">
                        AM
                      </span>
                    </p>
                  </div>

                  <section className="flex gap-4 items-center">
                    <Pic img="" className="w-12 h-12" />

                    <div>
                      <p className="font-bold">Raj Kumar</p>
                      <p className="text-gray-600">
                        {appointment.patient.age} yrs · {appointment.reason} ·{" "}
                        {appointment.appointment_type}
                      </p>
                    </div>
                  </section>
                </section>

                <Badge className="p-3 bg-primary/80 text-white">
                  {appointment.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AppoitmentsOverviewsCard;
