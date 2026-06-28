import { updateDoctorAvailability } from "@/api/hospital";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useHospitalStore } from "@/zustand/hospital";
// import { useEffect } from "react";
const AvailabilityToggler = () => {
  const { doctor } = useHospitalStore();

  //   useEffect(() => {
  //     console.log("====================================");
  //     console.log(doctor);
  //     console.log("====================================");
  //   }, [doctor]);

  const handleToggle = async () => {
    if (doctor) await updateDoctorAvailability(doctor?.id);
  };
  return (
    <Card
      className={
        doctor?.availability
          ? "px-4 py-8 bg-primary/30"
          : "px-4 py-8 bg-red-600/20"
      }
    >
      <CardContent
        className={
          doctor?.availability
            ? "flex justify-between items-center text-primary"
            : "flex justify-between items-center text-destructive"
        }
      >
        <section className="flex gap-4 items-center">
          <div
            className={`bg-${doctor?.availability ? "primary" : "red-500"} w-4 h-4 rounded-full outline-4 ${doctor?.availability ? "outline-primary/30" : "outline-red-500/30"}`}
          ></div>

          {doctor?.availability ? (
            <div>
              <p className="font-semibold text-teal-800">You're available</p>
              <p>Toggle to pause new bookings</p>
            </div>
          ) : (
            <div>
              <p className="font-semibold text-red-500">You're Unavailable</p>
              <p>Toggle to Resume new bookings</p>
            </div>
          )}
        </section>

        <Switch className="cursor-pointer" checked={doctor?.availability} onClick={() => handleToggle()} />
      </CardContent>
    </Card>
  );
};

export default AvailabilityToggler;
