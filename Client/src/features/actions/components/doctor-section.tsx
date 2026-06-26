// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
import type { User } from "@/types/users";
import { Languages } from "lucide-react";
import AccountInfo from "./user-account-info";
import ProfessionalInfo from "./professional-info";
import { useEffect, useState } from "react";
import { getDoctor } from "@/api/hospital";
import type { Doctor } from "@/types/hospital";
import DoctorEducationAndExperienceCard from "@/features/doctor/components/doctor-edu-exp-card";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DoctorSection = ({ user }: { user: User }) => {
  //   const Info = [
  //     {
  //       title: "Full name",
  //       data: `${user.first_name} ${user.last_name}`,
  //       icon: User2,
  //     },
  //     { title: "Username", data: user.username, icon: AtSign },
  //     { title: "Email", data: user.email, icon: Mail },
  //     { title: "Phone", data: user.phone, icon: Phone },
  //     {
  //       title: "Verified",
  //       data: user.is_verified ? "Yes" : "No",
  //       icon: LucideShieldCheck,
  //     },
  //     { title: "Role", data: user.role, icon: KeyRound },
  //   ];

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

  const [doctor, setDoctor] = useState<Doctor>();

  useEffect(() => {
    const getDoc = async () => {
      const data = await getDoctor(user.id);
      setDoctor(data);
    };

    getDoc();
  }, []);

  const LanguageCanSpeak = ["English", "Tamil", "Telugu"];
  return (
    <section className="flex w-full justify-between">
      {" "}
      <div className="w-[45%]">
        <AccountInfo user={user} />
        {doctor ? <ProfessionalInfo doctor={doctor} /> : ""}
      </div>
      <div className="w-[45%]">
        <DoctorEducationAndExperienceCard data={EducationAndExp} />

        <Card className="p-4 my-6">
          <CardTitle className="text-sm font-semibold px-5 flex justify-between items-center">
            <p className="font-bold">
              <Languages className="inline-block w-4 h-4 -mt-1 text-primary" />{" "}
              Languages
            </p>
            {/* <Badge className="py-3 px-3 bg-sky-100 text-sky-600">Doctor</Badge> */}
          </CardTitle>
          <CardContent className="">
            {LanguageCanSpeak.map((item) => (
              <Badge className="py-4 px-6 mr-2 bg-teal-200 text-teal-800 text-[.9rem]">
                {item}
              </Badge>
            ))}

            <div className="bg-teal-100 p-6 mt-6 text-primary text-[.9rem] flex justify-between items-center rounded-md">
              <div className="flex items-center gap-4 w-[40%]">
                <span className="w-3 h-3 bg-teal-400 block rounded-full"></span>
                <p className="font-semibold">
                  Currently available for appointments
                </p>
              </div>
              <p className="text-lg font-semibold">{"\u20B9"}800 / visit</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DoctorSection;
