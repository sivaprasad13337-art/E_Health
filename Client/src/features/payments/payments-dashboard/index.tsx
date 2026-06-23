import { useAuthStore } from "@/zustand/auth";
import AdminPaymentsDashboard from "./pages/admin-payments";
import DoctorPaymentsDashboard from "./pages/doctor-payments";

const PaymentsDashboard = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "ADMIN";
  const isDoctor = user?.role === "DOCTOR";

  return (
    <>
      {isAdmin && <AdminPaymentsDashboard />}
      {isDoctor && <DoctorPaymentsDashboard />}
    </>
  );
};

export default PaymentsDashboard;
