import apiClient from "@/lib/api-client";

interface VerifyPayload {
  appointment_id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export const createOrder = async (appointmentId: number) => {
  try {
    const response = await apiClient.post("/api/payments/create-order/", {
      appointment_id: appointmentId,
    });

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const verifyPayment = async (payload: VerifyPayload) => {
  try {
    const response = await apiClient.post("/api/payments/verify/", payload);

    return response.data;
  } catch (err) {
    console.error(err);
  }
};
