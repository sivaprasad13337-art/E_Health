import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formateDateAndTime } from "@/lib/utils";
import type { BillingDetail } from "@/types/payment";
import {
  AlertTriangle,
  BadgeCheck,
  CalendarCheck2,
  CalendarMinus2,
  ReceiptText,
  X,
} from "lucide-react";

const AppointmentPaymentAndFollowUpCards = ({
  bill,
}: {
  bill: BillingDetail;
}) => {
  return (
    <section className="flex flex-col gap-6">
      {/* Follow-up Card */}
      <Card className="p-4">
        <CardTitle className="px-4">
          <CalendarMinus2 className="icon-text text-primary" /> Follow-up
        </CardTitle>

        <CardContent>
          <div className="flex gap-4 items-center p-4 rounded-lg bg-teal-100 text-primary">
            <CalendarCheck2 className="icon-text text-primary w-5 h-5" />
            <div>
              <p className="font-semibold">14 Jul 2026 · 10:30 AM</p>
              <p>Scheduled by Dr. Meera Nair</p>
            </div>
          </div>

          <Button className="px-6 py-5 bg-transparent border border-gray-300 text-gray-500 mt-4 w-full hover:bg-gray-50 cursor-pointer">
            Reschedule follow-up
          </Button>
        </CardContent>
      </Card>

      {/* Payment Summary Card */}
      <Card className="px-4 py-6 bg-teal-100">
        <CardTitle className="px-4">
          <ReceiptText className="icon-text text-primary" /> Payment summary
        </CardTitle>

        <CardContent>
          <section>
            <div className="flex justify-between text-primary">
              <p>Consultation fee</p>
              <p className="font-semibold">
                {"\u20B9"}
                {bill.appointment.doctor.consultation_fee}
              </p>
            </div>

            <div className="flex justify-between text-primary my-2">
              <p>Addons</p>
              <p className="font-semibold">
                {"\u20B9"}
                {bill.add_ons.reduce((amount, item) => amount + item.price, 0)}
              </p>
            </div>

            <div className="flex justify-between text-primary my-2">
              <p>Platform fee</p>
              <p className="font-semibold">{"\u20B9"}49</p>
            </div>

            <div className="flex justify-between text-primary my-2">
              <p>GST (18%)</p>
              <p className="font-semibold">{"\u20B9"}818.82</p>
            </div>

            <div className="flex justify-between text-primary my-2">
              <p>Discount</p>
              <p className="font-semibold">-{"\u20B9"}0</p>
            </div>
          </section>
          <Separator className="bg-primary/50" />

          <div className="flex justify-between text-teal-700 my-2 text-lg">
            <p className="font-semibold">Total paid</p>
            <p className="font-semibold">
              {"\u20B9"}
              {bill.amount_paid}
            </p>
          </div>

          <p className="text-primary">
            <BadgeCheck className="icon-text" /> Paid via Razorpay ·{" "}
            {formateDateAndTime(bill.created_at).map((item) => (
              <>{item} </>
            ))}
          </p>
        </CardContent>
      </Card>

      <Card className="p-4 bg-red-700/10 border border-red-300">
        <CardContent>
          <p className="text-red-600 font-semibold">
            <AlertTriangle className="icon-text" /> Cancel appointment
          </p>
          <p className="text-gray-500 font-semibold my-2">
            Free cancellation up to 24 hours before. After that a ₹100
            cancellation fee applies.
          </p>

          <Button className="px-6 py-5 bg-red-100 border border-red-300 text-red-600 mt-4 w-full hover:bg-red-200 cursor-pointer">
            <X className="icon-text mt-0.5" /> Cancel this appointment
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default AppointmentPaymentAndFollowUpCards;
