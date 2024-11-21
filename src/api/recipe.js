import { apiClient } from "./axios";

const NAME = "recipes/get-all";
const CREATE = "recipes/create";
const UPDATE = "recipes/update";

export const createRecipe = async ({ ...args }) => {
  try {
    const response = await apiClient.post(CREATE, { ...args });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products', error);
    return error;
  }
};

export const getAllRecipe = async () => {
  try {
    const response = await apiClient.get(NAME);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products', error);
    return error;
  }
};

export const updateRecipe = async (id, updatedFields) => {
  console.log('updatedFields', updatedFields);
  try {
    const response = await apiClient.put(`${UPDATE}/${id}`, updatedFields);
    return response.data;
  } catch (error) {
    console.error('Failed to update recipe', error);
    throw error;
  }
};


