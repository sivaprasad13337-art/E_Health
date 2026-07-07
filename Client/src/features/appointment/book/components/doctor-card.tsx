import Pic from "@/components/Pic";
import Rating from "@/components/ratings-block";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import type { CompsProps } from "../../interface/interface";
import { Link } from "react-router-dom";
import { browse_doctors } from "@/constants/paths";
import { useEffect, useState } from "react";
import { useAppointmentStore } from "@/zustand/appointment";
import type { Doctor } from "@/types/hospital";
import { getDoctorByDocID } from "@/api/hospital";
import { getCloudinaryUrl } from "@/lib/utils";

const DoctorCard = ({ error }: CompsProps) => {
  const [doctor, setDoctor] = useState<Doctor>();
  const { Appointment } = useAppointmentStore();

  useEffect(() => {
    const getDoctorById = async () => {
      const data: Doctor = await getDoctorByDocID(Appointment?.doctor);
      setDoctor(data);
    };

    getDoctorById();
  }, []);
  return doctor ? (
    <Card>
      <CardContent className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Pic
            // img="https://doccure.dreamstechnologies.com/html/template/assets/img/doctor-grid/doctor-list-01.jpg"
            img={getCloudinaryUrl(doctor.user.profile_img)}
            className="w-[7rem] h-[7rem]"
          />
          <div>
            <p className="text-lg font-semibold">
              Dr. {doctor?.user.first_name} {doctor?.user.last_name}{" "}
              <Rating rating={doctor.rating} />
            </p>
            <p className="text-sky-600">{doctor.specialization.name}</p>
            <p className="mt-1 text-gray-600">
              <MapPin className="inline-block w-[1.1rem] -mt-1" /> 5th Street -
              1011 W 5th St, Suite 120, Austin, TX 78703
            </p>
          </div>
        </div>

        <div>
          <Link to={browse_doctors} className="text-primary underline">
            Change Doctor
          </Link>
        </div>
      </CardContent>
    </Card>
  ) : (
    <Card>
      <CardContent className="">
        <p
          className={
            error.service
              ? "text-center text-lg text-destructive"
              : "text-center text-lg text-gray-500"
          }
        >
          It seems like you havent selected the doctor{" "}
          <Link to={browse_doctors} className="text-primary underline">
            Search Doctor
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
