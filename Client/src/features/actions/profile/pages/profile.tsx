import { useAuthStore } from "@/zustand/auth";
import ProfileHeader from "../../components/profile-header";
// import AccountInfo from "../../components/user-account-info";
import AdminSection from "../../components/admin-section";
import UserSection from "../../components/user-section";
import DoctorSection from "../../components/doctor-section";
const Profile = () => {
  const { user } = useAuthStore();

  const isPatient = user?.role === "PATIENT";
  const isDoctor = user?.role === "DOCTOR";
  const isAdmin = user?.role === "ADMIN";
  return (
    <div>
      <ProfileHeader user={user} />

      <section className="my-6 flex justify-between">
        {isPatient && <UserSection />}
        {isDoctor && <DoctorSection user={user} />}
        {isAdmin && <AdminSection />}
      </section>
    </div>
  );
};

export default Profile;
