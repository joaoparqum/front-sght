<template>
    <div>
      <a-button 
        type="primary" 
        @click="navegarParaAdicionarHoraValida"
        class="adiciona-button"
      >
        <FileAddOutlined />
        Adicionar Hora Válida
      </a-button>
      <a-button 
        type="primary" 
        @click="navegarParaHomescreen"
      >
        <SwapLeftOutlined />
        Voltar para tela inicial
      </a-button>
      <br/><br/>
      <a-input-search
        v-model:value="searchTerm"
        placeholder="Pesquisar por colaborador"
        enter-button
        @search="onSearch"
      />
      <br /><br />
  
      <div class="table-container">
        <a-table
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 1500, y: 500 }"
          row-key="name"
          bordered
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'filial'">
              <a-tag :color="colorMap[record.filial] || 'default'">
                {{ record.filial }}
              </a-tag>
            </template>
            <template v-else-if="column.key === 'operation'">
              <a-button 
                type="primary" 
                size="small" 
                @click="openEditModal(record.id)"
                class="visualizer-button"
              >
                <EditOutlined />
                Editar
              </a-button>
              <a-divider type="horizontal" />
              <a-button 
                type="primary"  
                size="small"
                danger 
                @click="deleteHoraValida(record.id)"
              >
                <DeleteOutlined />
                Deletar
              </a-button>
            </template>
            <template v-else>
              {{ record[column.dataIndex] }}
            </template>
          </template>
        </a-table>
      </div>

      <!-- Modal de edição -->
      <a-modal v-model:open="editModalOpen" title="Editar" @ok="handleEditOk(formData.id, formData)" @cancel="handleEditCancel">
        <FormEditaHoras :formData="formData" />
      </a-modal>
    </div>
</template>
  
<script lang="ts" setup>
  import { computed, onMounted, reactive, ref, type Ref } from 'vue';
  import { message, type TableColumnsType } from 'ant-design-vue';
  import { DeleteOutlined, EditOutlined, FileAddOutlined, SwapLeftOutlined } from '@ant-design/icons-vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import FormEditaHoras from './FormEditaHoras.vue';
  
  // Router e Store
  const router = useRouter();
  const store = useStore();
  // Estado
  const searchTerm = ref('');
  const data = computed(() => store.state.horas);
  const editModalOpen = ref(false);
  const formData = ref({
    id: '',
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
  });
  const updatedData = { ...formData.value };

  const navegarParaAdicionarHoraValida = () => {
    router.push('/CriaHoraValida');
  };
  
  const navegarParaHomescreen = () => {
        router.push('/HomeScreen');
  };

  onMounted(() => {
    store.dispatch('fetchHoras');
  });
  
  const deleteHoraValida = async (id: number) => {
    try {
      await store.dispatch('deleteHoras', id);
      message.success('Hora Válida deletada com sucesso!');
    } catch {
      message.error('Erro ao deletar a hora válida.');
    }
  };
  
  const openEditModal = async (id: string) => {
    console.log('ID passado:', id);

    if (!id) {
        console.error('ID não encontrado');
        return;
    }

    try {
        const dadosParaEditar = await store.dispatch('fetchHorasById', {id} );
        formData.value = { ...dadosParaEditar };
        editModalOpen.value = true;
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
    }
  };
  
  const handleEditOk = async ( id: string, updatedData: any ) => {
    try {
        // Os dados do formulário (já modificados no modal)
        console.log(updatedData);

        // Lógica para enviar os dados ao store ou outro lugar
        await store.dispatch('updateHoras', { id, updatedData });

        // Mensagem de sucesso e fechamento do modal
        message.success('Dados atualizados com sucesso!');
        editModalOpen.value = false;
    } catch (error) {
        console.error('Erro ao salvar as alterações:', error);
        message.error('Erro ao editar os dados.');
    }
  };

  const handleEditCancel = () => {
    editModalOpen.value = false;
  };
  
  const onSearch = async (nomeColaborador: string) => {
    if (searchTerm.value) {
      try {
        await store.dispatch('searchHorasByName', nomeColaborador);
      } catch {
        message.error('Erro ao buscar colaborador. Verifique o termo digitado.');
      }
    } else {
      await store.dispatch('fetchHoras');
    }
  };
  
  const colorMap: { [key: string]: string } = {
    MATRIZ: 'geekblue',
    SEABRA: 'geekblue',
    TINTASMC: 'geekblue',
    ITABERABA: 'geekblue',
    MORRO: 'geekblue',
    JACOBINA: 'geekblue',
    CONQUISTA: 'geekblue',
  };
  
  // Colunas da tabela
  const columns: TableColumnsType = [
    { title: 'ID', dataIndex: 'id', key: 'id', fixed: 'left'},
    { title: 'Nome', dataIndex: 'nomeColaborador', key: 'nomeColaborador', fixed: 'left' },
    { title: 'Filial', dataIndex: 'filial', key: 'filial', width: 130, fixed: 'left' },
    { title: 'Jun/Jul', dataIndex: 'junhoJulho', key: 'junhoJulho' },
    { title: 'Ago', dataIndex: 'agosto', key: 'agosto' },
    { title: 'Set/Out', dataIndex: 'setembroOutubro', key: 'setembroOutubro' },
    { title: 'Nov', dataIndex: 'novembro', key: 'novembro' },
    { title: 'Dez', dataIndex: 'dezembro', key: 'dezembro' },
    { title: 'Jan', dataIndex: 'janeiro', key: 'janeiro' },
    { title: 'Fev', dataIndex: 'fevereiro', key: 'fevereiro' },
    { title: 'Mar', dataIndex: 'marco', key: 'marco' },
    { title: 'Abr', dataIndex: 'abril', key: 'abril' },
    { title: 'Mai', dataIndex: 'maio', key: 'maio' },
    { title: 'Jun', dataIndex: 'junho', key: 'junho' },
    { title: 'Total', dataIndex: 'total', key: 'total', fixed: 'right' },
    { title: 'Ação', key: 'operation', fixed: 'right' },
  ];
</script>  

<style>

  .adiciona-button{
    margin-right: 5px;
  }
  
</style>