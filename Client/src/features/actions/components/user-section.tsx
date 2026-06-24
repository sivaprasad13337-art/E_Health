import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Activity, Clock3, Droplet, Ruler, Scale } from "lucide-react";
import AccountInfo from "./user-account-info";
import type { User } from "@/types/users";

const UserSection = ({ user }: { user: User }) => {
  const HealthInfo = [
    {
      title: "Blood group",
      data: "B+",
      icon: Droplet,
      bg: "bg-red-100",
      text: "text-red-600",
    },
    {
      title: "Age yrs",
      data: "23",
      icon: Clock3,
      bg: "bg-teal-100",
      text: "text-teal-600",
    },
    {
      title: "Height cm",
      data: "181",
      icon: Ruler,
      bg: "bg-sky-100",
      text: "text-sky-600",
    },
    {
      title: "Weight kg",
      data: "80",
      icon: Scale,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
  ];

  const Analytics = [
    { title: "Total visits", data: 12 },
    { title: "Reports", data: 8 },
    { title: "Doctors", data: 4 },
  ];
  return (
    <section className="flex w-full justify-between">
      {" "}
      <div className="w-[45%]">
        <AccountInfo user={user} />
      </div>

      <div className="w-[45%]">
        <Card>
          <CardTitle className="text-sm font-semibold px-5 flex justify-between items-center">
            <p className="font-bold">
              <Activity className="inline-block w-4 h-4 -mt-1 text-primary" />{" "}
              Health info
            </p>
          </CardTitle>

          <CardContent className="flex justify-between">
            {HealthInfo.map((item, idx) => (
              <div
                className={`${item.bg} w-[20%] flex flex-col items-center p-3 rounded-md`}
                key={idx}
              >
                {<item.icon className={`${item.text}`} />}
                <p className={`${item.text} font-bold text-lg`}>{item.data}</p>
                <p className="font-semibold text-gray-600">{item.title}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardTitle className="text-sm font-semibold px-5 flex justify-between items-center">
            <p className="font-bold">
              <Activity className="inline-block w-4 h-4 -mt-1 text-primary" />{" "}
              Analytics
            </p>
          </CardTitle>

          <CardContent className="flex justify-around">
            {Analytics.map((item, idx) => (
              <div
                className={`bg-gray-100 w-[20%] flex flex-col items-center p-3 rounded-md`}
                key={idx}
              >
                <p className={`${item.data} font-bold text-lg text-primary`}>
                  {item.data}
                </p>
                <p className="font-semibold text-gray-600">{item.title}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default UserSection;
