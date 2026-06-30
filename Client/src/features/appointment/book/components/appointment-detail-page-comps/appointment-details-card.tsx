import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Appointment } from "@/features/appointment/interface/interface";
import { formatDateForBill, formateDateAndTime } from "@/lib/utils";
import {
  AlertTriangle,
  BookText,
  Calendar1,
  CalendarPlus,
  ClipboardClockIcon,
  Clock,
  Hash,
  Info,
  LayoutGrid,
  MapPin,
  MessageSquareText,
  Stethoscope,
} from "lucide-react";

const AppointmentDetailsCard = ({
  appointment,
}: {
  appointment: Appointment;
}) => {
  return (
    <Card className="p-4">
      <CardTitle className="px-4">
        <Info className="w-4.5 h-4.5 -mt-0.5 inline-block text-primary mr-1" />
        Appointment Details
      </CardTitle>

      <CardContent>
        <div className="mt-5 flex justify-between">
          <p className="font-semibold">
            <Calendar1 className="icon-text text-primary" /> Date{" "}
          </p>
          <p className="text-gray-700 font-bold w-[65%]">
            {formatDateForBill(appointment.date)}
          </p>
        </div>
        <Separator className="bg-gray-300 my-2" />

        <div className="mt-5 flex justify-between">
          <p className="font-semibold">
            <Clock className="icon-text text-primary" /> Time{" "}
          </p>
          <p className="text-gray-700 font-bold w-[65%]">
            {appointment.time} AM – 11:15 AM (45 min)
          </p>
        </div>
        <Separator className="bg-gray-300 my-2" />

        <div className="mt-5 flex justify-between">
          <p className="font-semibold">
            <MapPin className="icon-text text-primary" /> Location{" "}
          </p>
          <p className="text-gray-700 font-bold w-[65%]">
            Apollo Hospital, Greams Rd, Chennai — 600006
          </p>
        </div>
        <Separator className="bg-gray-300 my-2" />

        <div className="mt-5 flex justify-between">
          <p className="font-semibold">
            <Stethoscope className="icon-text text-primary" /> Department{" "}
          </p>
          <p className="text-gray-700 font-bold w-[65%]">
            {appointment.doctor.department.name}
          </p>
        </div>
        <Separator className="bg-gray-300 my-2" />

        <div className="mt-5 flex justify-between items-center">
          <p className="font-semibold">
            <LayoutGrid className="icon-text text-primary" /> Visit type{" "}
          </p>
          <p className="text-gray-700 font-bold w-[65%]">
            <Badge className="px-5 py-3 bg-sky-100 text-sky-600 text-[.9rem]">
              {["Clinic", "Home Visit"].includes(appointment.appointment_type)
                ? `In-person - ${appointment.appointment_type}`
                : ["Video Call", "Audio Call", "Chat"].includes(
                      appointment.appointment_type,
                    )
                  ? `Online consultation - ${appointment.appointment_type}`
                  : ""}{" "}
            </Badge>
          </p>
        </div>
        <Separator className="bg-gray-300 my-2" />

        <div className="mt-5 flex justify-between">
          <p className="font-semibold">
            <BookText className="icon-text text-primary" /> Reason{" "}
          </p>
          <p className="text-gray-700 font-bold w-[65%]">
            {appointment.reason}
          </p>
        </div>
        <Separator className="bg-gray-300 my-2" />

        <div className="mt-5 flex justify-between">
          <p className="font-semibold">
            <MessageSquareText className="icon-text text-primary" /> Patient
            notes{" "}
          </p>
          <p className="text-gray-600 font-semibold w-[65%]">
            Experiencing occasional dizziness in the morning. BP reading at home
            was 142/90 last week.
          </p>
        </div>
        <Separator className="bg-gray-300 my-2" />

        <div className="mt-5 flex justify-between">
          <p className="font-semibold">
            <Hash className="icon-text text-primary" /> Booking ID{" "}
          </p>
          <p className="text-primary font-semibold w-[65%]">
            #{appointment.appointment_code}
          </p>
        </div>
        <Separator className="bg-gray-300 my-2" />

        <div className="mt-5 flex justify-between">
          <p className="font-semibold">
            <CalendarPlus className="icon-text text-primary" /> Booked on{" "}
          </p>
          <p className="text-gray-700 font-bold w-[65%]">
            {formateDateAndTime(appointment.created_at).map((item) => (
              <>{item} </>
            ))}
          </p>
        </div>
        <Separator className="bg-gray-300 my-2" />

        <div className="mt-5 flex justify-between items-center">
          <p className="font-semibold">
            <ClipboardClockIcon className="icon-text text-primary" /> Report
            status{" "}
          </p>
          <p className="text-gray-700 font-bold w-[65%]">
            <Badge className="px-5 py-3 bg-sky-100 text-sky-600 text-[.9rem]">
              <AlertTriangle /> Pending
            </Badge>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentDetailsCard;
