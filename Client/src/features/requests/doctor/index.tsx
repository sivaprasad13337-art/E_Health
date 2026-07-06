import { useEffect, useState } from "react";
import RequestTabs from "./requests/request_tabs";
import AppointmentFilterAndSearch from "./requests/filter-search";
import InfoCards from "./requests/info-cards";
import { getDoctors } from "@/api/hospital";
import type { Doctor } from "@/types/hospital";
import { useFlareStore } from "@/zustand";

const DoctorRequests = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const { loading, setLoading } = useFlareStore();

  useEffect(() => {
    const getDoctorsForRequests = async () => {
      const data = await getDoctors();
      setDoctors(data);
      setLoading(false);
    };

    getDoctorsForRequests();
  }, [loading]);

  return (
    <>
      <InfoCards doctors={doctors} />
      <AppointmentFilterAndSearch />
      <RequestTabs doctors={doctors} />
    </>
  );
};

export default DoctorRequests;
