<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSearchRecipeStore } from "@/stores/searchRecipe";

import SpinerIcon from "@/components/Spiner-icon.vue";

const searchRecipeStore = useSearchRecipeStore();

const route = useRoute();

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
          class="m-auto h-[370px] object-cover rounded-lg"
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
    <SpinerIcon v-if="searchRecipeStore.isLoading" />
  </div>
</template>
