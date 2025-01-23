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

        <!--Campo Comprovação-->
        <a-form-item
           label="Comprovação"
           name="comprovante"
           required
        >
          <a-upload
            :before-upload="handleFileUpload"
            :on-remove="handleRemove"
            :max-count="1"
            :show-upload-list="true"
            :file-list="fileList"
          >
            <a-button>
              <UploadOutlined/>
              Enviar arquivo
            </a-button>
          </a-upload>   
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
          <a-button type="primary" html-type="submit">Enviar Solicitação</a-button>
        </a-form-item>
      </a-form>
    </div>
</template>
  
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { message } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { format } from 'date-fns';
  
  const store = useStore();
  const router = useRouter();
  const fileList = ref<File[]>([]);
  
  // Interface para o estado do formulário
  interface SolicitacaoFormState {
    data: string;
    motivo: string;
    comprovante: File | null;
    horasSolicitadas: number | null;
  }
  
  // Estado inicial do formulário
  const formState = reactive<SolicitacaoFormState>({
    data: '',
    motivo: '',
    comprovante: null,
    horasSolicitadas: null,
  });

  const resetForm = () => {
    formState.data = '';
    formState.motivo = '';
    formState.comprovante = null;
    formState.horasSolicitadas = null;
  };

  const handleFileUpload = (file: File) => {
    formState.comprovante = file;
    fileList.value = [file];
    return false; // Impede o upload automático
  };

  const handleRemove = (file: File) => {
    formState.comprovante = null;
    fileList.value = fileList.value.filter(f => f !== file);
  };
  
  // Função chamada no envio bem-sucedido do formulário
  const onFinish = async () => {
    try {
      if (!formState.comprovante) {
        message.error({ content: 'Por favor, insira o comprovante!' });
        return;
      }

      const payload = {
            ...formState,
            data: format(new Date(formState.data), "yyyy-MM-dd'T'HH:mm:ss")
      };

      console.log('payload: ', payload);

      message.loading({ content: 'Enviando solicitação...' });
      await store.dispatch('createSolicitacao', payload);
      message.success({ content: 'Solicitação criada com sucesso!' });

      resetForm(); // Resetando o formulário
      setTimeout(() => {
        router.push('/TelaSolicitacao')
      }, 2000);
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