import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import toasts from './toasts'
import './assets/styles/styles.scss'
//import '@fortawesome/fontawesome-free/css/all.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

const token = "dfsdfsdf"
/*axios.interceptors.request.use(config => {
    config.headers.Authorization = "Bearer " + token;
    return config;
});*/
const app = createApp(App);
app.use(store);
app.use(toasts);
app.use(router);
app.use(VueAxios, axios);
app.mount('#app')