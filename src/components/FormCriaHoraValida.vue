<template>
    <div style="display: flex; justify-content: center; align-items: center;">
      <a-form
        :model="formState"
        name="horavalida"
        layout="vertical"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-row :gutter="[16, 16]">
          <!-- Nome do Colaborador -->
          <a-col :span="8">
            <a-form-item label="Nome" name="nomeColaborador" rules="[ { required: true, message: 'Por favor, insira o nome do colaborador' } ]">
              <a-input v-model:value="formState.nomeColaborador" placeholder="Digite o nome" />
            </a-form-item>
          </a-col>
  
          <!-- Filial -->
          <a-col :span="8">
            <a-form-item label="Filial" name="filial" rules="[ { required: true, message: 'Por favor, selecione a filial' } ]">
              <a-select v-model:value="formState.filial" placeholder="Selecione a filial">
                <a-select-option value="MATRIZ">Matriz</a-select-option>
                <a-select-option value="ITABERABA">Itaberaba</a-select-option>
                <a-select-option value="SEABRA">Seabra</a-select-option>
                <a-select-option value="JACOBINA">Jacobina</a-select-option>
                <a-select-option value="TINTASMC">TintasMC</a-select-option>
                <a-select-option value="MORRO">Morro do Chapéu</a-select-option>
                <a-select-option value="CONQUISTA">Vitória da Conquista</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="Horas Jun/Jul" >
              <a-input v-model:value="formState.junhoJulho" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>
        </a-row>  

        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <a-form-item label="Horas Agosto" >
              <a-input v-model:value="formState.agosto" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="Horas Set/Out" >
              <a-input v-model:value="formState.setembroOutubro" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="Horas Novembro" >
              <a-input v-model:value="formState.novembro" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>
        </a-row>  


        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <a-form-item label="Horas Dezembro" >
              <a-input v-model:value="formState.dezembro" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="Horas Janeiro" >
              <a-input v-model:value="formState.janeiro" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="Horas Fevereiro" >
              <a-input v-model:value="formState.fevereiro" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>
        </a-row>  

        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <a-form-item label="Horas Março" >
              <a-input v-model:value="formState.marco" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="Horas Abril" >
              <a-input v-model:value="formState.abril" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="Horas Maio" >
              <a-input v-model:value="formState.maio" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>
        </a-row>  

        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <a-form-item label="Horas Junho" >
              <a-input v-model:value="formState.junho" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>
        </a-row>  
  
        <!-- Botão de Submissão -->
        <br />
        <a-row justify="center">
          <a-col>
            <a-form-item>
              <a-button type="primary" html-type="submit">Cadastrar Hora Válida</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
</template>
  
  
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { message } from 'ant-design-vue';
  
  const store = useStore();
  const router = useRouter();
  
  // Interface para o estado do formulário
  interface HorasFormState {
    nomeColaborador: string;
    filial: string;
    junhoJulho: string;
    agosto: string;
    setembroOutubro: string;
    novembro: string;
    dezembro: string;
    janeiro: string;
    fevereiro: string;
    marco: string;
    abril: string;
    maio: string;
    junho: string;
    total: string;
  }
  
  // Estado inicial do formulário
  const formState = reactive<HorasFormState>({
    nomeColaborador: '',
    filial: '',
    junhoJulho: '',
    agosto: '',
    setembroOutubro: '',
    novembro: '',
    dezembro: '',
    janeiro: '',
    fevereiro: '',
    marco: '',
    abril: '',
    maio: '',
    junho: '',
    total: '',
  });

  
    // Função chamada no envio bem-sucedido do formulário
    const onFinish = async () => {
      try {
        message.loading({ content: 'Enviando Hora Válida...' });
        await store.dispatch('createHoraValida', {
          nomeColaborador: formState.nomeColaborador,
          filial: formState.filial,
          junhoJulho: formState.junhoJulho,
          agosto: formState.agosto,
          setembroOutubro: formState.setembroOutubro,
          novembro: formState.novembro,
          dezembro: formState.dezembro,
          janeiro: formState.janeiro,
          fevereiro: formState.fevereiro,
          marco: formState.marco,
          abril: formState.abril,
          maio: formState.maio,
          junho: formState.junho,
          total: formState.total
        });
        message.success({ content: 'Hora Válida criada com sucesso!' });
        setTimeout(() => {
          router.push('/TelaHorasValidas')
        }, 2000);
      } catch (error) {
        console.error('Erro ao criar hora válida:', error);
        message.error({ content: 'Erro ao criar hora válida.' });
      }
  };

  
  // Função chamada no envio mal-sucedido do formulário
  const onFinishFailed = (errorInfo: any) => {
    console.log('Falha no envio do formulário:', errorInfo);
  };
</script>