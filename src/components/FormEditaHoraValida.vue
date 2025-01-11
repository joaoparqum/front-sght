<template>
  <div class="form-container">
    <a-form
      :model="horasState.horas"
      name="horavalida"
      layout="vertical"
      autocomplete="off"
      @finish="onEdit"
    >
      <a-row :gutter="[16, 16]">
        <!-- Nome do Colaborador -->
        <a-col :span="8">
          <a-form-item
            label="Nome"
            name="nomeColaborador"
            rules="[ { required: true, message: 'Por favor, insira o nome do colaborador' } ]"
          >
            <a-input
              v-model:value="horasState.horas.nomeColaborador"
              placeholder="Digite o nome"
            />
          </a-form-item>
        </a-col>

        <!-- Filial -->
        <a-col :span="8">
          <a-form-item
            label="Filial"
            name="filial"
            rules="[ { required: true, message: 'Por favor, selecione a filial' } ]"
          >
            <a-select
              v-model:value="horasState.horas.filial"
              placeholder="Selecione a filial"
            >
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

        <!-- Outras colunas de horas -->
        <a-col :span="8">
          <a-form-item label="Horas Jun/Jul">
            <a-input
              v-model:value="horasState.horas.junhoJulho"
              placeholder="Digite as horas"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="[16, 16]">
        <a-col :span="8">
          <a-form-item label="Horas Agosto">
            <a-input
              v-model:value="horasState.horas.agosto"
              placeholder="Digite as horas"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="Horas Set/Out">
            <a-input
              v-model:value="horasState.horas.setembroOutubro"
              placeholder="Digite as horas"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="Horas Novembro">
            <a-input
              v-model:value="horasState.horas.novembro"
              placeholder="Digite as horas"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="[16, 16]">
        <a-col :span="8">
          <a-form-item label="Horas Dezembro">
            <a-input
              v-model:value="horasState.horas.dezembro"
              placeholder="Digite as horas"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="Horas Janeiro">
            <a-input
              v-model:value="horasState.horas.janeiro"
              placeholder="Digite as horas"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="Horas Fevereiro">
            <a-input
              v-model:value="horasState.horas.fevereiro"
              placeholder="Digite as horas"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="[16, 16]">
        <a-col :span="8">
          <a-form-item label="Horas Março">
            <a-input
              v-model:value="horasState.horas.marco"
              placeholder="Digite as horas"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="Horas Abril">
            <a-input
              v-model:value="horasState.horas.abril"
              placeholder="Digite as horas"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="Horas Maio">
            <a-input
              v-model:value="horasState.horas.maio"
              placeholder="Digite as horas"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="[16, 16]">
        <a-col :span="8">
          <a-form-item label="Horas Junho">
            <a-input
              v-model:value="horasState.horas.junho"
              placeholder="Digite as horas"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- Botão de Submissão -->
      <br />
      <a-row justify="center">
        <a-col>
          <a-form-item>
            <a-button type="primary" html-type="submit">Enviar edição</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, onMounted } from "vue";
  import { useStore } from "vuex";
  import { useRoute, useRouter } from "vue-router";
  import { message } from "ant-design-vue";

  const store = useStore();
  const route = useRoute();
  const router = useRouter();

  interface HorasForm {
    horas: {
      id?: number;
      nomeColaborador: string;
      filial: string;
      [key: string]: string | undefined;
    };
  }

  const horasState = reactive<HorasForm>({
    horas: {
      id: 0,
      nomeColaborador: "",
      filial: "",
    },
  });

  onMounted(async () => {
    const id = route.query.id as string;
    if (id) {
      try {
        const response = await store.dispatch("fetchHorasById", id);
        horasState.horas = response || {};
      } catch {
        message.error("Erro ao carregar os dados da hora válida!");
      }
    }
  });

  const onEdit = async () => {
    try {
      const id = route.query.id as string;
      if (!id) {
        message.error("ID da hora válida não encontrado!");
        return;
      }

      const updatedData: Record<string, string> = {};
      for (const key in horasState.horas) {
        if (horasState.horas[key]) {
          updatedData[key] = horasState.horas[key]!;
        }
      }

      await store.dispatch("updateHoras", { id, updatedData });
      message.success("Hora Válida editada com sucesso!");
      router.push("/TelaHorasValidas");
    } catch (error) {
      message.error("Erro ao editar a hora válida!");
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