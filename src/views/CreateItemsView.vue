<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRecipeStore } from "@/stores/recipeStore";
import { useUserStore } from "@/stores/userStore";

// Оголошення змінних
const title = ref("");
const description = ref("");
const point = ref("");
const image = ref(null);
const imageUrl = ref("");
const error = ref(null);

const recipeStore = useRecipeStore();
const userStore = useUserStore();

const route = useRouter();

const onFileChange = (event) => {
  image.value = event.target.files[0] || null;

  const reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);

  reader.onload = () => {
    imageUrl.value = reader.result;
  };
};

const createRecipes = async () => {
  const formData = {
    title: title.value,
    description: description.value,
    point: point.value,
    isDone: false,
    isCooking: false,
    isChecked: false,
    user: userStore.userId,
  };

  if (image.value) {
    const reader = new FileReader();
    reader.readAsDataURL(image.value); // Перетворення зображення на Base64

    reader.onload = async () => {
      formData.image = reader.result; // Додаємо поле `image`, якщо є зображення
      await createRecipe(formData);
    };
  } else {
    await createRecipe(formData); // Відправляємо без `image`, якщо його немає
  }
};

const createRecipe = async (data) => {
  error.value = null;
  await recipeStore.addRecipe(data);

  if (recipeStore.error) {
    error.value = recipeStore.error;
    console.log("error", error.value);
  } else {
    route.push("/");
  }
};
</script>

<template>
  <div class="flex items-center justify-center mt-5 pb-10">
    <!-- Author: FormBold Team -->
    <div class="mx-auto w-full h-screen max-w-[550px] bg-white">
      <form class="py-4 px-5">
        <div class="mb-5">
          <label for="email" class="mb-2 block text-base font-medium text-[#07074D]"> Назва </label>

          <input
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 border rounded-md px-3 py-2"
            :class="{ 'border-red-500': error?.type === 'title' }"
            placeholder="Type here..."
            v-model="title"
          />
          <span v-if="error?.type === 'title'" class="text-red-500 text-xs mt-1">
            {{ error.message }}
          </span>
        </div>

        <div class="mb-5">
          <label for="email" class="mb-2 block text-base font-medium text-[#07074D]"> Опис </label>
          <input
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Type here..."
            v-model="description"
          />
        </div>

        <div class="mb-5">
          <label for="point" class="mb-2 block text-base font-medium text-[#07074D]"> Ціна </label>
          <input
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 border rounded-md px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow"
            :class="{ 'border-red-500': error?.type === 'point' }"
            type="number"
            placeholder="Type here..."
            v-model="point"
          />
          <span v-if="error?.type === 'point'" class="text-red-500 text-xs mt-1">
            {{ error.message }}
          </span>
        </div>

        <div class="mt-5 mb-5 w-full h-72 flex flex-col items-end gap-3 overflow-hidden" v-if="imageUrl">
          <span class="pi pi-times cursor-pointer" @click="imageUrl = ''"></span>

          <img :src="imageUrl" class="m-auto h-full object-contain rounded-lg" alt="Image" />
        </div>

        <div class="mb-6 pt-4" v-if="!imageUrl">
          <label class="mb-5 block text-base font-medium text-[#07074D]"> Загрузить зображення </label>
          <div class="mb-8">
            <label
              for="file"
              class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
            >
              <div>
                <span class="mb-2 block text-xl font-semibold text-[#07074D]"> Drop files here </span>
                <span class="mb-2 block text-base font-medium text-[#6B7280]"> Or </span>
                <span
                  class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
                >
                  Вибрати
                </span>
                <input type="file" @change="onFileChange" accept="image/*" id="file" class="file" />
              </div>
            </label>
          </div>
        </div>

        <div>
          <button @click.prevent="createRecipes" :class="{ disabled: recipeStore.isLoading }">
            <svg
              v-if="!recipeStore.isLoading"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>

            <i v-else class="pi pi-spin pi-spinner" style="font-size: 1.3rem"></i>
            <span class="ml-4">Створити</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
