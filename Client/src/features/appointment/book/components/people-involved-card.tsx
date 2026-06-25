import Pic from "@/components/Pic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  BadgeCent,
  BadgeCheck,
  Building,
  Mail,
  MapPin,
  Phone,
  SquareArrowOutUpRight,
  Stethoscope,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const PeopleInvolved = () => {
  const patient = {
    name: "Alex Kumar",
    age: "28",
    gender: "Male",
    pat_id: "PAT-00421",
    phone: "+91 98765 43210",
    email: "alex@email.com",
    location: "Chennai, Tamil Nadu",
    blood_group: "B+",
    allergies: [
      { allergy: "Penicillin", severity: "", note: "" },
      { allergy: "Dust", severity: "", note: "" },
      { allergy: "ShelFish", severity: "", note: "" },
    ],
    conditions: [{ condition: "Hypertension" }, { condition: "Asthma" }],
  };

  const doctor = {
    name: "Meera Nair",
    experience: "14",
    doc_id: "DOC-00105",
    email: "meera@hospital.com",
    location: "Apollo Hospital, Chennai",
    consultation_fee: 1000,
    department: "Cardiology",
    specialization: "Cardiologist",
    rating: "4.9",
    is_verified: true,
  };
  return (
    <Card className="p-4">
      <CardTitle className="px-4">
        <Users className="icon-text text-primary" /> People involved
      </CardTitle>

      <CardContent className="flex justify-between">
        {/* Patient Card */}
        <Card className="w-[47%] p-4">
          <CardTitle className="flex justify-between px-4">
            <div className="flex gap-4 items-center">
              <Pic img="" className="w-16 h-16" />
              <div>
                <p className="font-bold">{patient.name}</p>
                <p className="text-sm font-semibold text-gray-600">
                  {patient.age} yrs · {patient.gender} · #{patient.pat_id}
                </p>
              </div>
            </div>

            <Badge className="px-5 py-3 text-sky-600 bg-sky-100">Patient</Badge>
          </CardTitle>

          <CardContent>
            <section>
              <Badge className="bg-red-100 text-red-600 px-5 py-3">
                🩸 {patient.blood_group}
              </Badge>

              {patient.allergies.map((item) => (
                <Badge className="px-5 py-3 bg-yellow-50 text-yellow-500 mx-2">
                  <AlertTriangle /> {item.allergy}
                </Badge>
              ))}

              {patient.conditions.map((item) => (
                <Badge className="px-5 py-3 bg-sky-100 text-sky-500 my-2 mr-2">
                  <Stethoscope /> {item.condition}
                </Badge>
              ))}
            </section>

            <section className="mt-8 m-3">
              <div className="flex justify-between mt-3">
                <p className="font-semibold">
                  <Mail className="icon-text text-primary" /> Email
                </p>
                <p className="text-gray-700 font-semibold w-[60%]">
                  {patient.email}
                </p>
              </div>
              <Separator className="my-1 bg-gray-300" />

              <div className="flex justify-between mt-3">
                <p className="font-semibold">
                  <Phone className="icon-text text-primary" /> Phone
                </p>
                <p className="text-gray-700 font-semibold w-[60%]">
                  {patient.phone}
                </p>
              </div>
              <Separator className="my-1 bg-gray-300" />

              <div className="flex justify-between mt-3">
                <p className="font-semibold">
                  <MapPin className="icon-text text-primary" /> Location
                </p>
                <p className="text-gray-700 font-semibold w-[60%]">
                  {doctor.location}
                </p>
              </div>
              <Separator className="my-1 bg-gray-300" />
            </section>

            <Link to={""} className="block text-primary mt-6 font-semibold">
              <SquareArrowOutUpRight className="icon-text" /> View full patient
              profile & medical history
            </Link>
          </CardContent>
        </Card>

        {/* Doctor Card */}
        <Card className="w-[47%] p-4">
          <CardTitle className="flex justify-between px-4">
            <div className="flex gap-4 items-center">
              <Pic img="" className="w-16 h-16" />
              <div>
                <p className="font-bold">{doctor.name}</p>
                <p className="text-sm font-semibold text-gray-600">
                  {doctor.specialization} · {doctor.experience} yrs · #
                  {doctor.doc_id}
                </p>
              </div>
            </div>

            <Badge className="px-5 py-3 text-purple-600 bg-purple-100">
              Doctor
            </Badge>
          </CardTitle>

          <CardContent>
            <section>
              <Badge className="bg-green-100 text-green-600 px-5 py-3">
                {doctor.department}
              </Badge>

              {doctor.is_verified ? (
                <Badge className="bg-sky-100 text-sky-600 px-5 py-3 mx-2">
                  <BadgeCheck /> Verified
                </Badge>
              ) : null}

              <Badge className="bg-yellow-100 text-yellow-600 px-5 py-3">
                {doctor.rating}
              </Badge>
            </section>

            <section className="mt-8 m-3">
              <div className="flex justify-between mt-3">
                <p className="font-semibold">
                  <Mail className="icon-text text-primary" /> Email
                </p>
                <p className="text-gray-700 font-semibold w-[60%]">
                  {doctor.email}
                </p>
              </div>
              <Separator className="my-1 bg-gray-300" />

              <div className="flex justify-between mt-3">
                <p className="font-semibold">
                  <Building className="icon-text text-primary" /> Hospital
                </p>
                <p className="text-gray-700 font-semibold w-[60%]">
                  {doctor.location}
                </p>
              </div>
              <Separator className="my-1 bg-gray-300" />

              <div className="flex justify-between mt-3">
                <p className="font-semibold">
                  <BadgeCent className="icon-text text-primary" /> Fee
                </p>
                <p className="text-gray-700 font-semibold w-[60%]">
                  {doctor.consultation_fee}
                </p>
              </div>
              <Separator className="my-1 bg-gray-300" />
            </section>

            <Link to={""} className="block text-primary mt-6 font-semibold">
              <SquareArrowOutUpRight className="icon-text" /> View full doctor
              profile
            </Link>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default PeopleInvolved;
