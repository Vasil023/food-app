import { apiFindIngredients } from "./axios";
import { translateText } from "@/utils/translate";

export const findByIngridients = async (ingridients) => {
  const translatedIngredient = await translateText(ingridients, "uk", "en");

  try {
    const response = await apiFindIngredients.get(`findByIngredients?ingredients=${translatedIngredient}&apiKey=a090bf50a6714a89a85dff9f385215ff&number=50`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products', error);
    return error;
  }
};

export const getRecipeById = async (id) => {
  try {
    const response = await apiFindIngredients.get(`${id}/information?apiKey=a090bf50a6714a89a85dff9f385215ff`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products', error);
    return error;
  }
}