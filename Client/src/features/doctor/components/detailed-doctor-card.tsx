import Pic from "@/components/Pic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { CalendarPlus, Verified } from "lucide-react";

const DetailedDoctorCard = () => {
  return (
    <Card
      style={{ background: "linear-gradient(90deg, #166a9e 0%, #199193 100%)" }}
    >
      <CardContent className="flex justify-between text-gray-200">
        <section className="flex gap-6 items-center">
          <Pic className="w-20 h-20" img="" />

          <div>
            <h2 className="text-lg font-bold">
              Dr. Meera Nair{" "}
              <Verified className="w-5 h-5 inline-block text-green-300 -mt-0.5" />
            </h2>
            <p className="text-sm font-semibold text-gray-300">
              Cardiologist · MBBS, MD, DM (Cardiology) · 14 yrs exp
            </p>

            <div className="my-2">
              <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-none mr-2">
                Apollo Hospital
              </Badge>

              <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-none mr-2">
                Chennai
              </Badge>
              <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-none">
                <StarFilledIcon className="text-yellow-500" /> 4.9 · 320 reviews
              </Badge>
            </div>

            <div className="flex mt-3">
              <div>
                <h2 className="font-bold text-xl leading-5">2,400+</h2>
                <p className="text-xs font-semibold">Patients</p>
              </div>

              <div className="mx-2">
                <h2 className="font-bold text-xl leading-5">14 yrs</h2>
                <p className="text-xs font-semibold">Experience</p>
              </div>

              <div>
                <h2 className="font-bold text-xl leading-5">₹800</h2>
                <p className="text-xs font-semibold">Consult fee</p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col items-end justify-between">
          <Badge className="px-3 py-3 bg-green-100 text-green-600">
            <span className="w-2 h-2 rounded-full bg-green-600"></span> Available
          </Badge>
          <Button className="py-5 px-6 bg-gray-100 text-primary hover:text-gray-100 rounded-sm">
            <CalendarPlus /> Book Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedDoctorCard;
