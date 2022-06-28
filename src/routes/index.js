import Vue from 'vue'
import VueRouter from 'vue-router';

const routes = [
    { path: '*', component: () => import('../views/defaults/NotFound.vue') },
    { path: '/', component: () => import('../views/Main.vue') },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

Vue.use(VueRouter);

export default router;