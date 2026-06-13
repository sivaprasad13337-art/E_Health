// import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import type {
  AppointmentPayload,
  OrderDataType,
  PaymentProps,
} from "../../interface/interface";
import PaymentButton from "../components/payment-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Clock, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// import type { CompsProps } from "../../interface/interface";
// import { createAppointment } from "@/api/appointment";\



const Payment = ({ orderData, setActive }: PaymentProps ) => {
  const servicesTotal = orderData.Price_details.add_ons.reduce(
    (tota, item) => tota + item.price,
    0,
  );
  return (
    <ScrollArea className="px-6 mt-4 h-[27.4rem] overflow-y-auto">
      <div className="flex justify-between w-[70%]">
        <p className="flex items-center gap-1">
          <CalendarCheck className="w-[1rem] h-[1rem] text-primary" /> Mon, 16
          Jun 2026
        </p>
        <p className="flex items-center gap-1">
          <Clock className="w-[1rem] h-[1rem] text-primary" /> 10:30 AM
        </p>
        <p className="flex items-center gap-1">
          <CalendarCheck className="w-[1rem] h-[1rem] text-primary" /> Online
        </p>
      </div>
      <Separator className="my-2" />
      <section className="">
        <div className="flex justify-between">
          <p className="font-semibold">Consultation fee</p>{" "}
          <p className="font-semibold">
            {"\u20B9"}
            {orderData.Price_details.doctor_consultation}
          </p>
        </div>

        {/* <Separator className="my-1 bg-gray-500" /> */}
        {/* <div className="flex justify-between my-1 text-primary">
          <p className="font-bold">
            Services{" "}
           
          </p>
          <p className="font-bold">{servicesTotal}</p>
        </div> */}
        {orderData.Price_details.add_ons.map((service, idx) => (
          <div className="flex justify-between" key={idx}>
            <p>{service.test}</p>
            <p className="font-semibold">
              {"\u20B9"}
              {service.price}
            </p>
          </div>
        ))}
        <Separator className="my-2" />

        <div className="flex justify-between">
          <p className="font-semibold">Platform fee</p>
          <p className="font-semibold">{"\u20B9"}49</p>
        </div>

        <div className="flex justify-between">
          <p className="font-semibold">GST (18%)</p>
          <p className="font-semibold">{"\u20B9"}153</p>
        </div>

        <div className="flex justify-between text-primary mt-2">
          <p className="font-semibold">Coupon discount</p>
          <p className="font-semibold">− {"\u20B9"}0</p>
        </div>

        <div className="flex justify-between mt-6 gap-2 items-center">
          <Input placeholder="Enter coupon code" />
          <Button className="py-5 px-8">Apply</Button>
        </div>
      </section>
      <Separator className="my-2" />

      <div className="flex justify-between my-3 text-lg">
        <p className="font-semibold">Total payable</p>
        <p className="font-semibold text-primary">
          {"\u20B9"}
          {orderData.Price_details.total_amount}
        </p>
      </div>
      {orderData ? <PaymentButton setActive={setActive} orderData={orderData} /> : <p>wait baby</p>}

      <small className="text-center w-full block mt-2">
        256-bit SSL encrypted · Safe & secure checkout Powered by{" "}
        <span className="text-primary">Razorpay</span>
      </small>
    </ScrollArea>
  );
};

export default Payment;
