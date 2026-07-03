import apiClient from "@/lib/api-client";

export const createSurgery = async (payload: object) => {
  try {
    const response = await apiClient.post(
      `appointment/surgery/create/`,
      payload,
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getSurgeries = async (id: number) => {
  try {
    const response = await apiClient.get(`appointment/surgery/get/${id}`);

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateSurgery = async (id: number, payload: object) => {
  try {
    const response = await apiClient.patch(
      `appointment/surgery/update/${id}`,
      payload,
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteSurgery = async (id: number) => {
  try {
    const response = await apiClient.patch(`appointment/surgery/delete/${id}`);

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

//Allergy
export const createAllergy = async (payload: object) => {
  try {
    const response = await apiClient.post(
      `appointment/allergy/create/`,
      payload,
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getAllergies = async (id: number) => {
  try {
    const response = await apiClient.get(`appointment/allergy/get/${id}`);

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateAllergy = async (id: number, payload: object) => {
  try {
    const response = await apiClient.patch(
      `appointment/allergy/update/${id}`,
      payload,
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteAllergy = async (id: number) => {
  try {
    const response = await apiClient.patch(`appointment/allergy/delete/${id}`);

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

//

export const createMedicalCondition = async (payload: object) => {
  try {
    const response = await apiClient.post(
      `appointment/medical-condition/create/`,
      payload,
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getMedicalConditions = async (id: number) => {
  try {
    const response = await apiClient.get(
      `appointment/medical-condition/get/${id}`,
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateMedicalCondition = async (id: number, payload: object) => {
  try {
    const response = await apiClient.patch(
      `appointment/medical-condition/update/${id}`,
      payload,
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteMedicalCondition = async (id: number) => {
  try {
    const response = await apiClient.patch(
      `appointment/medical-condition/delete/${id}`,
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

//Life Style

export const createLifeStyle = async (payload: object) => {
  try {
    const response = await apiClient.post(
      `appointment/life-style-habit/create/`,
      payload,
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getLifeStyle = async (id: number) => {
  try {
    const response = await apiClient.get(
      `appointment/life-style-habit/get/${id}`,
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateLifeStyle = async (id: number, payload: object) => {
  try {
    const response = await apiClient.patch(
      `appointment/life-style-habit/update/${id}`,
      payload,
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteLifeStyle = async (id: number) => {
  try {
    const response = await apiClient.patch(
      `appointment/life-style-habit/delete/${id}`,
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
};
