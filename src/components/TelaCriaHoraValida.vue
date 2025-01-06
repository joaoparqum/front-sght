<template>
    <a-layout :style="{ minHeight: '100vh', position: 'relative'}">
  
      <a-layout-header 
        :style="{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }"
      >
        <div style="display: flex; align-items: center;">
          <img src="/casa-logo.jpg" alt="Logo" style="margin-right: 10px; height: 40px;"/> 
          <h1 class="header-title">SGHT</h1>
        </div>  
        <div style="display: flex; align-items: center; gap: 10px;">
          <p class="header-greeting">Olá, {{ username }}!</p>
          <a-button 
            type="primary" 
            @click="fazerLogout()"
            class="logout-button"
          >
            <LogoutOutlined />
            <span class="button-text">Sair</span>
          </a-button>
        </div>
      </a-layout-header>
  
      <a-layout-content :style="{ display:'flex', justifyContent:'center', alignItems: 'center', marginTop: '50px' }">
        
        <div :style="{ background: '#fff', padding: '80px', minHeight: '460px', marginLeft: '100px', marginRight: '100px', minWidth: '370px'}">
          <h1 style="text-align: center;">Cadastro de Hora Válida</h1>
          
          <div class="form-container"><FormCriaHoraValida/></div>
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ position: 'relative', bottom: 0, width: '100%', textAlign: 'center', background: '#0404cf' }">
        <h2 style="color: yellow;">Casa do Construtor | Setor de TI - Irecê ©{{ currentYear }}</h2>
      </a-layout-footer>
    </a-layout>
  </template>
  
<script lang="ts" setup>
  
  import { useStore } from 'vuex';
  import { message } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { LogoutOutlined } from '@ant-design/icons-vue';
  import { onMounted, ref } from 'vue';
  import FormCriaHoraValida from './FormCriaHoraValida.vue';
  
  const router = useRouter();
  const store = useStore();
  const currentYear = ref(new Date().getFullYear());
  const username = ref<string | null>(null);
  
  onMounted(() => {
        username.value = localStorage.getItem('login');
  });
  
  const fazerLogout = () => {
    store.dispatch('logout');
  
    message.success('Saindo...');
  
    setTimeout(() => {
        router.push('/');
    }, 2000);
  }
  
  /*const isAdmin = computed(() => {
    const role = localStorage.getItem('role');
    console.log('Usuário carregado:', role);
    return role === 'admin' || role === 'user';
  });*/
</script>
  
<style scoped>
  #components-layout-demo-fixed .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
  }
  .site-layout .site-layout-background {
    background: #fff;
  }
  
  [data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
  }
  
  .form-container{
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title-hora{
    text-align: center;
    margin-bottom: 15px;
  }
  
  .header-title {
    color: white;
    margin: 0;
    font-size: 24px;
  }
  
  .header-greeting {
    color: white;
    font-weight: bold;
    margin: 0;
    font-size: 16px;
  }
  
  @media (max-width: 768px) {
    .header-title {
      font-size: 10px;
    }
  
    .header-greeting {
      font-size: 6px;
    }
  }
</style>