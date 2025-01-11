<template>
  <a-form
    :model="props.formData"
    :layout="'vertical'"
    ref="formRef"
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
                v-model:value="props.formData.nomeColaborador"
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
                v-model:value="props.formData.filial"
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
                v-model:value="props.formData.junhoJulho"
                placeholder="Digite as horas"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <a-form-item label="Horas Agosto">
              <a-input
                v-model:value="props.formData.agosto"
                placeholder="Digite as horas"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="Horas Set/Out">
              <a-input
                v-model:value="props.formData.setembroOutubro"
                placeholder="Digite as horas"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="Horas Novembro">
              <a-input
                v-model:value="props.formData.novembro"
                placeholder="Digite as horas"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <a-form-item label="Horas Dezembro">
              <a-input
                v-model:value="props.formData.dezembro"
                placeholder="Digite as horas"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="Horas Janeiro">
              <a-input
                v-model:value="props.formData.janeiro"
                placeholder="Digite as horas"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="Horas Fevereiro">
              <a-input
                v-model:value="props.formData.fevereiro"
                placeholder="Digite as horas"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <a-form-item label="Horas Março">
              <a-input
                v-model:value="props.formData.marco"
                placeholder="Digite as horas"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="Horas Abril">
              <a-input
                v-model:value="props.formData.abril"
                placeholder="Digite as horas"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="Horas Maio">
              <a-input
                v-model:value="props.formData.maio"
                placeholder="Digite as horas"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <a-form-item label="Horas Junho">
              <a-input
                v-model:value="props.formData.junho"
                placeholder="Digite as horas"
              />
            </a-form-item>
          </a-col>
        </a-row>
    </a-form>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue';

  // Definindo que formData será passado como uma prop
  const props = defineProps({
    formData: {
      type: Object,
      required: true,
    },
  });
</script>
  