import Pic from "@/components/Pic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { writeMedicalReport } from "@/data/paths";
import { getCloudinaryUrl } from "@/lib/utils";
import type { User } from "@/types/users";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { CheckCircle2, FilePlus, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import type { Doctor } from "@/types/hospital";
const DoctorHeroSectionCard = ({
  user,
  doctor,
}: {
  user: User;
  doctor: Doctor;
}) => {
  return (
    <Card
      className="px-4 py-10"
      style={{
        background: "linear-gradient(90deg, #106d62 2%, #21c493 90%)",
      }}
    >
      <CardContent className="flex justify-between items-center text-gray-200">
        <section className="flex gap-6 items-center">
          <Pic className="w-20 h-20" img={getCloudinaryUrl(user.profile_img)} />

          <div>
            <h2 className="text-3xl font-bold">
              Good morning, Dr. {user.first_name}
            </h2>

            <p className="text-sm font-semibold text-gray-300 mb-3 mt-1">
              You have 6 appointments today · 2 reports pending
            </p>

            <div className="my-2 flex items-center">
              {doctor?.availability ? (
                <Badge className="bg-green-600/10 backdrop-blur-md border border-white/20 text-green-400 shadow-none mr-2 p-3">
                  <>
                    <CheckCircle2 /> Available
                  </>
                </Badge>
              ) : (
                <Badge className="bg-red-600/30 backdrop-blur-md border border-white/20 text-destructive shadow-none mr-2 py-3.5 font-semibold">
                  <XCircle className="text-destructive" /> Unavailable
                </Badge>
              )}

              <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-none mr-2 p-3">
                {doctor?.department.name} · Apollo Hospital
              </Badge>

              <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-none p-3">
                <StarFilledIcon className="text-yellow-500" /> {doctor?.rating}{" "}
                rating
              </Badge>
            </div>
          </div>
        </section>

        <Link
          to={`${writeMedicalReport}/rpt-67252`}
          className="bg-white backdrop-blur-md text-teal-800 font-semibold shadow-none px-6 py-3 rounded-md"
        >
          <FilePlus className="w-4 h-4 inline-block -mt-1" /> Write report
        </Link>
      </CardContent>
    </Card>
  );
};

export default DoctorHeroSectionCard;
