<template>
    <a-button 
        type="primary" 
        @click="navegarParaAdicionarHoraValida"
      >
        <FileAddOutlined />
        Adicionar Hora Válida
    </a-button>
    <br/><br/>
    <a-input-search
        v-model:value="searchTerm"
        placeholder="Pesquisar por colaborador"
        enter-button
        @search="onSearch"
    />
    <br /><br />

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
            <template v-else-if="column.editable">
                <a-input style="width: 100%" />
            </template>
            <template v-else-if="column.key === 'operation'">
                <a-button 
                    type="primary" 
                    size="small" 
                    @click="editarHoraValida(record.id)"
                    class="visualizer-button"
                >
                    <EditOutlined />
                    Editar
                </a-button>
                <a-divider type="vertical" />
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
</template>
  
<script lang="ts" setup>
  import { computed, onMounted, reactive, ref } from 'vue';
  import { message, type TableColumnsType } from 'ant-design-vue';
  import { DeleteOutlined, EditOutlined, FileAddOutlined } from '@ant-design/icons-vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';

  const router = useRouter();
  const store =  useStore();

  // Campos de pesquisa e dados
  const searchTerm = ref('');
  const data = computed(() => store.state.horas);

  const navegarParaAdicionarHoraValida = () => {
    router.push('/CriaHoraValida');
  }

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

 const editarHoraValida = async (id: string) => {
    console.log('ID para edição:', id);
    router.push({ path: '/EditaHora', query: { id: String(id) }});
 }

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
    { title: 'Nome', dataIndex: 'nomeColaborador', key: 'nomeColaborador', fixed: 'left' },
    { 
        title: 'Filial',
        dataIndex: 'filial', 
        key: 'filial', 
        fixed: 'left',
    },
    { title: 'Jun/Jul', dataIndex: 'junhoJulho', key: 'junhoJulho'},
    { title: 'Ago', dataIndex: 'agosto', key: 'agosto' },
    { title: 'Set/Out', dataIndex: 'setembroOutubro', key: 'setembroOutubro'},
    { title: 'Nov', dataIndex: 'novembro', key: 'novembro' },
    { title: 'Dez', dataIndex: 'dezembro', key: 'dezembro',},
    { title: 'Jan', dataIndex: 'janeiro', key: 'janeiro'},
    { title: 'Fev', dataIndex: 'fevereiro', key: 'fevereiro'},
    { title: 'Mar', dataIndex: 'marco', key:'marco'},
    { title: 'Abr', dataIndex: 'abril', key:'abril'},
    { title: 'Mai', dataIndex: 'maio', key: 'maio'},
    { title: 'Jun', dataIndex: 'junho', key: 'junho'},
    { title: 'Total', dataIndex: 'total', key: 'total', fixed: 'right' },
    { title: 'Ação', key: 'operation', fixed: 'right'}
  ];
  
  
</script>
  
  