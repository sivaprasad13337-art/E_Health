import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Beer,
  Cigarette,
  HeartHandshake,
  Pill,
  SportShoe,
  Stethoscope,
  TriangleAlert,
  UtensilsCrossed,
} from "lucide-react";

type ConditionType = {
  name: string;
  since: string;
  note: string;
};

type SurgeryTpe = {
  name: string;
  date: string;
  complication: string;
  hospital: string;
};

const SurgeryCard = ({ surgery }: { surgery: SurgeryTpe }) => {
  return (
    <div className="bg-gray-100 my-4 p-4 rounded-sm flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <div className="bg-gray-200 w-10 h-10 rounded-md"></div>
        <div>
          <h2 className="font-bold text-gray-800">{surgery.complication}</h2>
          <p className="text-gray-500 font-semibold">
            {surgery.hospital} · {surgery.name}
          </p>
        </div>
      </div>

      <p className="mt-2 text-gray-500 font-semibold">{surgery.date}</p>
    </div>
  );
};

const ConditionCard = ({ condition }: { condition: ConditionType }) => {
  return (
    <div className="bg-gray-100 my-4 p-4 rounded-sm">
      <div className="flex justify-between">
        <h2 className="font-bold text-gray-800">{condition.name}</h2>
        <p className="text-gray-500">{condition.since}</p>
      </div>

      <p className="mt-2 text-gray-500 font-semibold">{condition.note}</p>
    </div>
  );
};

const Conditions = [
  {
    name: "Hypertension (Stage 1)",
    since: "Since 2021",
    note: "On medication · Amlodipine 5mg",
  },
  {
    name: "Bronchial Asthma",
    since: "Since 2017",
    note: "Intermittent · Inhaler as needed",
  },
  {
    name: "Pre-diabetic",
    since: "Since 2023",
    note: "Diet-controlled · Under monitoring",
  },
];

const Surgeries = [
  {
    name: "Laparoscopic",
    date: "2019",
    complication: "Appendectomy",
    hospital: "Apollo Hospital",
  },
  {
    name: " FESS surgery",
    date: "2022",
    complication: "Deviated nasal septum",
    hospital: "Fortis Hospital",
  },
];

const Allergies = [
  { name: "Penicillin", note: "Severe — anaphylaxis risk", effect: "High" },
  { name: "Dust / pollen", note: "Triggers asthma episodes", effect: "Mod" },
  {
    name: "Shellfish",
    note: "Mild rash · antihistamine needed",
    effect: "Low",
  },
];

const Lifestyle = [
  { name: "Smoking", status: "NO", icon: Cigarette },
  { name: "Alcohol", status: "Occasional", icon: Beer },
  { name: "Exercise", status: "3x/week", icon: SportShoe },
  { name: "Diet", status: "Vegetarian", icon: UtensilsCrossed },
  { name: "Sleep", status: "7–8 hrs", icon: Cigarette },
  { name: "Medication", status: "Active", icon: Pill },
];
const ConditionsAndSurgeries = () => {
  return (
    <section>
      <p className="font-bold">Medical History</p>
      <p className="text-sm text-gray-600 font-semibold">
        Underlying conditions, surgeries, allergies & lifestyle
      </p>

      <div className="flex gap-6 mt-4">
        {/* Conditions */}
        <Card className="w-[40%]">
          <CardHeader className="text-[1rem] font-semibold flex items-center">
            <Stethoscope className="w-4 h-4 text-primary" />
            Underlying conditions
          </CardHeader>

          <CardContent>
            {Conditions.map((item) => (
              <ConditionCard condition={item} key={item.name} />
            ))}
          </CardContent>
        </Card>

        {/* Surgeries */}

        <Card className="w-[60%]">
          <CardHeader className="text-[1rem] font-semibold flex items-center">
            Surgery History
          </CardHeader>

          <CardContent>
            {Surgeries.map((item) => (
              <SurgeryCard surgery={item} key={item.name} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/*  */}

      <div className="flex gap-6 mt-4">
        {/* Conditions */}
        <Card className="w-[40%]">
          <CardHeader className="text-[1rem] font-semibold flex items-center">
            <TriangleAlert className="w-4 h-4 text-destructive" />
            Underlying conditions
          </CardHeader>

          <CardContent>
            {Allergies.map((allergy) => (
              <div className="bg-gray-100 my-4 p-4 rounded-sm flex gap-2 items-center">
                <div
                  className={
                    allergy.effect === "High"
                      ? "w-4 h-4 bg-red-600 rounded-full"
                      : allergy.effect === "Mod"
                        ? "w-4 h-4 bg-yellow-500 rounded-full"
                        : "w-4 h-4 bg-sky-600 rounded-full"
                  }
                ></div>

                <div className="w-full">
                  <div className="flex justify-between">
                    <h2 className="font-bold text-gray-800">{allergy.name}</h2>
                    <p
                      className={
                        allergy.effect === "High"
                          ? "text-red-600"
                          : allergy.effect === "Mod"
                            ? "text-yellow-500"
                            : "text-sky-600"
                      }
                    >
                      {allergy.effect === "High" ? <TriangleAlert className="w-4 h-4 inline-block -mt-1"/> : ""}{" "}
                      {allergy.effect}
                    </p>
                  </div>

                  <p className="text-gray-500 font-semibold">{allergy.note}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Life Style */}

        <Card className="w-[60%]">
          <CardHeader className="text-[1rem] font-semibold flex items-center">
            <HeartHandshake className="w-4 h-4 text-sky-600" />
            Lifestyle & Habits
          </CardHeader>

          <CardContent className="flex justify-between flex-wrap">
            {Lifestyle.map((item) => (
              <div className="bg-gray-100 my-4 p-4 rounded-sm flex justify-between w-[49%]">
                <item.icon />
                <p className="font-semibold">{item.name}</p>

                <Badge className="bg-teal-200 text-primary font-semibold py-3 px-4">
                  {item.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ConditionsAndSurgeries;
