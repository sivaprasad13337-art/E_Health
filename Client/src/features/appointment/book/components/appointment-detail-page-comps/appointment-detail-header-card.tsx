import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { writeMedicalReport } from "@/data/paths";
import type { Appointment } from "@/features/appointment/interface/interface";
import { formatDateForBill } from "@/lib/utils";
import {
  AlertTriangle,
  Building2,
  CalendarCheck2,
  Check,
  Clock,
  FilePlus,
  LucideCalendar1,
  MessageSquareText,
  User,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const AppointmentDetailHeaderCard = ({
  appointment,
}: {
  appointment: Appointment;
}) => {
  return (
    <Card
      style={{
        background: "linear-gradient(90deg, #106d62 2%, #21c493 90%)",
      }}
    >
      <CardContent className="flex justify-between p-6">
        <section className="flex gap-6">
          <div className="w-16 h-16 rounded-md flex justify-center items-center bg-white/20 backdrop-blur-md text-white">
            <CalendarCheck2 className="w-8 h-8" />
          </div>

          {/*  */}
          <div>
            <p className="text-gray-300 text-xs mb-1">
              #{appointment.appointment_code}
            </p>
            <h1 className="text-[1.9rem] leading-[1.9rem] font-bold text-white">
              {appointment.doctor.department.name} Consultation
            </h1>
            <div className="text-gray-200 flex gap-6 my-2">
              <p className="font-semibold">
                <LucideCalendar1 className="w-4 h-4 inline-block -mt-1" />{" "}
                {formatDateForBill(appointment.date)}
              </p>
              <p className="font-semibold">
                <Clock className="w-4 h-4 inline-block -mt-1" />{" "}
                {appointment.time} – 11:15 AM
              </p>
            </div>

            <div className="text-gray-200 flex gap-6 my-2">
              <p className="font-semibold">
                <Building2 className="w-4 h-4 inline-block -mt-1" /> Apollo
                Hospital, Chennai
              </p>
              <p className="font-semibold">
                <User className="w-4 h-4 inline-block -mt-1" />{" "}
                {["Clinic", "Home Visit"].includes(appointment.appointment_type)
                  ? "In-person"
                  : ["Video Call", "Audio Call", "Chat"].includes(
                        appointment.appointment_type,
                      )
                    ? `Online consultation - ${appointment.appointment_type}`
                    : ""}{" "}
                · 15 min
              </p>
            </div>

            <div className="mt-4 flex gap-4">
              <Badge className="bg-teal-500 py-3 px-4 font-semibold text-[.8rem]">
                <Check className="w-4 h-4 inline-block" />
                {appointment.status}
              </Badge>

              <Badge className="bg-white/20 border border-white/20 py-3 px-4 font-semibold text-[.8rem]">
                {appointment.doctor.department.name}
              </Badge>

              <Badge className="bg-white/20 border border-white/20 py-3 px-4 font-semibold text-[.8rem]">
                {appointment.reason}
              </Badge>

              <Badge className="bg-yellow-600 border border-white/20 py-3 px-4 font-semibold text-[.8rem]">
                <AlertTriangle className="w-4 h-4 inline-block" /> Report
                pending
              </Badge>
            </div>
          </div>
        </section>

        <section className="w-[20%] flex flex-col gap-3">
          <Link
            to={`${writeMedicalReport}/rpt-16257`}
            className="flex py-2.5 rounded-lg w-full bg-white text-gray-600 justify-start hover:bg-gray-100 cursor-pointer"
          >
            <FilePlus className="icon-text mt-0.5 ml-5 mr-1" /> Write report
          </Link>
          <Button className="flex p-5 w-full bg-white/20 border border-white/50 text-white justify-start hover:bg-teal-500/40 cursor-pointer">
            <MessageSquareText /> Message patient
          </Button>

          <Button className="flex p-5 w-full bg-red-500/40 border border-red-500/50 text-white justify-start hover:bg-red-500 cursor-pointer">
            <X /> Cancel appointment
          </Button>
        </section>
      </CardContent>
    </Card>
  );
};

export default AppointmentDetailHeaderCard;
