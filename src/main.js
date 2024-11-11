import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css';

import { createPinia } from 'pinia'

import router from './router'
// import axios from 'axios';

// createApp(App).use(createPinia()).use(router).mount('#app')
createApp(App).use(router).use(createPinia()).mount('#app')
