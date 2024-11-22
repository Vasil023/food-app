<script setup>
import { useRecipeStore } from "@/stores/recipeStore";
import { useUserStore } from "@/stores/userStore";

const props = defineProps(["item"]);

const recipeStore = useRecipeStore();
const userStore = useUserStore();

recipeStore.initSocket();
userStore.initSocket();

const checkRecipeIsCooking = async (id, isCooking) => {
  recipeStore.updateRecipeStatus(id, {
    userCooked: {
      _id: userStore.userId,
      nickname: userStore.nickname,
    },
    isCooking: isCooking,
  });
};

const removeRecipe = async (id) => {
  recipeStore.updateRecipeStatus(id, {
    isCooking: false,
    isChecked: false,
    userCooked: null,
  });
};

const updatePointInUser = async (id, userId, point) => {
  userStore.updateUser(userId, point);

  removeRecipe(id);
};
</script>

<template>
  <div class="break-inside-avoid mb-4 rounded-xl border pb-3">
    <router-link :to="`/search/${item.id ? item.id : ''}`">
      <div class="w-full relative">
        <img
          loading="lazy"
          class="w-full rounded-xl object-fill max-w-[300px]"
          :src="props.item.image ?? 'https://www.ukrslovo.net/wp-content/uploads/2021/11/14-322911_1100.jpg'"
          alt="ui/ux review check"
        />
      </div>

      <div class="mt-1 pb-3 px-2">
        <p class="text-[13px] font-semibold">{{ props.item.title }}</p>
        <p class="text-xs text-gray-500">{{ props.item.description }}</p>
      </div>
    </router-link>

    <div class="text-blue-gray-900 antialiased text-[13px] flex justify-between px-2 pb-5">
      <div class="flex items-center gap-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="-mt-0.5 h-5 w-5 text-[#5a382d]"
        >
          <path
            fill-rule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clip-rule="evenodd"
          ></path>
        </svg>
        {{ props.item.point }}
      </div>
      <div class="flex items-center gap-6">
        <!-- <span
          v-if="props.item.point"
          :class="props.item.isChecked ? 'pi pi-bookmark-fill' : 'pi pi pi-bookmark'"
          
          style="font-size: 1rem"
        ></span> -->
      </div>
    </div>
    <div
      v-if="props.item.userCooked"
      class="text-xs text-gray-500 px-2 text-center flex items-center justify-center gap-2 pb-1"
    >
      <p>Готує: {{ props.item.userCooked?.nickname }}</p>
      <span class="pi pi-spin pi-spinner" style="font-size: 0.8rem"></span>
    </div>

    <div class="flex justify-between items-end pt-4 px-2 border-t">
      <span @click="removeRecipe(props.item._id, props.item.isChecked ? false : true)" class="pi pi-times">
      </span>

      <span
        v-if="userStore.userId === props.item.user._id && props.item.isDone"
        class="pi pi-check cursor-pointer"
        style="font-size: 1.3rem; color: #5a382d"
        @click="updatePointInUser(props.item.point, props.item._id)"
      >
      </span>

      <!-- Підтверджено що інший юзер приготував -->
      <span
        v-if="userStore.userId !== props.item.userCooked?._id && props.item.isCooking"
        class="pi pi-check cursor-pointer"
        style="font-size: 1.3rem; color: #5a382d"
        @click="updatePointInUser(props.item._id, props.item.userCooked?._id, props.item.point)"
      >
      </span>

      <!-- Підтвердження що юзер бере рецепт приготування -->
      <span
        v-if="!props.item.isCooking"
        class="pi pi-check cursor-pointer"
        style="font-size: 1.3rem; color: #5a382d"
        @click="checkRecipeIsCooking(props.item._id, props.item.isCooking ? false : true)"
      >
      </span>

      <span
        v-if="props.item.isCooking && userStore.userId === props.item.userCooked?._id"
        class="pi pi-spin pi-spinner"
        style="font-size: 1.3rem"
      ></span>
    </div>
  </div>
</template>
