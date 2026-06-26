// import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Doctor } from "@/types/hospital";
import { StarFilledIcon } from "@radix-ui/react-icons";
import {
  Building2,
  CircleDollarSign,
  Clock,
  MapPin,
  Star,
  Stethoscope,
} from "lucide-react";

const ProfessionalInfo = ({ doctor }: { doctor: Doctor }) => {
  const AccountInfo = [
    {
      title: "Specialization",
      data: doctor.specialization.name,
      icon: Stethoscope,
    },
    { title: "Department", data: doctor.department.name, icon: Building2 },
    { title: "Location", data: doctor.location, icon: MapPin },
    { title: "Experience", data: doctor.experience, icon: Clock },
    {
      title: "Consult fee",
      data: doctor.consultation_fee,
      icon: CircleDollarSign,
    },
    { title: "Rating", data: doctor.rating, icon: Star },
  ];
  return (
    <Card className="p-4 my-6">
      <CardTitle className="text-sm font-semibold px-5 flex justify-between items-center">
        <p className="font-bold">
          <Stethoscope className="inline-block w-4 h-4 -mt-1 text-primary" />{" "}
          Professional info
        </p>
        {/* <Badge className="py-3 px-3 bg-sky-100 text-sky-600">DOCTOR</Badge> */}
      </CardTitle>
      <CardContent className="">
        {AccountInfo.map((item) => (
          <>
            <div className="flex justify-between my-3">
              <p className="text-gray-600 font-semibold">
                <item.icon className="w-4 h-4 inline-block -mt-1 text-primary" />{" "}
                {item.title}
              </p>

              {item.title === "Rating" ? (
                <p className="font-bold text-yellow-500 w-[40%]">
                  <StarFilledIcon className="inline-block mr-1 -mt-0.5" />
                  {item.data} / 5.0
                </p>
              ) : (
                <p className="font-bold text-gray-800 w-[40%]">{item.data}</p>
              )}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProfessionalInfo;
