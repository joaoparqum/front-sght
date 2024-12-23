import { createRouter, createWebHistory } from 'vue-router';
import HomeScreen from '../components/HomeScreen.vue';
import TelaCriaUsuario from '../components/TelaCriaUsuario.vue';

const routes = [
    { path: '/', component: HomeScreen },
    { path: '/CriaUsuario', component: TelaCriaUsuario}
];
  
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;