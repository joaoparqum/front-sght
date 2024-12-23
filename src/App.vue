<script setup lang="ts">
  import 'ant-design-vue/dist/reset.css';
  import { ref } from 'vue';
  import Login from './components/Login.vue';
  const currentYear = ref(new Date().getFullYear());
</script>

<template>
  <a-layout :style="{ minHeight: '100vh', position: 'relative'}">

    <a-layout-header 
      :style="{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }"
    >
      <img src="/casa-logo.jpg" alt="Logo" style="margin-right: 10px; height: 40px;" />
      <h1 style="color: white; margin: 0;">Sistema de Gerenciamento de Horas Trabalhadas</h1>
    </a-layout-header>

    <a-layout-content :style="{ display:'flex', justifyContent:'center', alignItems: 'center', marginTop: '50px' }">
      <a-breadcrumb :style="{ margin: '16px 0' }"></a-breadcrumb>
        <div class="content-wrapper">
          <h1 class="welcome-title">Seja bem-vindo ao SGHT!</h1>
          <div class="login-container">
            <router-view/>
            <Login/>
          </div>
        </div>
    </a-layout-content>

    <a-layout-footer :style="{ position: 'relative', bottom: 0, width: '100%', textAlign: 'center', background: '#0404cf', padding: '35px 0' }">
      <h2 style="color: yellow; margin: 0;">Casa do Construtor | Setor de TI - Irecê ©{{ currentYear }}</h2>
    </a-layout-footer>
  </a-layout>
  
</template>

<style scoped>
  /* Estilo padrão */
  .content-wrapper {
    background: #fff;
    padding: 60px;
    margin: 0 auto;
    max-width: 800px;
    min-height: 460px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .welcome-title {
    text-align: center;
    margin-bottom: 40px;
    font-size: 1.5rem;
  }

  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
  }

  /* Responsividade */
  @media (max-width: 1024px) {
    .content-wrapper {
      padding: 40px;
      margin: 0 20px;
    }
    .welcome-title {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 768px) {
    .content-wrapper {
      padding: 20px;
    }
    .welcome-title {
      font-size: 1rem;
    }
    a-layout-header {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
