import Pic from "@/components/Pic";
import Rating from "@/components/ratings-block";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import type { CompsProps } from "../../interface/interface";
import { Link } from "react-router-dom";
import { browse_doctors } from "@/data/paths";

const DoctorCard = ({ formData, error, setError }: CompsProps) => {
  return formData.doctor ? (
    <Card>
      <CardContent className="flex gap-3 items-center">
        <Pic
          img="https://doccure.dreamstechnologies.com/html/template/assets/img/doctor-grid/doctor-list-01.jpg"
          className="w-[7rem] h-[7rem]"
        />
        <div>
          <p className="text-lg font-semibold">
            Dr. Michael Brown <Rating rating={"5.0"} />
          </p>
          <p className="text-sky-600">Psychologist</p>
          <p className="mt-1 text-gray-600">
            <MapPin className="inline-block w-[1.1rem] -mt-1" /> 5th Street -
            1011 W 5th St, Suite 120, Austin, TX 78703
          </p>
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
