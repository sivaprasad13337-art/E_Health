import { Clock, MapPin, Star } from "lucide-react";
import DetailedDoctorCard from "../components/detailed-doctor-card";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircledIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { CarouselSpacing } from "@/components/shared-components/custom-carousel-small";
import { CarouselItem } from "@/components/ui/carousel";
import Pic from "@/components/Pic";
import DoctorEducationAndExperienceCard from "../components/doctor-edu-exp-card";

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

const Reviews = [
  {
    review:
      "Exceptional doctor. Very thorough and took time to explain everything clearly.",
    user: "Raj K",
    rating: 3.9,
  },
  {
    review:
      "Highly recommend Dr. Meera. Diagnosed my condition quickly and accurately.",
    user: "Priya S",
    rating: 4,
  },
  {
    review:
      "Very professional. Wait time was a bit long but consultation was excellent.",
    user: "Arjun M",
    rating: 4.5,
  },
  {
    review:
      "Exceptional doctor. Very thorough and took time to explain everything clearly.",
    user: "Raj K",
    rating: 4.5,
  },
  {
    review:
      "Highly recommend Dr. Meera. Diagnosed my condition quickly and accurately.",
    user: "Priya S",
    rating: 5,
  },
  {
    review:
      "Very professional. Wait time was a bit long but consultation was excellent.",
    user: "Arjun M",
    rating: 5,
  },
];

console.log("====================================");
console.log(3.9 / 1);
console.log("====================================");
const DoctorProfile = () => {
  return (
    <div>
      <DetailedDoctorCard />

      <section className="flex justify-between my-6">
        <div className="w-[45%]">
          <DoctorEducationAndExperienceCard data={EducationAndExp} />
        </div>

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
            {Reviews.map((item, index) => (
              <CarouselItem key={index} className="basis-1/2 pl-1 lg:basis-1/3">
                <div className="p-1">
                  <Card className="w-full h-[12rem] bg-gray-200">
                    <CardContent className="">
                      {/* flex items-center justify-center w-full h-full */}
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                          <Pic className="" img="" />
                          <p className="font-bold">{item.user}</p>
                        </div>

                        <div className="flex">
                          {Array.from({ length: item.rating }).map((_, idx) => (
                            <StarFilledIcon
                              className="w-4 h-4 text-yellow-500"
                              key={idx}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-gray-600 font-semibold mt-4">
                        {item.review}
                      </p>
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
