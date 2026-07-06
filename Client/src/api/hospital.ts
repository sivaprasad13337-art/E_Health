import apiClient from "@/lib/api-client";
import { useFlareStore } from "@/zustand";
import { useHospitalStore } from "@/zustand/hospital";

export const getPatient = async (id: number) => {
  try {
    const response = await apiClient.get(`/hospital/patient/get/${id}`);
    console.log("====================================");
    console.log(response.data);
    console.log("====================================");

    if (response.status === 200) {
      const { setPatient } = useHospitalStore.getState();

      setPatient(response.data);
    }

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const updatePatient = async (id: number, payload: object) => {
  try {
    const response = await apiClient.patch(
      `/hospital/patient/update/${id}`,
      payload,
    );

    // console.log("====================================");
    // console.log(response.data);
    // console.log("====================================");

    if (response.status === 200) {
      const { setPatient } = useHospitalStore.getState();

      setPatient(response.data);
    }

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getDoctors = async () => {
  try {
    const response = await apiClient.get("/hospital/doctor/get/");

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// export const getPatientsByDoctor = async (id: number) => {
//   try {
//     const response = await apiClient.get(`/hospital/doctor/get-by-patients/${id}`);

//     return response.data;
//   } catch (err) {
//     console.error(err);
//   }
// };

export const getDoctor = async (id: number) => {
  try {
    const response = await apiClient.get(`/hospital/doctor/get-by-uid/${id}`);

    if (response.status === 200) {
      const { setDoctor } = useHospitalStore.getState();

      setDoctor(response.data);
    }

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getDoctorByDocID = async (id: number) => {
  try {
    const response = await apiClient.get(`/hospital/doctor/get/${id}`);

    // if (response.status === 200) {
    //   const { setDoctor } = useHospitalStore.getState();

    //   setDoctor(response.data);
    // }

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateDoctorAvailability = async (id: number) => {
  try {
    const response = await apiClient.patch(
      `/hospital/doctor/update-availability/${id}`,
      {},
      // {
      //   headers: {
      //     "X-CSRFToken": document.cookie
      //       .split("; ")
      //       .find((c) => c.startsWith("csrftoken="))
      //       ?.split("=")[1],
      //   },
      // },
    );

    if (response.status === 200) {
      const { setDoctor } = useHospitalStore.getState();

      setDoctor(response.data);
    }
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const approveDoctorRoleRequest = async (id: number) => {
  try {
    const response = await apiClient.patch(
      `/hospital/doctor/approve-role-request/${id}`,
      {},
    );

    if (response.status === 200) {
      const { setLoading } = useFlareStore.getState();

      setLoading(true);
    }

    return response.data;
  } catch (err) {
    console.error(err);
  }
};
// doctor/reject-role-request/

export const rejectDoctorRoleRequest = async (id: number) => {
  try {
    const response = await apiClient.patch(
      `/hospital/doctor/reject-role-request/${id}`,
      {},
    );

    if (response.status === 200) {
      const { setLoading } = useFlareStore.getState();

      setLoading(true);
    }

    return response.data;
  } catch (err) {
    console.error(err);
  }
};
