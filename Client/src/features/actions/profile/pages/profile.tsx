import { useAuthStore } from "@/zustand/auth";
import ProfileHeader from "../../components/profile-header";
// import AccountInfo from "../../components/user-account-info";
import AdminSection from "../../components/admin-section";
import UserSection from "../../components/user-section";
import DoctorSection from "../../components/doctor-section";
const Profile = () => {
  const { user } = useAuthStore();
  return (
    <div>
      <ProfileHeader user={user} />

      <section className="my-6 flex justify-between">
        {user?.role === "mm" ? (
          <AdminSection />
        ) : user?.role === "Patient" ? (
          <UserSection />
        ) : user?.role === "DOCTOR" ? (
          <DoctorSection user={user} />
        ) : null}
      </section>
    </div>
  );
};

export default Profile;
