import { createOrder, verifyPayment } from "@/api/payment-services";
import { Button } from "@/components/ui/button";

export default function PaymentButton({
  appointmentId,
}: {
  appointmentId: number;
}) {
  const handlePayment = async () => {
    try {
      const orderData = await createOrder(appointmentId);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: orderData.Price_details.total_amount * 100,

        currency: orderData.Price_details.currency,

        name: "E-Hospital",

        description: "Appointment Payment",

        order_id: orderData.order_id,

        handler: async function (response) {
          console.log('====================================');
          console.log(response);
          console.log('====================================');
          await verifyPayment({
            appointment_id: appointmentId,

            razorpay_order_id: response.razorpay_order_id,

            razorpay_payment_id: response.razorpay_payment_id,

            razorpay_signature: response.razorpay_signature,
          });

          alert("Payment Successful");
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Payment Failed");
    }
  };

  return <Button onClick={handlePayment}>Pay Now</Button>;
}
