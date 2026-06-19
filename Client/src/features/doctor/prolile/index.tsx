import {
  BriefcaseBusiness,
  Clock,
  FileBadge,
  GraduationCap,
  MapPin,
  Star,
} from "lucide-react";
import DetailedDoctorCard from "../components/detailed-doctor-card";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircledIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { CarouselSpacing } from "@/components/shared-components/custom-carousel-small";
import { CarouselItem } from "@/components/ui/carousel";

const EducationAndExp = [
  { name: "MBBS", where: "AIIMS Delhi", when: "2006", type: "Edu" },
  {
    name: "MD — Internal Medicine",
    where: "CMC Vellore",
    when: "2010",
    type: "Edu",
  },
  {
    name: "DM — Cardiology",
    where: "PGIMER Chandigarh",
    when: "2013",
    type: "Edu",
  },
  {
    name: "Senior Cardiologist",
    where: "Apollo Hospital, Chennai ",
    when: "2013 - Present",
    type: "Exp",
  },
];

const Availability = [
  { day: "Mon", times: ["9-12", "3-6"] },
  { day: "Tue", times: [] },
  { day: "Wed", times: ["10-1"] },
  { day: "Thu", times: ["9-12", "4-7"] },
  { day: "Fri", times: ["9-1"] },
  { day: "Sat", times: ["11-1"] },
];

const DoctorProfile = () => {
  return (
    <div>
      <DetailedDoctorCard />

      <section className="flex justify-between my-6">
        <Card className="p-4 w-[45%]">
          <CardTitle className="text-sm font-semibold px-5">
            <FileBadge className="inline-block w-4 h-4 -mt-1 text-primary" />{" "}
            Qualifications & experience
          </CardTitle>
          <CardContent className="">
            {EducationAndExp.map((item, idx) => (
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

        <Card className="p-4 w-[45%] h-auto">
          <CardTitle className="text-sm font-semibold px-4">
            <Clock className="inline-block w-4 h-4 -mt-0.5 text-primary" />{" "}
            Weekly availability
          </CardTitle>
          <CardContent className="">
            <section className="flex gap-4">
              {Availability.map((item) =>
                item.times.length ? (
                  <div className="bg-teal-100 text-primary p-3 rounded-md">
                    <p className="text-teal-800 font-semibold">{item.day}</p>
                    {item.times.map((time) => (
                      <p>{time}</p>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="font-semibold">{item.day}</p>
                    <p>Off</p>
                  </div>
                ),
              )}
            </section>

            <p className="text-sm font-bold mt-8">
              <MapPin className="inline-block w-4 h-4 -mt-0.5 text-primary" />{" "}
              Location
            </p>

            <div className="flex gap-6 mt-2">
              <p className="text-gray-600 font-semibold">Hospital</p>
              <p className="font-semibold">Apollo Hospital, Greams Rd</p>
            </div>

            <Separator className="my-2" />
            <div className="flex gap-6">
              <p className="text-gray-600 font-semibold">Online consultation</p>
              <p className="font-semibold">
                <CheckCircledIcon className="w-5 h-5 text-green-500 inline-block mr-1" />
                Available
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="p-4">
        <CardTitle className="text-sm font-semibold px-4">
          <Star className="inline-block w-4 h-4 -mt-1 text-primary" /> Patient
          reviews{" "}
          <StarFilledIcon className="inline-block w-4 h-4 -mt-1 text-yellow-500" />{" "}
          4.9 · 320 reviews
        </CardTitle>

        <CardContent>
          <CarouselSpacing>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 pl-1 lg:basis-1/3 w-[30%]"
              >
                <div className="p-1">
                  <Card className="w-[60%] h-[8rem] bg-gray-200">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-2xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselSpacing>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfile;
