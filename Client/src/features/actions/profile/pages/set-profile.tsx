import { useAuthStore } from "@/zustand/auth";
import { SetProfileForm } from "../../components/set-profile-form";

const SetProfile = () => {
  const { user } = useAuthStore();
  return (
    <>
      <SetProfileForm userData={user} />
    </>
  );
};

export default SetProfile;
