import Screens from "@/pages";
import { useEffect } from "react";
import { useAuthStore } from "./zustand/auth";
import { who } from "./api/auth";
import { useIsMobile } from "./hooks/use-mobile";
function App() {
  const { auth, user } = useAuthStore();

  console.log("====================================");
  console.log(useIsMobile());
  console.log("====================================");

  useEffect(() => {
    const setUser = async () => {
      await who();
    };

    setUser();
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
