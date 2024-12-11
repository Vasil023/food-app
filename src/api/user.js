import { apiClient } from "./axios";

const REGISTER = "/api/auth/register";
const LOGIN = "/api/auth/login";
const UPDATE = "/api/auth/update-point";
const GET_USER = "/api/auth/get-user";

export const register = async (email, nickname, password, role) => {
  try {
    const response = await apiClient.post(REGISTER, { email, nickname, password, role });
    return response?.data;
  } catch (error) {
    console.error('Failed to fetch products', error.response?.data.errors);
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
    console.log('id', id);
    const response = await apiClient.get(GET_USER, { id });
    return response?.data;
  } catch (error) {
    console.log('Failed to fetch products', error);
    return error
  }
};

export const updatePoint = async (point, userId) => {
  try {
    const response = await apiClient.patch(`${UPDATE}/${userId}`, { point, userId });
    return response?.data;
  } catch (error) {
    console.log('Failed to fetch products', error);
    return error
  }
};