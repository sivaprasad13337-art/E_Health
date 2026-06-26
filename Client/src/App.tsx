import Screens from "@/pages";
import { useEffect } from "react";
import { useAuthStore } from "./zustand/auth";
import { who } from "./api/auth";
import { useIsMobile } from "./hooks/use-mobile";
import { getDoctor } from "./api/hospital";
function App() {
  const { auth, user } = useAuthStore();

  console.log("====================================");
  console.log(useIsMobile());
  console.log("====================================");

  useEffect(() => {
    const setUserAndRole = async () => {
      const data = await who();

      if (data.user.role === "DOCTOR") await getDoctor(data.user.id);
    };

    setUserAndRole();
  }, []);

  useEffect(() => {
    console.log("====================================");
    console.log(auth, user);
    console.log("====================================");
  }, [user, auth]);
  return (
    <>
      <Screens />
    </>
  );
}

export default App;
