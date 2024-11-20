import { translateClient } from "@/api/axios";

// export const translateText = async (text, targetLanguage) => {
//   const apiKey = import.meta.env.VITE_TRANSLATE_API_KEY; // Ваш ключ
//   const url = import.meta.env.VITE_API_URL_TRANSLAT; // URL API

//   try {
//     const response = await translateClient.post(
//       url,
//       new URLSearchParams({
//         text: text, // Текст для перекладу
//         target_lang: targetLanguage.toUpperCase(), // Напр., "EN", "FR", "DE"
//       }).toString(), // Перетворення в URL-encoded формат
//       {
//         headers: {
//           Authorization: `DeepL-Auth-Key ${apiKey}`, // Заголовок авторизації
//           "Content-Type": "application/x-www-form-urlencoded", // Тип контенту
//         },
//       }
//     );
//     return response.data.translations[0].text;
//   } catch (error) {
//     console.error("Помилка перекладу:", error.response?.data || error.message);
//     return null;
//   }
// };

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
