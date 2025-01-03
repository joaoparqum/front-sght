<template>
    <div class="form-container">
      <a-form
        :layout="solicitacaoState"
        :model="solicitacaoState"
        name="flight-form"
        :validate-messages="validateMessages"
        @finish="onEdit"
      >
        <div class="label-container">
            <a-form-item label="Data" :rules="[{ required: true }]">
              <a-date-picker v-model:value="solicitacaoState.solicitacao.data" style="width: 100%;" />
            </a-form-item>
  
            <a-form-item label="Motivo" :rules="[{ required: true }]">
              <a-input v-model:value="solicitacaoState.solicitacao.motivo" placeholder="Digite o motivo" />
            </a-form-item>
  
            <a-form-item label="Horas Solicitadas" :rules="[{ required: true }]">
              <a-input v-model:value="solicitacaoState.solicitacao.horasSolicitadas" placeholder="Digite as horas solicitadas" />
            </a-form-item>
  
            <a-form-item>
              <a-button type="primary" html-type="submit">Editar Solicitação</a-button>
            </a-form-item>
        </div>
      </a-form>
    </div>
  </template>
  
  <script lang="ts" setup>
      import { reactive, onMounted } from 'vue';
      import { useStore } from 'vuex';
      import { useRoute, useRouter } from 'vue-router';
      import { message } from 'ant-design-vue';
      import axios from 'axios';
  
      interface SolicitacaoForm {
        solicitacao: {
          id?: string;  
          data: string;  
          motivo: string;
          horasSolicitadas: string;
        };
      }
  
      const solicitacaoState = reactive<SolicitacaoForm>({
        solicitacao: {
          id: '',  
          data: '',
          motivo: '',
          horasSolicitadas: '',
        },
      });
  
      const validateMessages = {
        required: '${label} é obrigatório!',
      };
  
      const store = useStore();
      const route = useRoute();
      const router = useRouter();
  
      // Modificar para pegar o ID da query em vez de params
      const loadSolicitacaoData = async (id: string | string[]) => {
        try {
          const response = await store.dispatch('fetchSolicitacaoById', id);
          if (response) {
            solicitacaoState.solicitacao = response;
            console.log('Dados da solicitação recebidos:', response); 
          } else {
            message.error('Solicitação não encontrada!!');
          }
        } catch (error) {
          console.error('Erro ao carregar dados da solicitação:', error);
        }
      };
  
      onMounted(() => {
        console.log('ID na URL:', route.params.id);  // Verifique se o id está sendo obtido corretamente
        const solicitacaoId = route.params.id;
        if (solicitacaoId) {
          loadSolicitacaoData(solicitacaoId); 
        } else {
          message.error('ID não encontrado na rota!');
        }
        console.log(solicitacaoState.solicitacao);
      });
  
      const onEdit = async () => {
          try {
              const id = solicitacaoState.solicitacao.id;
              if (id) {
                  const updatedData = {
                      data: solicitacaoState.solicitacao.data,
                      motivo: solicitacaoState.solicitacao.motivo,
                      horasSolicitadas: solicitacaoState.solicitacao.horasSolicitadas,
                  };

                  await store.dispatch('updateSolicitacao', { id, updatedData });
                  message.success('Solicitação editada com sucesso!');

                  setTimeout(() => {
                      router.push('/TelaSolicitacoes');
                  }, 2000);
              } else {
                  message.error('ID da Solicitação não encontrada!');
              }
          } catch (error) {
              message.error('Erro ao editar a Solicitação!');
              console.error(error);
          }
      };

  </script>
  
  <style scoped>
    .form-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  
    .label-container {
      background-color: rgb(255, 255, 255);
      border-radius: 15px;
      
    }
  </style>