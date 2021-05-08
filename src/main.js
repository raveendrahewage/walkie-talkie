import Vue from 'vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire'
import VueRouter from 'vue-router'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
Vue.use(VueRouter)
Vue.use(firestorePlugin)

Vue.config.productionTip = false

import Home from './components/Home';
import Chatroom from './components/Chatroom';

const router = new VueRouter({
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/chats/:id', name: 'chat', component: Chatroom }
    ]
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')