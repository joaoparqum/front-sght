<template>
      <a-form
        :model="props.formData"
        :layout="'vertical'"
        ref="formRef"
      >
        <a-form-item label="Data">
          <a-input v-model:value="props.formData.data" placeholder="Digite a data" />
        </a-form-item>
    
    
        <a-form-item label="Motivo">
          <a-input
            v-model:value="props.formData.motivo"
            placeholder="Digite o motivo"
          />
        </a-form-item>
      
    
        <a-form-item label="Horas Solicitadas">
          <a-input
            v-model:value="props.formData.horasSolicitadas"
            placeholder="Digite as horas"
          />
        </a-form-item>
      </a-form>
</template>
  
<script lang="ts" setup>
     const props = defineProps({
        formData: {
          type: Object,
          required: true,
        },
      });
</script>
  