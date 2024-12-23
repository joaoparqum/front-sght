<template>
    <div style="display: flex; justify-content: center; align-items: center;">
      <a-form
        :model="formState"
        name="solicitacao"
        layout="vertical"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <!-- Campo Data -->
        <a-form-item
          label="Data"
          name="data"
          :rules="[{ required: true, message: 'Insira a data!' }]"
        >
          <a-date-picker
            v-model:value="formState.data"
            format="YYYY-MM-DDTHH:mm:ss"
            show-time
            style="width: 100%;"
          />
        </a-form-item>
  
        <!-- Campo Motivo -->
        <a-form-item
          label="Motivo"
          name="motivo"
          :rules="[{ required: true, message: 'Insira o motivo!' }]"
        >
          <a-input v-model:value="formState.motivo" />
        </a-form-item>
  
        <!-- Campo Horas Solicitadas -->
        <a-form-item
          label="Horas Solicitadas"
          name="horasSolicitadas"
          :rules="[
            { required: true, message: 'Insira a quantidade de horas solicitadas!' },
            { type: 'number', min: 1, message: 'Insira um número válido!' }
          ]"
        >
          <a-input-number
            v-model:value="formState.horasSolicitadas"
            style="width: 100%;"
          />
        </a-form-item>
  
        <br /><br />
        <a-form-item>
          <a-button type="primary" html-type="submit">Cadastrar Solicitação</a-button>
        </a-form-item>
      </a-form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive } from 'vue';
  import { useStore } from 'vuex';
  import { message } from 'ant-design-vue';
  
  const store = useStore();
  
  // Interface para o estado do formulário
  interface SolicitacaoFormState {
    data: string;
    motivo: string;
    horasSolicitadas: number | null;
  }
  
  // Estado inicial do formulário
  const formState = reactive<SolicitacaoFormState>({
    data: '',
    motivo: '',
    horasSolicitadas: null,
  });
  
  // Função chamada no envio bem-sucedido do formulário
  const onFinish = async () => {
    try {
      message.loading({ content: 'Enviando solicitação...' });
      await store.dispatch('createSolicitacao', {
        data: formState.data,
        motivo: formState.motivo,
        horasSolicitadas: formState.horasSolicitadas,
      });
      message.success({ content: 'Solicitação criada com sucesso!' });
    } catch (error) {
      console.error('Erro ao criar solicitação:', error);
      message.error({ content: 'Erro ao criar solicitação.' });
    }
  };
  
  // Função chamada no envio mal-sucedido do formulário
  const onFinishFailed = (errorInfo: any) => {
    console.log('Falha no envio do formulário:', errorInfo);
  };
  </script>