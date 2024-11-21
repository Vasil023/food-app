<script setup>
import { useRecipeStore } from "@/stores/recipeStore";
import recipeItem from "@/components/recipeItem.vue";

const recipeStore = useRecipeStore();
</script>

<template>
  <div class="container">
    <div
      class="columns-2 lg:columns-5 lg:gap-3 gap-2 pt-1 pb-20"
      v-if="recipeStore.recipes.length && !recipeStore.isLoading"
    >
      <recipeItem v-for="item in recipeStore.recipes" :item="item" :key="item._id" />
    </div>

    <div
      class="grid place-items-center h-[calc(100vh-180px)]"
      v-if="recipeStore.recipes.length === 0 && !recipeStore.isLoading"
    >
      <div class="grid place-items-center gap-4">
        <span class="pi pi-cart-minus" style="font-size: 4rem; color: #5a382d"></span>
        <p>Нічого не знайдено</p>
      </div>
    </div>

    <div v-if="recipeStore.isLoading">
      <div class="grid place-items-center h-[calc(100vh-180px)]">
        <div class="grid place-items-center gap-4">
          <span class="pi pi-spin pi-spinner" style="font-size: 3rem; color: #5a382d"></span>
        </div>
      </div>
    </div>
  </div>
</template>
