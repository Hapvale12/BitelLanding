import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Fibra from '../views/Fibra.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/fibra', name: 'Fibra', component: Fibra },
];

const router = createRouter({
    history: createWebHashHistory(""),
    routes,
});

export default router;
