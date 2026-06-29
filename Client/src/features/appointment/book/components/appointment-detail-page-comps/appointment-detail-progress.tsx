import { GetBillByAPt } from "@/api/payment-services";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { Appointment } from "@/features/appointment/interface/interface";
import { formateDateAndTime } from "@/lib/utils";
import type { BillingDetail } from "@/types/payment";
import { Check, CheckCircle, GitPullRequest } from "lucide-react";
import { useEffect, useState } from "react";
// import { data } from "react-router-dom";

const AppointmentDetailProgress = ({
  appointment,
}: {
  appointment: Appointment;
}) => {
  const [bill, setBill] = useState<BillingDetail>();

  useEffect(() => {
    const getBillingDetail = async () => {
      const data = await GetBillByAPt(appointment.id);
      setBill(data);
    };
    getBillingDetail();
  }, []);

  const [steps, setSteps] = [
    {
      step: "Booked",
      date: formateDateAndTime(appointment.created_at)[0],
      time: formateDateAndTime(appointment.created_at)[1],
    },
    {
      step: "Payment done",
      date: formateDateAndTime(bill?.created_at)[0],
      time: formateDateAndTime(bill?.updated_at)[1],
    },
    { step: "Confirmed", date: "25 Jun", time: "9:44 AM" },
    { step: "In Progress", date: "2 Jul", time: "10:30 AM" },
    { step: "Report written", date: "2 Jul", time: "4:30 PM" },
    { step: "Completed", date: "2 Jul", time: "4:30 PM" },
  ];

  const [active, setAtive] = useState("In Progress");
  const [Completed, setCompleted] = useState(
    steps.findIndex((item) => item.step === active),
  );
  return (
    <Card className="p-6">
      <CardTitle className="font-semibold p-4">
        <GitPullRequest className="w-4 h-4 inline-block -mt-1 text-primary" />{" "}
        Appointment progress
      </CardTitle>

      <CardContent className="flex justify-center gap-2">
        {steps.map((step, idx) => (
          <section>
            <div className="flex gap-2 items-center mb-2">
              <div
                className={
                  active === step.step
                    ? "bg-teal-500 text-white w-16 h-16 rounded-full flex justify-center items-center outline-8 outline-teal-200"
                    : idx > Completed
                      ? "bg-gray-300 text-white w-16 h-16 rounded-full flex justify-center items-center"
                      : "bg-teal-500 text-white w-16 h-16 rounded-full flex justify-center items-center"
                }
              >
                {" "}
                {idx === 5 ? (
                  <CheckCircle className="w-7 h-7" />
                ) : idx < Completed ? (
                  <Check className="w-7 h-7" />
                ) : (
                  <p className="text-lg font-semibold">{idx + 1}</p>
                )}
              </div>
              {idx < 5 && <div className="h-0.5 w-32 bg-teal-500"></div>}
            </div>

            <div className="indent-1.5">
              <p className="font-semibold">{step.step}</p>
              <div>
                <p className="text-xs font-semibold text-gray-500">
                  {step.date} ·
                </p>{" "}
                <p className="text-xs font-semibold text-gray-500">
                  {step.time}
                </p>
              </div>
            </div>
          </section>
        ))}
      </CardContent>
    </Card>
  );
};

export default AppointmentDetailProgress;
