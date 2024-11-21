<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSearchRecipeStore } from "@/stores/searchRecipe";

// import { translateIngredient } from "@/utils/translate";

const searchRecipeStore = useSearchRecipeStore();

const route = useRoute();

// const translateText = async (text) => {
//   const translatedText = await translateIngredient(text, "en", "uk");
//   return translatedText;
// };

onMounted(() => {
  const id = route.params.id;
  searchRecipeStore.fethRecipeById(id);
});
</script>

<template>
  <div class="container">
    <div class="mb-24" v-if="searchRecipeStore.resulSearch && !searchRecipeStore.isLoading">
      <div class="mb-4">
        <img
          class="m-auto h-full object-contain rounded-lg"
          :src="searchRecipeStore.resulSearch.image"
          alt="Image"
        />
      </div>
      <div v-html="searchRecipeStore.resulSearch.translateText"></div>

      <div class="mt-4">
        <h3>Кроки</h3>
        <ol class="grid gap-3 mt-3">
          <li v-for="item in searchRecipeStore.resulSearch.steps" :key="item.id">
            {{ item }}
          </li>
        </ol>
      </div>
    </div>

    <div v-if="searchRecipeStore.isLoading">
      <div class="grid place-items-center h-[calc(100vh-180px)]">
        <div class="grid place-items-center gap-4">
          <span class="pi pi-spin pi-spinner" style="font-size: 3rem; color: #5a382d"></span>
        </div>
      </div>
    </div>
  </div>
</template>
