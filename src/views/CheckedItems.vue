<script setup>
import { useRecipeStore } from "@/stores/recipeStore";
import recipeItem from "@/components/recipeItem.vue";

const recipeStore = useRecipeStore();
</script>

<template>
  <div>
    <div class="container">
      <div
        class="columns-2 lg:columns-5 lg:gap-3 gap-2 pt-1 pb-20"
        v-if="recipeStore.getCheckedRecipe.length"
      >
        <recipeItem v-for="item in recipeStore.getCheckedRecipe" :item="item" :key="item._id" />
      </div>
      <div class="grid place-items-center h-screen" v-else>
        <div class="grid place-items-center gap-4">
          <span class="pi pi-cart-minus" style="font-size: 4rem; color: #5a382d"></span>
          <p>Ви нічого не додали в обране</p>
        </div>
      </div>
    </div>
  </div>
</template>
