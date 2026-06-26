import { Badge } from "@/components/ui/badge";
import { AppointmentTypes } from "@/data/appointment";
import { formatDateForBill } from "@/lib/utils";
// import { Separator } from "@/components/ui/separator";
import { useOrderStore } from "@/zustand/appointment";
import {
  CalendarCheck,
  Check,
  Clock,
  ReceiptText,
  Stethoscope,
  User,
  Verified,
  // VideoIcon,
} from "lucide-react";

const Confirmation = () => {
  const { Order } = useOrderStore();
  console.log("====================================");
  console.log(Order);
  console.log("====================================");

  const setModeIcons = (mode: string) =>
    AppointmentTypes.find((item) => item.title === mode)?.icon;

  const billData = [
    {
      particular: "Doctor",
      data: `Dr. ${Order?.appointment.doctor.user.first_name} ${Order?.appointment.doctor.user.last_name}`,
      icon: User,
    },
    {
      particular: "Specialty",
      data: Order?.appointment.doctor.specialization.name,
      icon: Stethoscope,
    },
    {
      particular: "Date",
      data: formatDateForBill(Order?.appointment.date), //2026-06-15
      icon: CalendarCheck,
    },
    {
      particular: "Time",
      data: Order?.appointment.time, //10:00:00
      icon: Clock,
    },
    {
      particular: "Mode",
      data: `${Order?.appointment.appointment_type}`,
      icon: setModeIcons(Order?.appointment.appointment_type),
    },
    {
      particular: "Booking ID",
      data: `#${Order?.appointment.appointment_code}`,
      icon: ReceiptText,
    },
  ];

  return (
    <section className="bg-gray-200 h-[35rem] p-4">
      <div className="mx-auto bg-teal-100 w-[4rem] h-[4rem] flex justify-center items-center rounded-full">
        <Verified className="w-[2rem] h-[2rem] text-primary" />
      </div>

      <div className="text-center">
        <h2 className="text-xl font-semibold">Appointment confirmed!</h2>
        <p className="text-sm text-gray-600 font-semibold">
          Payment successful. A confirmation has been sent to your email.
        </p>
      </div>

      <section className="mt-2">
        <Badge className="mx-auto flex items-center my-4 bg-teal-100 text-primary px-4 py-3">
          <p className="font-semibold">
            <Check className="w-[.9rem] h-[.9rem] inline-block" /> Paid ·{" "}
            {"\u20B9"}
            {Order?.amount_paid}
          </p>
        </Badge>

        <div className="bg-gray-300 rounded-3xl p-4">
          {/*  */}

          {billData.map((item, idx) => (
            <div className="flex justify-between my-1" key={idx}>
              <p className="flex gap-1">
                <item.icon className="w-[.9rem] h[.9rem]" />
                {item.particular}
              </p>
              <p
                className={
                  item.particular === "Booking ID"
                    ? "text-primary"
                    : "font-semibold"
                }
              >
                {item.data}
              </p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Confirmation;
