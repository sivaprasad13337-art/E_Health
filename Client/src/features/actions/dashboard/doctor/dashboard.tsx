import type { User } from "@/types/users";
import DoctorHeroSectionCard from "../components/doctor/doctor-hero-section";
import QuickInfoCards from "../components/doctor/quick-info-cards";
import AvailabilityToggler from "../components/doctor/availability-toggler";
import { useHospitalStore } from "@/zustand/hospital";
import AppoitmentsOverviewsCard from "../components/doctor/appointments-overview";
import WeeklySummaryCard from "../components/doctor/weekly-summary-card";
import RecentPatientsCard from "../components/doctor/recent-patients";
import { CalendarCheck2, FileClock, Star, Users } from "lucide-react";
// import type { bg } from "date-fns/locale";
const DoctorDashboard = ({ user }: { user: User }) => {
  const { doctor } = useHospitalStore();

  const data = [
    {
      title: "Today's appointments",
      icon: CalendarCheck2,
      content: 6,
      description: "↑ 3",
      bg: "green-100",
      iconText: "green-500",
    },
    {
      title: "Total patients",
      icon: Users,
      content: 12,
      description: "↑ 12",
      bg: "sky-100",
      iconText: "sky-500",
    },
    {
      title: "Pending bills",
      icon: FileClock,
      content: 2,
      description: "2 due",
      bg: "yellow-100",
      iconText: "amber-500",
    },
    {
      title: "Patient rating",
      icon: Star,
      content: 4.9,
      description: "↑ 0.1",
      bg: "red-100",
      iconText: "red-700",
    },
  ];

  return (
    <>
      {doctor && <DoctorHeroSectionCard user={user} doctor={doctor} />}

      <section className="flex justify-between">
        <div className="w-[67%] flex gap-6">
          {data.map((card, idx) => (
            <QuickInfoCards card={card} key={idx} />
          ))}
        </div>

        <div className="w-[30%]">
          <AvailabilityToggler />
        </div>
      </section>

      <section className="flex justify-between">
        <div className="w-[50%]">
          <AppoitmentsOverviewsCard />
        </div>

        <div className="w-[45%]">
          <WeeklySummaryCard />

          <RecentPatientsCard />
        </div>
      </section>
    </>
  );
};

export default DoctorDashboard;
