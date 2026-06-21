import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { User } from "@/types/users";
import {
  AtSign,
  BadgeX,
  CheckCircle,
  KeyRound,
  LucideShieldCheck,
  Mail,
  Phone,
  User2,
  UserSquare,
} from "lucide-react";

const AccountInfo = ({ user }: { user: User }) => {
  const AccountInfo = [
    {
      title: "Full name",
      data: `${user.first_name} ${user.last_name}`,
      icon: User2,
    },
    { title: "Username", data: user.username, icon: AtSign },
    { title: "Email", data: user.email, icon: Mail },
    { title: "Phone", data: user.phone, icon: Phone },
    {
      title: "Verified",
      data: user.is_verified ? "Yes" : "No",
      icon: LucideShieldCheck,
    },
    { title: "Role", data: user.role, icon: KeyRound },
  ];
  return (
    <Card className="p-4">
      <CardTitle className="text-sm font-semibold px-5 flex justify-between items-center">
        <p className="font-bold">
          <UserSquare className="inline-block w-4 h-4 -mt-1 text-primary" />{" "}
          Account info
        </p>
        <Badge className="py-3 px-3 bg-sky-100 text-sky-600">{user.role}</Badge>
      </CardTitle>
      <CardContent className="">
        {AccountInfo.map((item) => (
          <>
            <div className="flex justify-between my-3">
              <p className="text-gray-600 font-semibold">
                <item.icon className="w-4 h-4 inline-block -mt-1 text-primary" />{" "}
                {item.title}
              </p>
              {item.data === "Yes" ? (
                <p className="font-bold text-gray-800 w-[40%]">
                  <CheckCircle className="w-4 h-4 inline-block -mt-1 text-primary" />{" "}
                  {item.data}
                </p>
              ) : item.data === "No" ? (
                <p className="font-bold text-gray-800 w-[40%]">
                  <BadgeX className="w-4 h-4 inline-block -mt-1 text-destructive" />{" "}
                  No
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

export default AccountInfo;
