import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import TelaCriaUsuario from '../components/TelaCriaUsuario.vue';
import TelaCriaSolicitacao from '../components/TelaCriaSolicitacao.vue';
import TelaSolicitacoes from '../components/TelaSolicitacoes.vue';
import HomeScreen from '../components/HomeScreen.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/HomeScreen', component: HomeScreen},
    { path: '/CriaUsuario', component: TelaCriaUsuario},
    { path: '/CriaSolicitacao', component: TelaCriaSolicitacao},
    { path: '/TelaSolicitacao', component: TelaSolicitacoes},
];
  
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;