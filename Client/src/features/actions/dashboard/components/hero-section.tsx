import { Button } from "@/components/ui/button";
import doctor from "@/assets/imgs/doctor-hero.webp";
import { useAuthStore } from "@/zustand/auth";
import { useNavigate } from "react-router-dom";
import { bookAppointment } from "@/constants/paths";
// import doctor1 from "@/assets/imgs/doctor-hero2.webp";
// import doctor2 from "@/assets/imgs/young-female-doctor-white-medical-suit-with-stethoscope-white-protective-mask-writing-down-notes-white_140725-16508.avif";

const HeroSection = () => {
  // const user = { name: "Siva Prasad" };
  const { user } = useAuthStore();
  const navigate = useNavigate();
  return (
    <div className="relative rounded-xl bg-[#1B7B72] p-8 text-white mt-10">
      <div className="max-w-lg">
        <h2 className="text-3xl font-bold">
          Good Morning, {user?.first_name} {user?.last_name}
        </h2>
        <p className="text-sm my-3">
          Here's what's happening with your health today.
        </p>
        <Button
          className="bg-white text-black px-4 py-4"
          onClick={() => navigate(bookAppointment)}
        >
          Create Appointment
        </Button>
      </div>
      <img
        src={doctor}
        alt="Doctor"
        className="absolute bottom-0 right-8 h-[130%] object-contain"
      />
    </div>
  );
};

export default HeroSection;
