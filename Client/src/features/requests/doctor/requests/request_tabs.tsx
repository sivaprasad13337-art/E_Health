import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Pic from "@/components/Pic";
// import { useNavigate } from "react-router-dom";
import { getCloudinaryUrl } from "@/lib/utils";
import type { Doctor } from "@/types/hospital";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Eye, X } from "lucide-react";
import {
  approveDoctorRoleRequest,
  rejectDoctorRoleRequest,
} from "@/api/hospital";
import { useFlareStore } from "@/zustand";
import { Spinner } from "@/components/ui/spinner";

// const DateFormater = ({ date }: { date: string }) => {
//   const fDate = formatDateForBill(date).split(" ");

//   return (
//     <div className="text-center">
//       <p className="text-3xl font-bold">{fDate[1]}</p>
//       <p className="font-semibold">{fDate[2]}</p>
//       <p>{fDate[3]}</p>
//     </div>
//   );
// };

const verify = async (id: number) => {
  await approveDoctorRoleRequest(id);
};

const unVerify = async (id: number) => {
  await rejectDoctorRoleRequest(id);
};

const TabCard = ({ doctor }: { doctor: Doctor }) => {
  const { loading } = useFlareStore();
  // const navigate = useNavigate();

  return (
    <Card className="my-4 relative hover:outline-2 outline-primary rounded-md">
      <div
        className={`bg-${doctor.verification_status === "Pending" ? "yellow-500" : doctor.verification_status === "Verified" ? "blue-400" : doctor.verification_status === "Rejected" ? "red-500" : ""} h-full w-2 absolute top-0 left-0`}
      ></div>
      <CardContent className="text-sm text-muted-foreground flex items-center justify-between">
        <section className="flex gap-6 items-center">
          <Pic
            img={getCloudinaryUrl(doctor.user.profile_img)}
            className="w-10 h-10"
          />

          <div>
            <p className="text-lg font-bold">
              Dr. {doctor.user.first_name} {doctor.user.first_name}
            </p>
            <p className="text-xs">#DOC-00056</p>
            <p>{doctor.user.email}</p>
          </div>
        </section>

        <section className="flex gap-6 items-center">
          <div>
            <p className="text-lg font-semibold">{doctor.department?.name}</p>
            <p>{doctor.location}</p>
            <p className="font-bold">{doctor.experience} Yrs Exp</p>
          </div>
        </section>

        <section className="flex gap-2 items-center">
          <Badge
            className={`bg-${doctor.verification_status === "Verified" ? "green-200" : doctor.verification_status === "Pending" ? "yello-200" : "red-200"} text-${doctor.verification_status === "Verified" ? "green-600" : doctor.verification_status === "Pending" ? "yello-600" : "red-600"} p-3`}
          >
            <div
              className={`w-2 h-2 rounded-full bg-${doctor.verification_status === "Verified" ? "green-600" : doctor.verification_status === "Pending" ? "yello-600" : "red-600"}`}
            ></div>
            {doctor.verification_status}
          </Badge>

          <Button className="bg-gray-200 text-gray-700 border border-black hover:bg-gray-600 hover:text-gray-50 cursor-pointer rounded-sm">
            <Eye className="mt-0.5" /> Review
          </Button>

          {doctor.verification_status === "Verified" &&
            doctor.user.is_verified && (
              <Button
                className="text-red-600 bg-red-200 hover:bg-red-300 cursor-pointer rounded-sm"
                onClick={() => unVerify(doctor.id)}
              >
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    <X className="mt-0.5" /> Unverify
                  </>
                )}
              </Button>
            )}

          {doctor.verification_status === "Rejected" &&
            !doctor.user.is_verified && (
              <Button
                className="bg-primary hover:bg-primary/90 cursor-pointer rounded-sm"
                onClick={() => verify(doctor.id)}
              >
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    <Check className="mt-0.5" /> Verify
                  </>
                )}
              </Button>
            )}

          {doctor.verification_status === "Pending" &&
            !doctor.user.is_verified && (
              <Button
                className="bg-primary hover:bg-primary/90 cursor-pointer rounded-sm"
                onClick={() => verify(doctor.id)}
              >
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    <Check className="mt-0.5" /> Verify
                  </>
                )}
              </Button>
            )}

          <Button className="text-red-600 bg-red-200 hover:bg-red-300 cursor-pointer rounded-sm">
            <X />
          </Button>
        </section>
      </CardContent>
    </Card>
  );
};

const RequestTabs = ({ doctors }: { doctors: Doctor[] }) => {
  console.log("====================================");
  console.log(doctors);
  console.log("====================================");
  const Verified = doctors.filter(
    (doctor) =>
      doctor.verification_status === "Verified" && doctor.user.is_verified,
  );

  const Pending = doctors.filter(
    (doctor) =>
      doctor.verification_status === "Pending" && !doctor.user.is_verified,
  );

  const Rejected = doctors.filter(
    (doctor) =>
      doctor.verification_status === "Rejected" && !doctor.user.is_verified,
  );

  return (
    <Tabs defaultValue="All" className="w-full">
      <TabsList className="bg-gray-200 w-[50%]">
        <TabsTrigger value="All">
          All{" "}
          <span className="bg-white/10 px-2 rounded-2xl font-semibold">
            {doctors.length}
          </span>
        </TabsTrigger>
        <TabsTrigger value="Pending">
          Pending{" "}
          <span className="bg-white/10 px-2 rounded-2xl font-semibold">
            {Pending.length}
          </span>
        </TabsTrigger>

        <TabsTrigger value="Verified">
          Verified{" "}
          <span className="bg-white/10 px-2 rounded-2xl font-semibold">
            {Verified.length}
          </span>
        </TabsTrigger>

        <TabsTrigger value="Rejected">
          Rejected{" "}
          <span className="bg-white/10 px-2 rounded-2xl font-semibold">
            {Rejected.length}
          </span>
        </TabsTrigger>
      </TabsList>

      {/*  */}
      <TabsContent value="All">
        <section>
          {doctors.length ? (
            doctors.map((doctor) => <TabCard doctor={doctor} />)
          ) : (
            <div className="min-h-[50vh] flex justify-center items-center">
              <p className="text-lg font-semibold text-gray-500">
                No doctors added
              </p>
            </div>
          )}{" "}
        </section>
      </TabsContent>

      {/* Upcoming */}
      <TabsContent value="Pending">
        <section>
          {Pending.length ? (
            Pending.map((doctor) => <TabCard doctor={doctor} />)
          ) : (
            <div className="min-h-[50vh] flex justify-center items-center">
              <p className="text-lg font-semibold text-gray-500">
                No Pending Requests
              </p>
            </div>
          )}{" "}
        </section>
      </TabsContent>
      <TabsContent value="Verified">
        <section>
          {Verified.length ? (
            Verified.map((doctor) => <TabCard doctor={doctor} />)
          ) : (
            <div className="min-h-[50vh] flex justify-center items-center">
              <p className="text-lg font-semibold text-gray-500">
                No Verified Requests
              </p>
            </div>
          )}
        </section>
      </TabsContent>
      <TabsContent value="Rejected">
        <section>
          {Rejected.length ? (
            Rejected.map((doctor) => <TabCard doctor={doctor} />)
          ) : (
            <div className="min-h-[50vh] flex justify-center items-center">
              <p className="text-lg font-semibold text-gray-500">
                No Rejected Requests
              </p>
            </div>
          )}
        </section>
      </TabsContent>
    </Tabs>
  );
};

export default RequestTabs;
