import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import {store} from './store/store'

const app = createApp(App);
app.use(router);
app.use(Vuex);
app.use(store);

app.mount('#app');
