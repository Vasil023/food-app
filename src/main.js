import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Vue3Toastify from "vue3-toastify";
import VueLazyload from 'vue-lazyload'

import './registerServiceWorker'

import "./assets/main.scss"
import 'primeicons/primeicons.css'
import "vue3-toastify/dist/index.css";

const app = createApp(App)

app.use(Vue3Toastify);

app.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  loading: '/src/assets/img/defoult.jpg'
})

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./registerServiceWorker.js").then((registration) => {
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      installingWorker.onstatechange = () => {
        if (installingWorker.state === "installed") {
          if (navigator.serviceWorker.controller) {
            // Повідомити користувача про оновлення
            console.log("New content is available; please refresh.");
          } else {
            console.log("Content is cached for offline use.");
          }
        }
      };
    };
  });
}


app.use(createPinia())

app.use(router)

app.mount('#app')
