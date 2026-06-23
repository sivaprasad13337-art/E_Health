import Pic from "@/components/Pic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { medicalHistory_form } from "@/data/paths";
import {
  Mars,
  Stethoscope,
  TriangleAlert,
  Venus,
  VenusAndMars,
} from "lucide-react";
import { Link } from "react-router-dom";

const PatientCard = () => {
  const patient = {
    age: 28,
    sex: "Male",
    dob: "14 Mar 1998",
    pat_id: "PAT-00421",
    bloog_grp: "B+ve",
    allergies: ["Penicillin", "Dust"],
    medicalConditions: ["Hypertension", "Asthma"],
  };

  return (
    <Card>
      <CardContent className="flex justify-between items-center">
        <section className="flex item-center gap-6">
          <Pic img="https://github.com/shadcn.png" className="w-24 h-24" />

          <section>
            <h1 className="text-xl font-bold">
              Jhon Doe{" "}
              {patient.sex === "Male" ? (
                <Mars className="inline-block text-blue-500 w-[1.2rem] h-[1.2rem] -mt-0.5" />
              ) : patient.sex === "Female" ? (
                <Venus className="inline-block text-pink-500 w-[1.2rem] h-[1.2rem] -mt-0.5" />
              ) : (
                <VenusAndMars className="inline-block text-purple-500 w-[1.2rem] h-[1.2rem] -mt-0.5" />
              )}
            </h1>

            <div className="flex gap-2 items-center">
              <p className="text-gray-500 font-semibold">{patient.age} Yrs</p>
              <Separator
                orientation="vertical"
                className="h-4 mt-1.5 bg-gray-500"
              />

              <p className="text-gray-500 font-semibold">{patient.sex}</p>
              <Separator
                orientation="vertical"
                className="h-4 mt-1.5 bg-gray-500"
              />

              <p className="text-gray-500 font-semibold">DOB: {patient.dob}</p>
              <Separator
                orientation="vertical"
                className="h-4 mt-1.5 bg-gray-500"
              />

              <p className="text-gray-500 font-semibold">
                Patient ID: #{patient.pat_id}
              </p>
              {/* <Separator
              orientation="vertical"
              className="h-[1rem] mt-1.5 bg-gray-500"
            /> */}
            </div>

            <div className="mt-2 flex gap-2">
              <Badge className="py-3 bg-red-100 text-red-500 font-semibold">
                Blood: {patient.bloog_grp}
              </Badge>

              {patient.allergies.map((item) => (
                <Badge
                  className="py-3 bg-orange-100 text-orange-600 font-semibold"
                  key={item}
                >
                  <TriangleAlert /> {item} allergy
                </Badge>
              ))}

              {patient.medicalConditions.map((item) => (
                <Badge
                  className="py-3 bg-purple-100 text-purple-400 font-semibold"
                  key={item}
                >
                  <Stethoscope /> {item}
                </Badge>
              ))}
            </div>
          </section>
        </section>

        <Link
          to={medicalHistory_form}
          className="block bg-primary text-white font-semibold py-3 px-7 rounded-sm"
        >
          Edit
        </Link>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
