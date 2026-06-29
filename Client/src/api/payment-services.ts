import apiClient from "@/lib/api-client";

interface VerifyPayload {
  appointment_id: number;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  discount_code: string;
}

export const createOrder = async (
  appointmentId: number,
  discount_code: string,
) => {
  try {
    const response = await apiClient.post("/api/payments/create-order/", {
      appointment_id: appointmentId,
      discount_code: discount_code,
    });

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const verifyPayment = async (payload: VerifyPayload) => {
  try {
    const response = await apiClient.post("/api/payments/verify/", payload);

    console.log("====================================");
    console.log(response.data);
    console.log("====================================");
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const GetBillByAPt = async (apt_id: number) => {
  try {
    const response = await apiClient.get(
      `api/payments/get/bill-by-apt/${apt_id}`,
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
};
