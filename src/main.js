import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/global.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css';
import router from './router'
import { createPinia } from 'pinia'

import { createPiniaMiddleware } from "./plugins/piniaMiddleware";
import piniaPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(createPiniaMiddleware()); // Gunakan middleware custom Anda

/*
// use pinia middleware
pinia.use(createPiniaMiddleware());
// use plugin persisted state dari pinia-plugin-persistedstate
pinia.use(piniaPersistedstate);
// import axios from 'axios';
*/

// Gunakan plugin persisted state dari 'pinia-plugin-persistedstate'
pinia.use(piniaPersistedstate);
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");

//createApp(App).use(createPinia()).use(router).mount('#app')