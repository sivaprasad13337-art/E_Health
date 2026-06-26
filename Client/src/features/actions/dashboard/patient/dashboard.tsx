import CustomCalender from "../components/custom-calendar";
import HeroSection from "../components/hero-section";
import InfoCards from "../components/info-cards";
import MedicalReportsTable from "../components/medical-records-table";

const PatientDashboard = () => {
  return (
    <section className="bg-amber-30">
      <HeroSection />
      <InfoCards />
      <div className="flex justify-between w-full">
        <MedicalReportsTable />
        <CustomCalender />
      </div>
    </section>
  );
};

export default PatientDashboard;
