import { getAllergies, getMedicalConditions } from "@/api/records";
import Pic from "@/components/Pic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { medicalHistory_form, writeMedicalReport } from "@/data/paths";
import { useHospitalStore } from "@/zustand/hospital";
import {
  Mars,
  Stethoscope,
  TriangleAlert,
  Venus,
  VenusAndMars,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Allergy, MedicalCondition } from "../interface";
import { getCloudinaryUrl } from "@/lib/utils";

type PatientCardAppointment = {
  apt_id: string;
  date: string;
  time: string;
  location: string;
  type: string;
};

interface PatientDetails {
  age: number;
  sex: string;
  dob: string;
  pat_id: string;
  bloog_grp: string;
  allergies: Allergy[];
  medicalConditions: MedicalCondition[];
}

const PatientCard = ({
  appointment,
}: {
  appointment?: PatientCardAppointment;
}) => {
  const { patient } = useHospitalStore();
  const [patientDetails, setPatientDetails] = useState<PatientDetails>({
    age: patient?.age || 0,
    sex: patient?.gender || "",
    dob: patient?.DOB || "",
    pat_id: "PAT-00421",
    bloog_grp: patient?.blood_group || "",
    allergies: [],
    medicalConditions: [],
  });

  const getMedicalConditionsBypatient = async () => {
    const data = await getMedicalConditions(patient?.id);
    if (data)
      setPatientDetails((prev) => ({ ...prev, medicalConditions: data }));
  };

  const getAllergiesBypatient = async () => {
    const data = await getAllergies(patient?.id);
    if (data) setPatientDetails((prev) => ({ ...prev, allergies: data }));
  };

  useEffect(() => {
    getMedicalConditionsBypatient();
    getAllergiesBypatient();
  }, []);

  return (
    <Card>
      <CardContent className="flex justify-between items-center">
        <section className="flex item-center gap-6">
          <Pic
            img={getCloudinaryUrl(patient?.user.profile_img)}
            className="w-24 h-24"
          />

          <section>
            <h1 className="text-xl font-bold">
              {patient?.user.first_name} {patient?.user.last_name}
              {patientDetails.sex === "Male" ? (
                <Mars className="inline-block text-blue-500 w-[1.2rem] h-[1.2rem] -mt-0.5" />
              ) : patientDetails.sex === "Female" ? (
                <Venus className="inline-block text-pink-500 w-[1.2rem] h-[1.2rem] -mt-0.5" />
              ) : (
                <VenusAndMars className="inline-block text-purple-500 w-[1.2rem] h-[1.2rem] -mt-0.5" />
              )}
            </h1>

            <div className="flex gap-2 items-center">
              <p className="text-gray-500 font-semibold">
                {patientDetails.age} Yrs
              </p>
              <Separator
                orientation="vertical"
                className="h-4 mt-1.5 bg-gray-500"
              />

              <p className="text-gray-500 font-semibold">
                {patientDetails.sex}
              </p>
              <Separator
                orientation="vertical"
                className="h-4 mt-1.5 bg-gray-500"
              />

              <p className="text-gray-500 font-semibold">
                DOB: {patientDetails.dob}
              </p>
              <Separator
                orientation="vertical"
                className="h-4 mt-1.5 bg-gray-500"
              />

              <p className="text-gray-500 font-semibold">
                patient ID: #{patientDetails.pat_id}
              </p>
              {/* <Separator
              orientation="vertical"
              className="h-[1rem] mt-1.5 bg-gray-500"
            /> */}
            </div>

            <div className="mt-2 flex gap-2">
              <Badge className="py-3 bg-red-100 text-red-500 font-semibold">
                Blood: {patientDetails.bloog_grp}
              </Badge>

              {patientDetails.allergies.map((item) => (
                <Badge
                  className="py-3 bg-orange-100 text-orange-600 font-semibold"
                  key={item.id}
                >
                  <TriangleAlert /> {item.allergy} allergy
                </Badge>
              ))}

              {patientDetails.medicalConditions.map((item) => (
                <Badge
                  className="py-3 bg-purple-100 text-purple-400 font-semibold"
                  key={item.id}
                >
                  <Stethoscope /> {item.condition}
                </Badge>
              ))}
            </div>
          </section>
        </section>

        {appointment ? (
          <div>
            <p className="text-primary font-semibold">#{appointment.apt_id}</p>
            <p className="text-gray-600 font-semibold">
              {appointment.date} · {appointment.time}
            </p>
            <p className="text-gray-600 font-semibold">
              {appointment.location} · {appointment.type}
            </p>
          </div>
        ) : (
          <Link
            to={medicalHistory_form}
            className="block bg-primary text-white font-semibold py-3 px-7 rounded-sm"
          >
            Edit
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientCard;
