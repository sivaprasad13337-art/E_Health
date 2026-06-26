import { useAuthStore } from "@/zustand/auth";
import AdminDashboard from "./admin/dashboard";
import DoctorDashboard from "./doctor/dashboard";
import PatientDashboard from "./patient/dashboard";

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <>
      {user?.role === "PATIENT" && <PatientDashboard />}{" "}
      {user?.role === "DOCTOR" && <DoctorDashboard user={user} />}{" "}
      {user?.role === "ADMIN" && <AdminDashboard />}
    </>
  );
};

export default Dashboard;
