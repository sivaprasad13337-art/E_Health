declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name?: string;
  description?: string;
  handler?: (response: RazorpayResponse) => void;
}

interface RazorpayInstance {
  open(): void;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export {};

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// export {};
