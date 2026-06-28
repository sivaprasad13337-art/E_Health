import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ChartColumnBig } from "lucide-react";
import { Chart } from "./chart";

const WeeklySummaryCard = () => {
  const Data = [
    { title: "Appointments", data: 60 },
    { title: "Completed", data: 54 },
    { title: "Cancelled", data: 6 },
    { title: "Earnings", data: `\u20B9${60 * 960}` },
  ];
  return (
    <Card>
      <CardTitle className="px-4">
        <ChartColumnBig className="icon-text text-primary" /> This week
      </CardTitle>
      <CardContent>
        <section className="flex flex-wrap gap-6">
          {Data.map((item, idx) => (
            <div className="p-4 bg-gray-100 rounded-lg w-[45%]" key={idx}>
              <p className="text-lg font-bold">{item.data}</p>
              <p className="text-gray-600 font-semibold">{item.title}</p>
            </div>
          ))}
        </section>

        <section className="">
          <Chart />
        </section>
      </CardContent>
    </Card>
  );
};

export default WeeklySummaryCard;
