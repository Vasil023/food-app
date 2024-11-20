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
    <div class="mb-24" v-if="searchRecipeStore.resulSearch">
      <div class="mb-4">
        <img
          class="m-auto h-full object-contain rounded-lg"
          :src="searchRecipeStore.resulSearch.image"
          alt="Image"
        />
      </div>
      <div v-html="searchRecipeStore.resulSearch.summary"></div>

      <div class="mt-4">
        <h3>Кроки</h3>
        <ol class="grid gap-3 mt-3">
          <li v-for="item in searchRecipeStore.resulSearch?.analyzedInstructions[0]?.steps" :key="item.id">
            {{ item.step }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
