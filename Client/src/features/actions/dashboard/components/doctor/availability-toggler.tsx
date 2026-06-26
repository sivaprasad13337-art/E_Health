import { updateDoctorAvailability } from "@/api/hospital";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useHospitalStore } from "@/zustand/hospital";
import { useEffect } from "react";
const AvailabilityToggler = () => {
  const { doctor } = useHospitalStore();

  useEffect(() => {
    console.log("====================================");
    console.log(doctor);
    console.log("====================================");
  }, [doctor]);

  const handleToggle = async () => {
    await updateDoctorAvailability(doctor?.id);
  };
  return (
    <Card className="px-4 py-8 bg-primary/30">
      <CardContent className="flex justify-between items-center text-primary">
        <section className="flex gap-4 items-center">
          <div className="bg-primary w-4 h-4 rounded-full outline-4 outline-primary/30"></div>

          <div>
            <p className="font-semibold text-teal-800">You're available</p>
            <p>Toggle to pause new bookings</p>
          </div>
        </section>

        <Switch checked={doctor?.availability} onClick={() => handleToggle()} />
      </CardContent>
    </Card>
  );
};

export default AvailabilityToggler;
