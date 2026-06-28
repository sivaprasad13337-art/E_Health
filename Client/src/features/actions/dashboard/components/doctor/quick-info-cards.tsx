import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
// import { ArrowUp } from "lucide-react";
import type React from "react";

interface QuickInfoCardsPrps {
  title: string;
  icon: React.ElementType;
  content: number;
  description: string;
  bg: string;
  iconText: string;
}
const QuickInfoCards = ({ card }: { card: QuickInfoCardsPrps }) => {
  return (
    <Card className="py- w-[33.33%]">
      <CardContent className="flex justify-between items-start">
        <section className="">
          <div
            className={`w-10 h-10 rounded-md bg-${card.bg} text-${card.iconText} flex justify-center items-center`}
          >
            <card.icon />
          </div>

          <p className="text-4xl font-bold ml-2">{card.content}</p>
          <p className="text-gray-600 font-semibold">{card.title}</p>
        </section>

        <Badge className="bg-teal-100 text-primary">{card.description}</Badge>
      </CardContent>
    </Card>
  );
};

export default QuickInfoCards;
