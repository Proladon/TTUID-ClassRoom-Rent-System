import { createApp } from 'vue'
import App from './App.vue'
import Toast, { PluginOptions } from "vue-toastification";
import VueFinalModal from 'vue-final-modal'
import "vue-toastification/dist/index.css";
// import './assets/scss/style.scss'


createApp(App)
    .use(Toast)
    .use(VueFinalModal())
    .mount('#app')
