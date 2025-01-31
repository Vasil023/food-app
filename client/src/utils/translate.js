import { translateClient } from "@/api/axios";

export const translateText = async (text, source, target) => {
  try {
    const response = await translateClient.post(`${import.meta.env.VITE_API_URL_TRANSLATE}key=${import.meta.env.VITE_TRANSLATE_API_KEY}`,

      {
        q: text,
        source: source,
        target: target,
        format: "text",
      }
    );
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
