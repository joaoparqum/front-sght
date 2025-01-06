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
        @search=""
    />
    <br /><br />

    <a-table
      :columns="columns"
      :data-source="data"
      :scroll="{ x: 1500, y: 300 }"
      row-key="name"
      bordered
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.editable">
          <a-input
            
            @blur="updateTotal(index)"
            style="width: 100%"
          />
        </template>
        <template v-else>
          {{ record[column.dataIndex] }}
        </template>
      </template>
    </a-table>
</template>
  
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { type TableColumnsType } from 'ant-design-vue';
  import { FileAddOutlined } from '@ant-design/icons-vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const navegarParaAdicionarHoraValida = () => {
    router.push('/CriaHoraValida');
  }
  
  interface DataItem {
    key: number;
    name: string;
    filial: string;
    junhoEJulho: string;
    agosto: string;
    setembroEOutubro: string;
    novembro: string;
    dezembro: string;
    total: string;
  }
  
  // Colunas da tabela
  const columns: TableColumnsType = [
    { title: 'Nome', dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: 'Filial', dataIndex: 'filial', key: 'filial', fixed: 'left' },
    {
      title: 'Junho e Julho',
      dataIndex: 'junhoEJulho',
      key: 'junhoEJulho',
    },
    { title: 'Agosto', dataIndex: 'agosto', key: 'agosto' },
    {
      title: 'Setembro e Outubro',
      dataIndex: 'setembroEOutubro',
      key: 'setembroEOutubro',
    },
    { title: 'Novembro', dataIndex: 'novembro', key: 'novembro' },
    { title: 'Dezembro', dataIndex: 'dezembro', key: 'dezembro',},
    { title: 'Total', dataIndex: 'total', key: 'total', fixed: 'right' },
  ];
  
  // Dados iniciais
  const data: DataItem[] = [
    {
        key: 1,
        name: 'Acácio Souza Oliveira',
        filial: 'Tintas MC',
        junhoEJulho: '7:20',
        agosto: '4:45',
        setembroEOutubro: '-14:47',
        novembro: '-12:00',
        dezembro: '',
        total: '-2:42',
    },
    {
        key: 2,
        name: "Adriano Oliveira dos Santos",
        filial: "Matriz",
        junhoEJulho: "24:35:00",
        agosto: "1:19:00",
        setembroEOutubro: "-4:00:00",
        novembro: "-12:00:00",
        dezembro: "",
        total: "20:35:00"
    },
    {
        key: 3,
        name: "Álvaro",
        filial: "Seabra",
        junhoEJulho: "0:30:00",
        agosto: "0:14:00",
        setembroEOutubro: "-7:50:00",
        novembro: "-4:00:00",
        dezembro: "-7:00:00",
        total: "-4:36:00"
    },
    {   key: 4,
        name: "Arlan Rocha",
        filial: "Tintas MC",
        junhoEJulho: "0:36:00",
        agosto: "0:00:00",
        setembroEOutubro: "-7:50:00",
        novembro: "",
        dezembro: "",
        total: "-7:14:00"
    },
    {   key: 5,
        name: "Bruno Rodrigues de Souza",
        filial: "Tintas MC",
        junhoEJulho: "1:05:00",
        agosto: "0:00:00",
        setembroEOutubro: "-10:25:00",
        novembro: "-8:00:00",
        dezembro: "",
        total: "-17:20:00"
    },
    {   key: 6,
        name: "Cleidson Alves dos Santos",
        filial: "Matriz",
        junhoEJulho: "7:20:00",
        agosto: "8:25:00",
        setembroEOutubro: "-27:19:00",
        novembro: "0:00:00",
        dezembro: "",
        total: "-18:32:00"
    },
    {
        key: 7,
        name: "Cristiana Dourado Silva Sena",
        filial: "Matriz",
        junhoEJulho: "8:44:00",
        agosto: "0:00:00",
        setembroEOutubro: "-4:00:00",
        novembro: "",
        dezembro: "",
        total: "4:44:00"
    },
    {
        key: 8,
        name: "Daiana Costa Santos",
        filial: "Seabra",
        junhoEJulho: "2:30:00",
        agosto: "0:00:00",
        setembroEOutubro: "-5:27:00",
        novembro: "",
        dezembro: "",
        total: "-2:57:00"
    },
    {
        key: 9,
        name: "Débora Alves Carvalho",
        filial: "Morro",
        junhoEJulho: "8:50:00",
        agosto: "0:00:00",
        setembroEOutubro: "-5:00:00",
        novembro: "",
        dezembro: "",
        total: "3:50:00"
    },
    {
        key: 10,
        name: "Diana Alves dos Santos",
        filial: "Jacobina",
        junhoEJulho: "0:00:00",
        agosto: "0:00:00",
        setembroEOutubro: "-6:00:00",
        novembro: "-9:00:00",
        dezembro: "",
        total: "-15:00:00"
    },
    {   
        key: 11,
        name: "Diogo de Souza Santos",
        filial: "Jacobina",
        junhoEJulho: "0:00:00",
        agosto: "0:00:00",
        setembroEOutubro: "4:25:00",
        novembro: "-2:30:00",
        dezembro: "",
        total: "1:55:00"
    },
    {   
        key: 12,
        name: "Edinaldo Dias de Souza",
        filial: "Conquista",
        junhoEJulho: "0:00:00",
        agosto: "0:00:00",
        setembroEOutubro: "-1:00:00",
        novembro: "",
        dezembro: "",
        total: "-1:00:00"
    },
    {
        key: 13,
        name: "Eldo Mendes de Souza",
        filial: "Matriz",
        junhoEJulho: "10:24:00",
        agosto: "13:50:00",
        setembroEOutubro: "-13:50:00",
        novembro: "",
        dezembro: "",
        total: "10:24:00"
    },
    {
        key: 14,
        name: "Emanuelle Carvalho Silva",
        filial: "Matriz",
        junhoEJulho: "27:13:00",
        agosto: "4:17:00",
        setembroEOutubro: "4:59:00",
        novembro: "",
        dezembro: "",
        total: "36:29:00"
    },
    {   key: 15,
        name: "Érica Bispo da Silva Santana",
        filial: "Itaberaba",
        junhoEJulho: "23:27:00",
        agosto: "-9:00:00",
        setembroEOutubro: "-9:00:00",
        novembro: "",
        dezembro: "",
        total: "5:27:00"
    },
    {
        key: 16,
        name: "Fabrícia Leite de Lima",
        filial: "Itaberaba",
        junhoEJulho: "11:11:00",
        agosto: "0:00:00",
        setembroEOutubro: "",
        novembro: "",
        dezembro: "",
        total: "11:11:00"
    },
    {
        key: 17,
        name: "Felipe Fontes",
        filial: "Matriz",
        junhoEJulho: "27:45:00",
        agosto: "0:00:00",
        setembroEOutubro: "-12:15:00",
        novembro: "-4:44:00",
        dezembro: "",
        total: "10:46:00"
    },
    {
        key: 18,
        name: "Gabriel Rodrigues de Almeida",
        filial: "Seabra",
        junhoEJulho: "27:45:00",
        agosto: "16:06:00",
        setembroEOutubro: "3:05:00",
        novembro: "-0:44:00",
        dezembro: "",
        total: "46:12:00"
    },
    {
        key: 19,
        name: "Guilherme Durães Carvalho",
        filial: "Matriz",
        junhoEJulho: "14:13:00",
        agosto: "17:16:00",
        setembroEOutubro: "-21:12:00",
        novembro: "-0:26:00",
        dezembro: "",
        total: "9:51:00"
    },
    {
        key: 20,
        name: "Jaison Costa dos Santos Boaventura",
        filial: "Itaberaba",
        junhoEJulho: "16:14:00",
        agosto: "10:35:00",
        setembroEOutubro: "0:08:00",
        novembro: "3:00:00",
        dezembro: "",
        total: "29:57:00"
    },
    {
        key: 21,
        name: "Jaiza de Oliveira Matos",
        filial: "Matriz",
        junhoEJulho: "9:59:00",
        agosto: "9:03:00",
        setembroEOutubro: "-20:09:00",
        novembro: "0:00:00",
        dezembro: "",
        total: "-1:07:00"
    },
    {
        key: 22,
        name: "João Pedro Paiva Duque",
        filial: "Matriz",
        junhoEJulho: "14:13:00",
        agosto: "14:51:00",
        setembroEOutubro: "3:08:00",
        novembro: "-2:00:00",
        dezembro: "",
        total: "30:12:00"
    },
    {
        key: 23,
        name: "Juliana de Sousa Silva",
        filial: "Matriz",
        junhoEJulho: "-5:00:00",
        agosto: "1:32:00",
        setembroEOutubro: "-6:29:00",
        novembro: "-7:30:00",
        dezembro: "",
        total: "-17:27:00"
    },
    {
        key: 24,
        name: "Kesila Queiroz Sousa",
        filial: "Matriz ",
        junhoEJulho: "0:00:00",
        agosto: "10:51:00",
        setembroEOutubro: "-0:20:00",
        novembro: "4:59:00",
        dezembro: "",
        total: "15:30:00"
    },
    {
        key: 25,
        name: "Lanna Lamberta",
        filial: "Matriz",
        junhoEJulho: "",
        agosto: "",
        setembroEOutubro: "-1:41:00",
        novembro: "0:00:00",
        dezembro: "",
        total: "-1:41:00"
    },
    {
        key: 26,
        name: "Larissa Maria Silva Cerqueira",
        filial: "Seabra",
        junhoEJulho: "35:05:00",
        agosto: "18:34:00",
        setembroEOutubro: "5:01:00",
        novembro: "-1:52:00",
        dezembro: "",
        total: "56:48:00"
    },
    {
        key: 27,
        name: "Lucas Lima Soares ",
        filial: "Matriz",
        junhoEJulho: "15:25:00",
        agosto: "1:23:00",
        setembroEOutubro: '-0:23:00',
        novembro: "-4:00:00",
        dezembro: "",
        total: "12:25:00"
    },
    {
        key: 28,
        name: "Lucas Santos ",
        filial: "Itaberaba",
        junhoEJulho: "",
        agosto: "",
        setembroEOutubro: "-8:20:00",
        novembro: "0:00:00",
        dezembro: "",
        total: "-8:20:00"
    },
    {   
        key: 29,
        name: "Marcelo Santos Silva",
        filial: "Conquista",
        junhoEJulho: "12:07:00",
        agosto: "9:17:00",
        setembroEOutubro: "2:57:00",
        novembro: "-9:00:00",
        dezembro: "",
        total: "15:21:00"
    },
    {
        key: 30,
        name: "Márcio Santos da Paz ",
        filial: "Morro",
        junhoEJulho: "29:47:00",
        agosto: "13:24:00",
        setembroEOutubro: "-8:49:00",
        novembro: "1:50:00",
        dezembro: "",
        total: "36:12:00"
    },
    {
        key: 31,
        name: "Maria Bethânia de Souza Cardoso",
        filial: "Conquista",
        junhoEJulho: "18:59:00",
        agosto: "3:10:00",
        setembroEOutubro: '-9:44:00',
        novembro: "-12:00:00",
        dezembro: "",
        total: "0:25:00"
    },
    {
        key: 32,
        name: "Mateus de Jesus Bastos ",
        filial: "Morro",
        junhoEJulho: "3:09:00",
        agosto: "1:23:00",
        setembroEOutubro: "-18:48:00",
        novembro: "-10:00:00",
        dezembro: "",
        total: "-24:16:00"
    },
    {
        key: 33,
        name: "Nelson Gualberto da Silva ",
        filial: "Tintas MC",
        junhoEJulho: "8:27:00",
        agosto: '-0:15:00',
        setembroEOutubro: "0:41:00",
        novembro: "",
        dezembro: "",
        total: "8:53:00"
    },
    {
        key: 34,
        name: "Raiane Mendes Grigório ",
        filial: "Seabra",
        junhoEJulho: "17:23:00",
        agosto: "0:44:00",
        setembroEOutubro: "0:57:00",
        novembro: "-4:00:00",
        dezembro: "",
        total: "15:04:00"
    },
    {
        key: 35,
        name: "Robson Bispo Santana",
        filial: "Itaberaba",
        junhoEJulho: "9:11:00",
        agosto: "12:14:00",
        setembroEOutubro: "-6:44:00",
        novembro: "3:53:00",
        dezembro: "",
        total: "18:34:00"
    },
    {
        key: 36,
        name: "Ronaldo Brito de Jesus",
        filial: "Conquista",
        junhoEJulho: "6:59:00",
        agosto: "8:44:00",
        setembroEOutubro: "00:00",
        novembro: "00:00:00",
        dezembro: "",
        total: "15:43:00"
    },
    {
        key: 37,
        name: "Thiago dos Santos Araújo",
        filial: "Jacobina",
        junhoEJulho: "0:00:00",
        agosto: "1:18:00",
        setembroEOutubro: "0:24:00",
        novembro: "5:00:00",
        dezembro: "",
        total: "6:42:00"
    },
    {
        key: 38,
        name: "Tiago Almeida da Silva ",
        filial: "Matriz",
        junhoEJulho: "17:07:00",
        agosto: "7:15:00",
        setembroEOutubro: "0:00:00",
        novembro: "-4:00:00",
        dezembro: "",
        total: "20:22:00"
    },
    {
        key: 39,
        name: "Wanessa Silva de Jesus",
        filial: "Matriz",
        junhoEJulho: "2:53:00",
        agosto: "-1:53:00",
        setembroEOutubro: "-4:28:00",
        novembro: "-8:00:00",
        dezembro: "",
        total: "-11:00:00"
    },
  ];

  
  // Estado editável
  const editableData = reactive([...data]);
  
  // Função para calcular o total ao editar os valores
  const updateTotal = (index: number) => {
    const record = editableData[index];
    const totalHours = [
      record.junhoEJulho,
      record.agosto,
      record.setembroEOutubro,
      record.novembro,
      record.dezembro,
    ]
      .map((time) => parseTimeToMinutes(time))
      .reduce((acc, curr) => acc + curr, 0);
  
    record.total = parseMinutesToTime(totalHours);
  };
  
  // Função para converter tempo no formato "HH:MM" para minutos
  const parseTimeToMinutes = (time: string): number => {
    const isNegative = time.startsWith('-');
    const [hours, minutes] = time.replace('-', '').split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    return isNegative ? -totalMinutes : totalMinutes;
  };
  
  // Função para converter minutos para o formato "HH:MM"
  const parseMinutesToTime = (minutes: number): string => {
    const isNegative = minutes < 0;
    const absMinutes = Math.abs(minutes);
    const hours = Math.floor(absMinutes / 60);
    const remainingMinutes = absMinutes % 60;
    return `${isNegative ? '-' : ''}${String(hours).padStart(2, '0')}:${String(
      remainingMinutes
    ).padStart(2, '0')}`;
  };
</script>
  
  