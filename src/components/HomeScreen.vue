<template>
    <a-layout :style="{ minHeight: '100vh', position: 'relative'}">
  
      <a-layout-header 
        :style="{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }"
      >
        <div style="display: flex; align-items: center;">
          <img src="/casa-logo.jpg" alt="Logo" style="margin-right: 10px; height: 40px;" /> 
          <h1 class="header-title">SGHT</h1>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">

          <div class="bell-container">
            <a-badge :count="novasSolicitacoes.length">
              <a-popover 
                placement="leftBottom"
                
              >
                <template #content>
                  <ul>
                    <li v-for="solicitacao in novasSolicitacoes" :key="solicitacao.id">
                      Colaborador: {{ solicitacao.userLogin }} - Motivo: {{ solicitacao.motivo }} - Horas:  {{ solicitacao.horasSolicitadas }}
                    </li>
                  </ul>
                  <a-button type="primary" @click="marcarTodasComoVistas">Marcar todas como vistas</a-button>
                </template>
                <template #title>
                  <span>Novas Solicitações!</span>
                </template>
                <img src="/bell.png" class="bell">
              </a-popover>
            </a-badge>
          </div>

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

      <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
        <a-breadcrumb :style="{ margin: '16px 0' }">
        </a-breadcrumb>
        <div :style="{ background: '#fff', padding: '24px', minHeight: '790px' }">

            <h1 style="text-align: center;">Sistema de Gerenciamento de Horas Trabalhadas</h1>
            <h2 style="text-align: center;">Bem-vindo!</h2>

            <div class="tables-wrapper">
              <div 
                class="table-container"
                @click="navegarParaTabelaSolicitacao"
              >
                <img src="/worksheet.png" class="work-icon">
                <p style="text-align: center;">Tabela de Solicitações</p>
              </div>
              <div 
                class="table-hr-container"
                @click="navegarParaTabelaHoras"
              >
                <img src="/working-time.png" class="time-icon">
                <p style="text-align: center;">Tabela de Horas Válidas</p>
              </div>
              <div 
                class="register-container"
                @click="navegarParaCadastroUser"
              >
                <img src="/register.png" class="register-icon">
                <p style="text-align: center;">Cadastro de Colaborador</p>
              </div>
            </div>

            <div class="calendar">
              <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
                <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange" />
              </div>
            </div>

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
    import { computed, onMounted, ref } from 'vue';
    import { Dayjs } from 'dayjs';

    const router = useRouter();
    const store = useStore();
    const username = ref<string | null>(null);
    const currentYear = ref(new Date().getFullYear());
    const value = ref<Dayjs>();
    const novasSolicitacoes = computed(() => store.state.novasSolicitacoes || []);
    const formatDate = (date: string) => new Date(date).toLocaleString();

    onMounted(() => {
        username.value = localStorage.getItem('login');
        store.dispatch('fetchNovasSolicitacoes');
    });

    // Atualiza as notificações a cada 60 segundos
    setInterval(() => {
        store.dispatch('fetchNovasSolicitacoes');
    }, 60000);

    const marcarTodasComoVistas = async () => {
        await store.dispatch('marcarNotificacoesComoVistas');
        message.success('Notificações marcadas como vistas.');
    };


    /*const onPopoverOpen = async (visible: boolean) => {
        if (visible) {
            await store.dispatch('marcarNotificacoesComoVistas');
        }
    };*/

    const onPanelChange = (value: Dayjs, mode: string) => {
      console.log(value, mode);
    };

    const fazerLogout = () => {
      store.dispatch('logout');

      message.success('Saindo...');

      setTimeout(() => {
          router.push('/');
      }, 2000);
    }

    const navegarParaTabelaSolicitacao = () => {
        router.push('/TelaSolicitacao');
    };

    const navegarParaTabelaHoras = () => {
      router.push('/TelaHorasValidas');
    }

    const navegarParaCadastroUser = () => {
      router.push('/CriaUsuario');
    }

    /*const isAdmin = computed(() => {
      const role = localStorage.getItem('role');
      console.log('Usuário carregado:', role);
      return role === 'admin';
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

    .register-button,
    .logout-button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      padding: 5px 15px;
    }

    .button-text {
      margin-left: 5px; /* Espaço entre o ícone e o texto */
    }

    /* Ajustes para dispositivos móveis */
    @media (max-width: 768px) {
      .header-title {
        font-size: 10px;
      }

      .header-greeting {
        font-size: 6px;
      }

      .register-button,
      .logout-button {
        font-size: 12px; /* Reduz o tamanho da fonte */
        padding: 5px 10px; /* Ajusta o espaçamento interno */
      }
    }

    .tables-wrapper {
      display: flex;
      justify-content: center; /* Centraliza os itens horizontalmente */
      align-items: center; /* Centraliza os itens verticalmente */
      gap: 50px; /* Espaço entre os quadrados */
      height: 100%; /* Ocupa toda a altura do contêiner */
    }

    .table-container, .table-hr-container, .register-container {
      margin-top: 30px;
      margin-bottom: 30px;
      padding: 15px;
      border-style: solid;
      border-color: rgb(0, 0, 66);
      border-radius: 15px;
      font-size: 18px;
      font-weight: 500;
      width: 300px; /* Largura fixa para os quadrados */
      height: 300px; /* Altura fixa para os quadrados */
      display: flex; /* Para centralizar o texto dentro */
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
      background-color: white; /* Cor inicial */
      transition: background-color 1s ease;
      color: black;
      transition: color 1s ease;
    }

    .table-container:hover, .table-hr-container:hover, .register-container:hover {
      background-color: rgb(0, 0, 71); /* Cor ao passar o mouse */
      color: white;
      cursor: pointer;
    }

    .calendar{
      display: flex;
      justify-content: center; /* Centraliza os itens horizontalmente */
      align-items: center;
    }

    .work-icon, .time-icon, .register-icon{
      width: 120px;
      height: auto; /* Mantém a proporção */
      margin-bottom: 20px;
    }

    .bell{
      width: 32px;
    }

    .bell-container{
      margin-right: 5px;
      cursor: pointer;
    }
</style>