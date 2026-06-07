import AdminDashboard from "./admin/dashboard";
import DoctorDashboard from "./doctor/dashboard";
import PatientDashboard from "./patient/dashboard";

const index: React.FC = () => {
  const user = "Patient";

  return user === "Patient" ? (
    <PatientDashboard />
  ) : user === "Doctor" ? (
    <DoctorDashboard />
  ) : (
    <AdminDashboard />
  );
};

export default index;
