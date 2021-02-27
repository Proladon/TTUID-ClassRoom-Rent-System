import { createApp } from 'vue'
import App from './App.vue'
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueFinalModal from 'vue-final-modal'


createApp(App)
    .use(Toast)
    .use(VueFinalModal())
    .mount('#app')
