import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarCheck,
  FileText,
  ReceiptIndianRupeeIcon,
  Stethoscope,
} from "lucide-react";

const InfoCards = () => {
  const data = [
    {
      title: "Upcoming",
      icon: CalendarCheck,
      content: 3,
      description: "1 This Week",
      text: "text-green-700",
      iconText: "text-green-500",
    },
    {
      title: "Records",
      icon: FileText,
      content: 12,
      description: "Last Updated 2d ago",
      text: "",
      iconText: "text-sky-500",
    },
    {
      title: "Pending bills",
      icon: ReceiptIndianRupeeIcon,
      content: "₹840",
      description: "2 invoices due",
      text: "text-red-700",
      iconText: "text-amber-500",
    },
    {
      title: "Doctors",
      icon: Stethoscope,
      content: 4,
      description: "Across 3 specialties",
      text: "",
      iconText: "text-red-700",
    },
  ];
  return (
    <section className="my-4 flex justify-between w-[60%]">
      {data.map((item, idx) => (
        <Card
          className="bg-white shadow-md w-[9rem] h-[7rem] text-center"
          key={idx}
        >
          <CardContent>
            <p className="flex items-center justify-center gap-2">
              <item.icon className={`w-[1rem] h-[1rem] ${item.iconText}`} />{" "}
              <span className="block">{item.title}</span>
            </p>
            <p className="text-4xl font-bold">{item.content}</p>
            <p className={`text-xs mt-1 ${item.text}`}>{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default InfoCards;
