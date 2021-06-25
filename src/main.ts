import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import  './App.scss'
createApp(App)
    .use(ElementPlus)
    .mount('#app')
