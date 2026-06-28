import Pic from "@/components/Pic";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { patients } from "@/data/paths";
import { ArrowRight, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const RecentPatientsCard = () => {
  const navigate = useNavigate();
  const Patients = [
    { name: "Alex Kumar", age: 28, reason: "Chek-up", day: "Today" },
    { name: "Raj Kumar", age: 40, reason: "Hypertension ", day: "Yesterday" },
    { name: "Priya Sharma", age: 30, reason: "Chest pain ", day: "Yesterday" },
  ];
  return (
    <Card className="mt-6">
      <CardTitle className="flex justify-between items-center px-4">
        <p className="font-semibold">
          <Users className="icon-text text-primary" /> Recent Patients
        </p>

        <Link to={patients} className="text-primary">
          View all <ArrowRight className="icon-text" />
        </Link>
      </CardTitle>

      <CardContent>
        {Patients.map((patient, idx) => (
          <Card
            className="bg-gray-100 shadow-none px-4 py-6 cursor-pointer my-4 hover:outline-2 outline-primary"
            onClick={() => navigate(`${patients}`)}
            key={idx}
          >
            <CardContent className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <Pic img="" className="w-12 h-12" />

                <div>
                  <p className="font-bold">{patient.name}</p>
                  <p className="text-gray-600">
                    {patient.age} yrs · {patient.reason}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 font-semibold">{patient.day}</p>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentPatientsCard;
