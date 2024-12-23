<template>
    <div class="table-container">
      <!-- Botão para adicionar solicitação -->
      <a-button 
        type="primary" 
        @click="navegarParaAdicionarSolicitacao"
        v-if="isAdmin"
      >
        <FileAddOutlined />
        Adicionar Solicitação
      </a-button>
  
      <!-- Botão para registrar usuário -->
      <a-button 
        v-if="isAdmin" 
        type="primary" 
        @click="cadastrarUsuario"
        class="register-button"
      >
        <UserAddOutlined />
        Registrar Colaborador
      </a-button>
  
      <br /><br />
      <!-- Campo de pesquisa -->
      <a-input-search
        v-model:value="searchTerm"
        placeholder="Pesquisar por motivo"
        enter-button
        @search="onSearch"
      />
      <br /><br />
  
      <!-- Tabela -->
      <a-table 
        :columns="columns" 
        :data-source="data" 
        :row-key="record => record.id" 
        :pagination="{ pageSize: 6 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'data'">
            <span>{{ formatDate(record.data) }}</span>
          </template>
          <template v-else-if="column.key === 'status'">
            <a-tag :color="getStatusColor(record.status)">
              {{ record.status }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-button 
              type="primary" 
              size="small" 
              @click="editarSolicitacao(record.id)"
              class="visualizer-button"
            >
              Editar
            </a-button>
            <span v-if="isAdmin">
              <a-divider type="vertical" />
              <a-button 
                type="primary" 
                size="small" 
                @click="deleteSolicitacao(record.id)"
                class="delete-button"
              >
                <DeleteOutlined />
                Deletar
              </a-button>
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </template>
  
<script lang="ts" setup>
    import { ref, computed, onMounted, watch } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import { message } from 'ant-design-vue';
    import { DeleteOutlined, FileAddOutlined, UserAddOutlined } from '@ant-design/icons-vue';
    
    // Router e Store
    const router = useRouter();
    const store = useStore();
    
    // Campos de pesquisa e dados
    const searchTerm = ref('');
    const data = computed(() => store.state.solicitacoes);
    
    // Verificar se o usuário é admin
    const isAdmin = computed(() => localStorage.getItem('role') === 'admin');
    
    // Funções auxiliares
    const navegarParaAdicionarSolicitacao = () => {
        router.push('/CriaSolicitacao');
    };
    
    const cadastrarUsuario = () => {
        router.push('/TelaCriaUsuario');
    };
    
    const onSearch = async (motivo: string) => {
        if (searchTerm.value) {
            try {
                await store.dispatch('searchSolicitacaoByMotivo', motivo);
            } catch {
                message.error('Erro ao buscar solicitações. Verifique o termo digitado.');
            }
        } else {
            await store.dispatch('fetchSolicitacoes');
        }
    };
    
    // Formatar data
    const formatDate = (date: string) => new Date(date).toLocaleString();
    
    // Cor do status
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDENTE':
                return 'gold';
            case 'APROVADA':
                return 'green';
            case 'REJEITADA':
                return 'red';
            default:
                return 'blue';
        }
    };
    
    // Ações
    const editarSolicitacao = (id: number) => {
        router.push(`/VisualizarSolicitacao/${id}`);
    };
    
    const deleteSolicitacao = async (id: number) => {
        try {
            await store.dispatch('deleteSolicitacao', id);
            message.success('Solicitação deletada com sucesso!');
        } catch {
            message.error('Erro ao deletar a solicitação.');
        }
    };
    
    // Carregar dados na montagem do componente
    onMounted(() => {
        store.dispatch('fetchSolicitacoes');
    });
    
    // Atualizar dados quando o campo de busca muda
    watch(searchTerm, (newValue) => {
        if (!newValue) {
          store.dispatch('fetchSolicitacoes');
        }
    });
    
    // Configuração das colunas
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
            width: 150,
        },
        {
            title: 'Motivo',
            dataIndex: 'motivo',
            key: 'motivo',
            width: 200,
        },
        {
            title: 'Horas Solicitadas',
            dataIndex: 'horasSolicitadas',
            key: 'horasSolicitadas',
            width: 150,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
        },
        {
            title: 'Colaborador',
            dataIndex: 'user',
            key: 'user',
            width: 150,
            customRender: ({ user }: any) => user.nome,
        },
        {
            title: 'Ação',
            key: 'action',
            width: 200,
        },
    ];
</script>
  
<style scoped>
    .table-container {
        padding: 0 20px;
    }
    
    .visualizer-button {
        margin-right: 8px;
    }
    
    .register-button {
        margin-left: 5px;
    }
</style>
  