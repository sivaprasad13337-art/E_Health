// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
import type { User } from "@/types/users";
import {
  AtSign,
  //   BadgeX,
  //   CheckCircle,
  KeyRound,
  LucideShieldCheck,
  Mail,
  Phone,
  User2,
  //   UserSquare,
} from "lucide-react";
import AccountInfo from "./user-account-info";
import ProfessionalInfo from "./professional-info";
import { useEffect, useState } from "react";
import { getDoctor } from "@/api/hospital";
import type { Doctor } from "@/features/doctor/interface/interface";

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

  const [doctor, setDoctor] = useState<Doctor>();

  useEffect(() => {
    const getDoc = async () => {
      const data = await getDoctor(user.id);
      setDoctor(data);
    };

    getDoc();
  });
  return (
    <section className="flex w-full justify-between">
      {" "}
      <div className="w-[45%]">
        <AccountInfo user={user} />
        {doctor ? <ProfessionalInfo doctor={doctor} /> : ""}
      </div>
      <div className="w-[45%]">
        {doctor ? <ProfessionalInfo doctor={doctor} /> : ""}
      </div>
    </section>
  );
};

export default DoctorSection;
