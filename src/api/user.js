import { apiClient } from "./axios";

const REGISTER = "/auth/register";
const LOGIN = "/auth/login";
const UPDATE = "/auth/update-point";
const GET_USER = "/auth/get-user";

export const register = async (email, password, role) => {
  try {
    const response = await apiClient.post(REGISTER, { email, password, role });
    return response?.data;
  } catch (error) {
    console.error('Failed to fetch products', error);
    return error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await apiClient.post(LOGIN, { email, password });
    return response?.data;
  } catch (error) {
    console.log('Failed to fetch products', error);
    return error
  }
};

export const getUser = async (id) => {
  try {
    const response = await apiClient.get(GET_USER, { id });
    return response?.data;
  } catch (error) {
    console.log('Failed to fetch products', error);
    return error
  }
};

export const updatePoint = async (id, point) => {
  try {
    const response = await apiClient.patch(`${UPDATE}/${id}`, { id, point });
    return response?.data;
  } catch (error) {
    console.log('Failed to fetch products', error);
    return error
  }
};