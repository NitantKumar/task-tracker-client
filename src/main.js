import {createApp} from 'vue';
import App from './App.vue';
import store from './store';  // Make sure this path is correct
import router from './router'
import './index.css'

createApp(App).use(router).use(store).mount('#app')