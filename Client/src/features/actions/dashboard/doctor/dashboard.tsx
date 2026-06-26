import type { User } from "@/types/users";
import DoctorHeroSectionCard from "../components/doctor/doctor-hero-section";
import QuickInfoCards from "../components/doctor/quick-info-cards";
import AvailabilityToggler from "../components/doctor/availability-toggler";
import { useHospitalStore } from "@/zustand/hospital";
const DoctorDashboard = ({ user }: { user: User }) => {
  const { doctor } = useHospitalStore();

  return (
    <>
      {doctor && <DoctorHeroSectionCard user={user} doctor={doctor} />}

      <section className="flex justify-between">
        <div className="w-[67%] flex gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <QuickInfoCards key={idx} />
          ))}
        </div>

        <div className="w-[30%]">
          <AvailabilityToggler />
        </div>
      </section>
    </>
  );
};

export default DoctorDashboard;
