import { useEffect, useRef, useState } from "react";
import PaymentButton from "../components/payment-button";
import type { CompsProps } from "../../interface/interface";
import { createAppointment } from "@/api/appointment";

const Payment = ({ formData, setFormData }: CompsProps) => {
  const [appointmentId, setAppointmentId] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;

    hasRun.current = true;

    const bookAppointment = async () => {
      const data = await createAppointment(formData);
      setAppointmentId(data.id);
    };

    bookAppointment();
    // console.log("====================================");
    // console.log("hjvjdufb");
    // console.log("====================================");
  }, []);
  return (
    <div>
      {appointmentId ? <PaymentButton appointmentId={1} /> : <p>wait baby</p>}
    </div>
  );
};

export default Payment;
