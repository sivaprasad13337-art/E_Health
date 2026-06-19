import Rating from "@/components/ratings-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import {
  BookmarkMinus,
  CalendarDays,
  Languages,
  MapPin,
  Verified,
} from "lucide-react";
import type { Doctor } from "../interface/interface";
import { Link } from "react-router-dom";
import { doctorProfile } from "@/data/paths";
// ("@radix-ui/react-icons");

// interface Doctor {
//   name: string;
//   qualification: string;
//   specialization: string;
//   department: string;
//   languages: [];
//   address: string;
//   experience: number;
//   fee: string;
//   availability: boolean;
//   ratings: string;
// }

// const doctors = [
//   {
//     name: "Dr. Charles Scott",
//     qualification: "MBBS, DNB",
//     specialization: "Neurologist",
//     department: "Neurology",
//     languages: ["English", "French"],
//     address: "Hamshire, TX",
//     experience: "20",
//     fee: "1050",
//     availability: true,
//     ratings: "5.0",
//   },
// ];

const specializations = [
  { specialization: "Neurologist", color: "text-green-600" },
  { specialization: "Cardiologist", color: "text-red-600" },
  { specialization: "Psychologist", color: "text-sky-600" },
  { specialization: "Pediatrician", color: "text-purple-600" },
  { specialization: "Neurologist", color: "text-red-600" },
];

const CardFlat = ({ doctor }: { doctor: Doctor }) => {
  const color = specializations.find(
    (item) => item.specialization === doctor.specialization.name,
  );

  console.log("====================================");
  console.log(doctor);
  console.log("====================================");
  return (
    <section
      className="h-[15rem] w-[90%] bg-white rounded-2xl overflow-hidden flex my-6"
      key={doctor.id}
    >
      <Link
        to={doctorProfile}
        className="w-[28%] h-full bg-gray-300 p-0 relative"
      >
        <img
          src="https://doccure.dreamstechnologies.com/html/template/assets/img/doctor-grid/doctor-list-01.jpg"
          alt=""
          className="!w-[100%] h-[100%] object-cover hover:h-[120%] hover:w-[120%] transition-all"
        />

        <div className="w-full absolute top-4 flex justify-between px-5">
          <div className="mt-1">
            <Rating rating={doctor.rating} />
          </div>

          <Button className="p-2 w-[2.2rem] h-[2.2rem] bg-white rounded-full hover:bg-gray-100 hover:text-pink-600 cursor-pointer">
            <HeartFilledIcon className="text-gray-400 w-[1.2rem] h-[1.2rem]" />
          </Button>
        </div>
      </Link>

      <section className="w-[72%] h-full bg-pink-20 p-">
        <div className="flex justify-between p-4">
          <p className={`text-sm ${color?.color}`}>
            {doctor.specialization.name}
          </p>
          {doctor.availability ? (
            <Badge className="bg-green-100 text-green-600 px-3 font-normal">
              <span className="w-[5px] h-[5px] bg-green-600 rounded-full mt-0.5"></span>
              Available
            </Badge>
          ) : (
            <Badge className="bg-red-100 text-red-600 px-3 font-normal">
              <span className="w-[5px] h-[5px] bg-red-600 rounded-full mt-0.5"></span>
              Unavailable
            </Badge>
          )}
        </div>

        <Separator />

        <div className="p-4">
          <div className="flex gap-48">
            <div>
              <Link to={doctorProfile} className="font-bold hover:text-primary">
                Dr. {doctor.user.first_name} {doctor.user.last_name}
                <Verified className="w-[1.1rem] h-[1.1rem] inline-block text-green-600 -mt-1 ml-1" />
              </Link>
              <p className="text-gray-700 w-[100%">
                {doctor.education.map((item, idx) =>
                  idx < 2 ? <span>{item}, </span> : "",
                )}{" "}
                - {doctor.department.name}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <MapPin className="w-[1rem] h-[1rem] inline-block text-gray-500 -mt-1 mr-1" />
                {doctor.location}
              </p>
            </div>

            <div className="text-gray-600 text-sm w-[35%]">
              <p>
                <Languages className="w-[1rem] h-[1rem] inline-block text-gray-500 -mt-1 mr-1" />{" "}
                {doctor.languages.map((item) => (
                  <>
                    {item}
                    {", "}
                  </>
                ))}
              </p>
              <p className="mt-2">
                <BookmarkMinus className="w-[1rem] h-[1rem] inline-block text-gray-500 -mt-1 mr-1" />{" "}
                {doctor.experience} Years of Experience
              </p>
            </div>
          </div>

          {/*  */}
          <div className="flex justify-between items-center mt-6">
            <div>
              <p className="text-gray-700">Consultation Fee</p>
              <p className="text-2xl font-bold text-primary">
                {"\u20B9"}
                {doctor.consultation_fee}
              </p>
            </div>

            <Button className="py-6 px-6 rounded-4xl">
              <CalendarDays /> Book Appointment
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CardFlat;
