import ServiceCard from "../components/service-cards";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CustomSearchBar } from "@/components/custom-searchbar";
import { useEffect, useState } from "react";
import type { CompsProps, ServiceType } from "../../interface/interface";
import { getAllTests } from "@/api/services";

// const Services = [
//   {
//     id: 1,
//     name: "Echocardiogram",
//     shortName: "Echo",
//     price: "2500",
//     img: "https://trocaire.edu/academics/wp-content/uploads/sites/2/2021/08/PFI_Echocardiography_1200x600.jpg",
//   },
//   {
//     id: 2,
//     name: "Electrocardiogram",
//     shortName: "ECG",
//     price: "700",
//     img: "https://asianheartinstitute.org/wp-content/uploads/2024/04/Electrocardiogram-Vs-Electrocardiograph-1.webp",
//   },
//   {
//     id: 3,
//     name: "Treadmill Test",
//     shortName: "TMT",
//     price: "3500",
//     img: "https://arunacardiaccare.in/wp-content/uploads/2025/02/TMT.jpg",
//   },
//   {
//     id: 4,
//     name: "CT Scan",
//     shortName: "CT",
//     price: "5000",
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEU2ZNnXCZE4epv42oH6k98RCykz60sMnIQ&s",
//   },
//   {
//     id: 5,
//     name: "MRI Scan",
//     shortName: "MRI",
//     price: "10000",
//     img: "https://storage.googleapis.com/treatspace-prod-media/pracimg/u-2740/shutterstock_2323721305_1.jpeg",
//   },
// ];

// const DoctorCard = () => {
//   return (
//     <Card>
//       <CardContent className="flex gap-3 items-center">
//         <Pic
//           img="https://doccure.dreamstechnologies.com/html/template/assets/img/clients/client-15.jpg"
//           className="w-[7rem] h-[7rem]"
//         />
//         <div>
//           <p className="text-lg font-semibold">
//             Dr. Michael Brown <Rating rating={"5.0"} />
//           </p>
//           <p className="text-sky-600">Psychologist</p>
//           <p className="mt-1 text-gray-600">
//             <MapPin className="inline-block w-[1.1rem] -mt-1" /> 5th Street -
//             1011 W 5th St, Suite 120, Austin, TX 78703
//           </p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

const Service = ({ formData, setFormData }: CompsProps) => {
  const [input, SetInput] = useState("");
  const [data, setData] = useState<ServiceType[]>([]);

  useEffect(() => {
    const getServices = async () => {
      const data = await getAllTests();
      setData(data);
      // data.map((item) => {
      //   console.log("====================================");
      //   console.log(item.poster);
      //   console.log("====================================");
      // });
    };

    getServices();
  }, []);

  const handleSearch = (input: string) => {
    const services = data.filter(
      (item) =>
        item.name.toLowerCase().includes(input) ||
        item.short_name.toLowerCase().includes(input),
    );

    setData(services);
  };

  const handleService = (service: ServiceType) => {
    console.log("CLICKED", service.id, "CURRENT:", formData.services);

    setFormData((prev) => {
      const exists = prev.services.find((item) => item.id === service.id);
      // console.log("====================================");
      // console.log("exists: ", exists);
      // console.log("====================================");

      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s.id !== service.id)
          : [...prev.services, { test: service.name, id: service.id }],
      };
    });
  };

  return (
    <div>
      {/* <DoctorCard /> */}

      <div className="h-[4rem] w-[40%] bg-purple-00 mt-6">
        <CustomSearchBar
          data={input}
          setData={SetInput}
          handleFuntion={handleSearch}
        />
      </div>
      <ScrollArea className="w-full h-[17rem] ">
        <div className="h-[70%] flex flex-wrap gap-4">
          {data?.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => handleService(service)}
            />
          ))}
        </div>
      </ScrollArea>

      {/* <div className="w-full h-[22rem] bg-sky-200 flex overflow-y-auto flex-wrap">
        {Services.map((service) => (
          <ServiceCard service={service} />
        ))}
      </div> */}
    </div>
  );
};

export default Service;
