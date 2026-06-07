import CustomCalender from "../shared-components/custom-calendar";
import HeroSection from "../shared-components/hero-section";
import MedicalReportsTable from "../shared-components/medical-records-table";

const PatientDashboard = () => {
  return (
    <section className="bg-amber-30">
      <HeroSection />
      <div className="flex justify-between w-full">
        <MedicalReportsTable />
        <CustomCalender />
      </div>
    </section>
  );
};

export default PatientDashboard;
