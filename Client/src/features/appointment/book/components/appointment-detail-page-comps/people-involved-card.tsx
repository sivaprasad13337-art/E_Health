import Pic from "@/components/Pic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCloudinaryUrl } from "@/lib/utils";
import type { Doctor, Patient } from "@/types/hospital";
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
interface PeopleInvolvedProps {
  patient: Patient;
  doctor: Doctor;
}
const PeopleInvolved = ({ patient, doctor }: PeopleInvolvedProps) => {
  const Patient = {
    name: `${patient.user.first_name} ${patient.user.last_name}`,
    profile_img: patient.user.profile_img,
    age: patient.age,
    gender: patient.gender,
    pat_id: "PAT-00421",
    phone: patient.user.phone,
    email: patient.user.email,
    location: "Chennai, Tamil Nadu",
    blood_group: patient.blood_group,
    allergies: [
      { allergy: "Penicillin", severity: "", note: "" },
      { allergy: "Dust", severity: "", note: "" },
      { allergy: "ShelFish", severity: "", note: "" },
    ],
    conditions: [{ condition: "Hypertension" }, { condition: "Asthma" }],
  };

  const Doctor = {
    name: `${doctor.user.first_name} ${doctor.user.last_name}`,
    profile_img: doctor.user.profile_img,
    experience: doctor.experience,
    doc_id: "DOC-00105",
    email: doctor.user.email,
    location: "Apollo Hospital, Chennai",
    consultation_fee: 1000,
    department: doctor.department.name,
    specialization: doctor.specialization.name,
    rating: doctor.rating,
    is_verified: doctor.user.is_verified,
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
              <Pic
                img={getCloudinaryUrl(Patient.profile_img)}
                className="w-16 h-16"
              />
              <div>
                <p className="font-bold">{Patient.name}</p>
                <p className="text-sm font-semibold text-gray-600">
                  {Patient.age} yrs · {Patient.gender} · #{Patient.pat_id}
                </p>
              </div>
            </div>

            <Badge className="px-5 py-3 text-sky-600 bg-sky-100">Patient</Badge>
          </CardTitle>

          <CardContent>
            <section>
              <Badge className="bg-red-100 text-red-600 px-5 py-3">
                🩸 {Patient.blood_group}
              </Badge>

              {Patient.allergies.map((item) => (
                <Badge className="px-5 py-3 bg-yellow-50 text-yellow-500 mx-2">
                  <AlertTriangle /> {item.allergy}
                </Badge>
              ))}

              {Patient.conditions.map((item) => (
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
                  {Patient.email}
                </p>
              </div>
              <Separator className="my-1 bg-gray-300" />

              <div className="flex justify-between mt-3">
                <p className="font-semibold">
                  <Phone className="icon-text text-primary" /> Phone
                </p>
                <p className="text-gray-700 font-semibold w-[60%]">
                  {Patient.phone}
                </p>
              </div>
              <Separator className="my-1 bg-gray-300" />

              <div className="flex justify-between mt-3">
                <p className="font-semibold">
                  <MapPin className="icon-text text-primary" /> Location
                </p>
                <p className="text-gray-700 font-semibold w-[60%]">
                  {Patient.location}
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
              <Pic
                img={getCloudinaryUrl(Doctor.profile_img)}
                className="w-16 h-16"
              />
              <div>
                <p className="font-bold">{Doctor.name}</p>
                <p className="text-sm font-semibold text-gray-600">
                  {Doctor.specialization} · {Doctor.experience} yrs · #
                  {Doctor.doc_id}
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
                {Doctor.department}
              </Badge>

              {Doctor.is_verified ? (
                <Badge className="bg-sky-100 text-sky-600 px-5 py-3 mx-2">
                  <BadgeCheck /> Verified
                </Badge>
              ) : null}

              <Badge className="bg-yellow-100 text-yellow-600 px-5 py-3">
                {Doctor.rating}
              </Badge>
            </section>

            <section className="mt-8 m-3">
              <div className="flex justify-between mt-3">
                <p className="font-semibold">
                  <Mail className="icon-text text-primary" /> Email
                </p>
                <p className="text-gray-700 font-semibold w-[60%]">
                  {Doctor.email}
                </p>
              </div>
              <Separator className="my-1 bg-gray-300" />

              <div className="flex justify-between mt-3">
                <p className="font-semibold">
                  <Building className="icon-text text-primary" /> Hospital
                </p>
                <p className="text-gray-700 font-semibold w-[60%]">
                  {Doctor.location}
                </p>
              </div>
              <Separator className="my-1 bg-gray-300" />

              <div className="flex justify-between mt-3">
                <p className="font-semibold">
                  <BadgeCent className="icon-text text-primary" /> Fee
                </p>
                <p className="text-gray-700 font-semibold w-[60%]">
                  {Doctor.consultation_fee}
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
