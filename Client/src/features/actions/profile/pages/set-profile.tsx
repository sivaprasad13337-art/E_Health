import { useAuthStore } from "@/zustand/auth";
import { SetProfileForm } from "../../components/set-profile-form";

const SetProfile = () => {
  const { user } = useAuthStore();
  return (
    <div>
      <SetProfileForm userData={user} />
    </div>
  );
};

export default SetProfile;
