import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import TelaCriaUsuario from '../components/TelaCriaUsuario.vue';
import TelaCriaSolicitacao from '../components/TelaCriaSolicitacao.vue';
import TelaSolicitacoes from '../components/TelaSolicitacoes.vue';
import HomeScreen from '../components/HomeScreen.vue';
import TelaEditaSolicitacao from '../components/TelaEditaSolicitacao.vue';
import TelaHorasValidas from '../components/TelaHorasValidas.vue';
import TelaCriaHoraValida from '../components/TelaCriaHoraValida.vue';
import { useStore } from 'vuex';

const routes = [
    { path: '/', component: Home },
    { path: '/HomeScreen', component: HomeScreen, meta: { requiresAuth: true }},
    { path: '/CriaUsuario', component: TelaCriaUsuario, meta: { requiresAuth: true }},
    { path: '/CriaSolicitacao', component: TelaCriaSolicitacao, meta: { requiresAuth: true }},
    { path: '/CriaHoraValida', component: TelaCriaHoraValida, meta: { requiresAuth: true }},
    { path: '/TelaSolicitacao', component: TelaSolicitacoes, meta: { requiresAuth: true }},
    { path: '/EditaSolicitacao', component: TelaEditaSolicitacao, meta: { requiresAuth: true }},
    { path: '/TelaHorasValidas', component: TelaHorasValidas, meta: { requiresAuth: true }}
];
  
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Adicionando a guarda de navegação para proteger as rotas
router.beforeEach((to, _from, next) => {
  const store = useStore();

  // Checa se a rota requer autenticação
  if (to.meta.requiresAuth) {
    if (store.state.token) { // Confia apenas no Vuex
      next(); // Permite o acesso
    } else {
      console.log('Redirecionando para login, token ausente.');
      next('/'); // Redireciona para a tela de login
    }
  } else {
    next(); // Permite o acesso para rotas que não precisam de autenticação
  }
});

export default router;