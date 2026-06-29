import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Appointment } from "../interface/interface";
import { Separator } from "@/components/ui/separator";
import Pic from "@/components/Pic";
import {
  Check,
  CheckCircle,
  Clock,
  Eye,
  LucideCalendarFold,
  RefreshCcw,
  User,
  UserCircle,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { appointment_detail } from "@/data/paths";
import { formatDateForBill, getCloudinaryUrl } from "@/lib/utils";

const DateFormater = ({ date }: { date: string }) => {
  const fDate = formatDateForBill(date).split(" ");

  return (
    <div className="text-center">
      <p className="text-3xl font-bold">{fDate[1]}</p>
      <p className="font-semibold">{fDate[2]}</p>
      <p>{fDate[3]}</p>
    </div>
  );
};
const TabCard = ({ appointment }: { appointment: Appointment }) => {
  const navigate = useNavigate();

  return (
    <Card className="px-6 py-10 my-4 relative hover:outline-2 outline-primary">
      <div
        className={`bg-${appointment.status === "PENDING" ? "yellow-500" : appointment.status === "CONFIRMED" ? "green-400" : appointment.status === "COMPLETED" ? "blue-600" : "red-500"} h-full w-2 absolute top-0 left-0`}
      ></div>
      <CardContent className="text-sm text-muted-foreground flex items-center justify-between">
        <section className="flex items-center gap-6">
          <DateFormater date={appointment.date} />

          <Separator
            orientation="vertical"
            className="h-20 my-auto bg-gray-300"
          />

          <div className="flex items-center gap-6">
            <Pic
              img={getCloudinaryUrl(appointment.doctor.user.profile_img)}
              className="w-14 h-14"
            />

            <div>
              <p className="text-xl font-semibold">{appointment.reason}</p>
              <p className="my-1">
                <UserCircle className="icon-text text-primary" /> Dr.
                {appointment.doctor.user.first_name}{" "}
                {appointment.doctor.user.last_name} ·{" "}
                {appointment.doctor.specialization.name} ·{" "}
                {appointment.appointment_type}
              </p>
              <p className="my-1">
                <Clock className="icon-text text-primary" /> {appointment.time}{" "}
                AM – 9:30 AM
              </p>
              <p>
                {["Clinic", "Home Visit"].includes(
                  appointment.appointment_type,
                ) ? (
                  <>
                    <User className="icon-text text-primary" /> In-person
                  </>
                ) : ["Video Call", "Audio Call", "Chat"].includes(
                    appointment.appointment_type,
                  ) ? (
                  `Online consultation - ${appointment.appointment_type}`
                ) : (
                  ""
                )}
                {/* {["Clinic", "Home Visit"].includes(appointment.appointment_type)
                  ? "In-person"
                  : ["Video Call", "Audio Call", "Chat"].includes(
                        appointment.appointment_type,
                      )
                    ? `Online consultation - ${appointment.appointment_type}`
                    : ""} */}
              </p>
              <p></p>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-end">
          <Badge
            className={`${appointment.status === "PENDING" ? "bg-yellow-100 text-yellow-500" : appointment.status === "CONFIRMED" ? "bg-green-100 text-green-600" : appointment.status === "COMPLETED" ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600"} p-3`}
          >
            {appointment.status === "PENDING" ? (
              <span className="w-2 h-2 bg-yellow-500 rounded-full mt-0.5"></span>
            ) : appointment.status === "CONFIRMED" ? (
              <Check />
            ) : appointment.status === "COMPLETED" ? (
              <CheckCircle />
            ) : (
              <X />
            )}{" "}
            {appointment.status}
          </Badge>

          <div className="my-3 text-right">
            <p>₹1,002</p>
            <p> Paid · Razorpay</p>
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-transparent text-gray-600 border border-gray-600 py-4 px-3 hover:bg-gray-100 cursor-pointer"
              onClick={() =>
                navigate(
                  `${appointment_detail}/${appointment.appointment_code}`,
                )
              }
            >
              <Eye /> View
            </Button>

            {appointment.status === "CONFIRMED" ||
            appointment.status === "PENDING" ? (
              <Button className="bg-transparent text-gray-600 border border-gray-600 py-4 px-3 hover:bg-gray-100 cursor-pointer">
                <LucideCalendarFold /> Reschedule
              </Button>
            ) : null}

            {appointment.status === "CONFIRMED" ||
            appointment.status === "PENDING" ? (
              <Button className="bg-red-100 text-red-600 border border-red-600 py-4 px-3 hover:bg-red-200 cursor-pointer">
                <X /> Cancel
              </Button>
            ) : null}

            {appointment.status === "COMPLETED" ? (
              <Button>
                <RefreshCcw /> Rebook
              </Button>
            ) : null}
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

const AppointmentTabs = ({ appointments }: { appointments: Appointment[] }) => {
  const Upcoming = appointments.filter(
    (appointment) =>
      appointment.status === "CONFIRMED" || appointment.status === "PENDING",
  );

  const Completed = appointments.filter(
    (appointment) => appointment.status === "COMPLETED",
  );

  const Cancelled = appointments.filter(
    (appointment) => appointment.status === "CANCELLED",
  );

  return (
    <Tabs defaultValue="All" className="w-full">
      <TabsList className="bg-gray-200 w-[50%]">
        <TabsTrigger value="All">
          All{" "}
          <span className="bg-white/10 px-2 rounded-2xl font-semibold">
            {appointments.length}
          </span>
        </TabsTrigger>
        <TabsTrigger value="Upcoming">
          Upcoming{" "}
          <span className="bg-white/10 px-2 rounded-2xl font-semibold">
            {Upcoming.length}
          </span>
        </TabsTrigger>

        <TabsTrigger value="Completed">
          Completed{" "}
          <span className="bg-white/10 px-2 rounded-2xl font-semibold">
            {Completed.length}
          </span>
        </TabsTrigger>

        <TabsTrigger value="Cancelled">
          Cancelled{" "}
          <span className="bg-white/10 px-2 rounded-2xl font-semibold">
            {Cancelled.length}
          </span>
        </TabsTrigger>
      </TabsList>

      {/*  */}
      <TabsContent value="All">
        <section>
          {appointments.length ? (
            appointments.map((appointment) => (
              <TabCard appointment={appointment} />
            ))
          ) : (
            <div className="min-h-[50vh] flex justify-center items-center">
              <p className="text-lg font-semibold text-gray-500">
                No Appointments added
              </p>
            </div>
          )}{" "}
        </section>
      </TabsContent>

      {/* Upcoming */}
      <TabsContent value="Upcoming">
        <section>
          {Upcoming.length ? (
            Upcoming.map((appointment) => <TabCard appointment={appointment} />)
          ) : (
            <div className="min-h-[50vh] flex justify-center items-center">
              <p className="text-lg font-semibold text-gray-500">
                No Upcoming Appointments
              </p>
            </div>
          )}{" "}
        </section>
      </TabsContent>
      <TabsContent value="Completed">
        <section>
          {Completed.length ? (
            Completed.map((appointment) => (
              <TabCard appointment={appointment} />
            ))
          ) : (
            <div className="min-h-[50vh] flex justify-center items-center">
              <p className="text-lg font-semibold text-gray-500">
                No Appointments in completed list
              </p>
            </div>
          )}
        </section>
      </TabsContent>
      <TabsContent value="Cancelled">
        <section>
          {Cancelled.length ? (
            Cancelled.map((appointment) => (
              <TabCard appointment={appointment} />
            ))
          ) : (
            <div className="min-h-[50vh] flex justify-center items-center">
              <p className="text-lg font-semibold text-gray-500">
                No Appointments where cancelled
              </p>
            </div>
          )}
        </section>
      </TabsContent>
    </Tabs>
  );
};

export default AppointmentTabs;
