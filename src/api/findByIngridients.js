import { apiFindIngredients, translateClient } from "./axios";

const translateIngredient = async (ingredient) => {
  try {
    const response = await translateClient.post(`${import.meta.env.VITE_API_URL_TRANSLATE}key=${import.meta.env.VITE_TRANSLATE_API_KEY}`,

      {
        q: ingredient,
        source: "uk",
        target: "en",
        format: "text",
      }
    );
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const findByIngridients = async (ingridients) => {
  const translatedIngredient = await translateIngredient(ingridients);
  console.log('translatedIngredient', translatedIngredient);
  try {
    const response = await apiFindIngredients.get(`?ingredients=${translatedIngredient}&apiKey=a090bf50a6714a89a85dff9f385215ff&number=50`);
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products', error);
    return error;
  }
};