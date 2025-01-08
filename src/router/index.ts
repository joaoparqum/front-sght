import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import TelaCriaUsuario from '../components/TelaCriaUsuario.vue';
import TelaCriaSolicitacao from '../components/TelaCriaSolicitacao.vue';
import TelaSolicitacoes from '../components/TelaSolicitacoes.vue';
import HomeScreen from '../components/HomeScreen.vue';
import TelaEditaSolicitacao from '../components/TelaEditaSolicitacao.vue';
import TelaHorasValidas from '../components/TelaHorasValidas.vue';
import TelaCriaHoraValida from '../components/TelaCriaHoraValida.vue';
import TelaEditaHoraValida from '../components/TelaEditaHoraValida.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/HomeScreen', component: HomeScreen},
    { path: '/CriaUsuario', component: TelaCriaUsuario},
    { path: '/CriaSolicitacao', component: TelaCriaSolicitacao},
    { path: '/CriaHoraValida', component: TelaCriaHoraValida},
    { path: '/TelaSolicitacao', component: TelaSolicitacoes},
    { path: '/EditaSolicitacao', component: TelaEditaSolicitacao},
    { path: '/EditaHora', component: TelaEditaHoraValida},
    { path: '/TelaHorasValidas', component: TelaHorasValidas}
];
  
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;