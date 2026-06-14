import { verifyPayment } from "@/api/payment-services";
import { Button } from "@/components/ui/button";
import type { BillingDetail, PaymentProps } from "../../interface/interface";
import { LockKeyhole } from "lucide-react";
import type { RazorpayResponse } from "@/types/razorpay";
import { useOrderStore } from "@/zustand/appointment";

export default function PaymentButton({
  navigateNext,
  orderData,
}: PaymentProps) {
  const { setOrder } = useOrderStore();
  const handlePayment = async () => {
    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: orderData.Price_details.total_amount * 100,

        currency: orderData.Price_details.currency,

        name: "E-Hospital",

        description: "Appointment Payment",

        order_id: orderData.order_id,

        // explicitly enable UPI
        // config: {
        //   display: {
        //     blocks: {
        //       upi: {
        //         name: "Pay via UPI",
        //         instruments: [{ method: "upi" }],
        //       },
        //     },
        //     sequence: ["block.upi"],
        //     preferences: { show_default_blocks: true },
        //   },
        // },

        handler: async function (response: RazorpayResponse) {
          console.log("====================================");
          console.log(response);
          console.log("====================================");
          const bill = await verifyPayment({
            appointment_id: orderData.appointment.id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            discount_code: orderData.Price_details.discount_info.code,
          });
          console.log("====================================");
          console.log(bill);
          console.log("====================================");

          const Order: BillingDetail = {
            appointment: bill.appointment,
            particular: bill.particular,
            total_amount: bill.total_amount,
            add_ons: bill.add_ons,
            discount: bill.discount,
            discount_code: bill.discount_code,
            discount_percentage: bill.discount_percentage,
            amount_paid: bill.amount_paid,
            transaction_status: bill.transaction_status,
          };
          setOrder(Order);
          navigateNext();
        },
      };

      if (!window.Razorpay) {
        alert("Payment gateway failed to load. Please refresh.");
        return;
      }
      const razorpay = new window.Razorpay(options);
      razorpay.open();

      // razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Payment Failed");
    }
  };

  return (
    <Button
      className="text-primary bg-transparent border-[1px] border-primary p-5 w-full hover:bg-teal-100 cursor-pointer text-lg"
      onClick={handlePayment}
    >
      <LockKeyhole className="!w-[1.2rem] !h-[1.2rem]" /> Proceed to pay{" "}
      {"\u20B9"}
      {orderData.Price_details.total_amount}
    </Button>
  );
}
