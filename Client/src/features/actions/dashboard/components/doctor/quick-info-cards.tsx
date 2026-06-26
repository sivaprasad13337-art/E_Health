import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, CalendarCheck2 } from "lucide-react";

const QuickInfoCards = () => {
  return (
    <Card className="py- w-[33.33%]">
      <CardContent className="flex justify-between items-start">
        <section className="">
          <div className="w-10 h-10 rounded-md bg-blue-100 text-blue-600 flex justify-center items-center">
            <CalendarCheck2 />
          </div>

          <p className="text-4xl font-bold ml-2">6</p>
          <p className="text-gray-600 font-semibold">Today's appointments</p>
        </section>

        <Badge className="bg-teal-100 text-primary">
          <ArrowUp className="mt-0.5" /> 3
        </Badge>
      </CardContent>
    </Card>
  );
};

export default QuickInfoCards;
