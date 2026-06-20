import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BriefcaseBusiness, FileBadge, GraduationCap } from "lucide-react";

interface DoctorEducationAndExperienceCardProps {
  name: string;
  where: string;
  when: string;
  type: string;
}

const DoctorEducationAndExperienceCard = ({
  data,
}: {
  data: DoctorEducationAndExperienceCardProps[];
}) => {
  return (
    <Card className="p-4 w-[45%]">
      <CardTitle className="text-sm font-semibold px-5">
        <FileBadge className="inline-block w-4 h-4 -mt-1 text-primary" />{" "}
        Qualifications & experience
      </CardTitle>
      <CardContent className="">
        {data.map((item, idx) => (
          <div
            className="flex justify-between items-center bg-gray-200 p-2 rounded-md my-3"
            key={idx}
          >
            <div className="flex gap-4 items-center">
              <div className="flex justify-center items-center bg-sky-100 w-10 h-10 rounded-md">
                {item.type === "Edu" ? (
                  <GraduationCap className="w-6 h-6 text-sky-600" />
                ) : (
                  <BriefcaseBusiness className="w-6 h-6 text-sky-600" />
                )}
              </div>

              <div>
                <p className="font-bold text-gray-700">{item.name}</p>
                <p className="text-[.9rem] text-gray-700 font-semibold">
                  {item.where} · {item.when}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DoctorEducationAndExperienceCard;
