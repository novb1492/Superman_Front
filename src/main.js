import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import {kmapStore} from './store/kmapStore';
const app = createApp(App);
app.use(router);
app.use(Vuex);
app.use(kmapStore);
app.mount('#app');
