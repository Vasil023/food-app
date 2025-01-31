<script setup>
import { useRecipeStore } from "@/stores/recipeStore";

import CheckRecipe from "@/components/CheckRecipe.vue";

const recipeStore = useRecipeStore();
</script>

<template>
  <div>
    <div class="container">
      <div
        class="columns-2 md:columns-3 lg:columns-6 lg:gap-3 gap-2 pt-1 pb-20"
        v-if="recipeStore.checkedRecipes.length"
      >
        <CheckRecipe v-for="item in recipeStore.checkedRecipes" :item="item" :key="item._id" />
      </div>
      <div class="grid place-items-center h-[calc(100vh-180px)]" v-else>
        <div class="grid place-items-center gap-4">
          <span class="pi pi-cart-minus" style="font-size: 4rem; color: #5a382d"></span>
          <p>Ви нічого не додали в обране</p>
        </div>
      </div>
    </div>
  </div>
</template>
