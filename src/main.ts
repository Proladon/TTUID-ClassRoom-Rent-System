import { createApp } from 'vue'
import App from './App.vue'
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";


createApp(App)
    .use(Toast)
    .mount('#app')
