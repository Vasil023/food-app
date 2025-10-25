import { apiFindIngredients } from "./axios";
import { translateText } from "@/utils/translate";

const KEY = import.meta.env.VITE_API_URL_FIND_INGREDIENTS_KEY;

export const findByIngridients = async (ingridients) => {
  const translatedIngredient = await translateText(ingridients, "uk", "en");

  try {
    const response = await apiFindIngredients.get(`findByIngredients?ingredients=${translatedIngredient}&apiKey=${KEY}&number=50`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products', error);
    return error;
  }
};

export const getRecipeById = async (id) => {
  try {
    const response = await apiFindIngredients.get(`${id}/information?apiKey=${KEY}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products', error);
    return error;
  }
}