<template>
  
    <div style="display: flex; justify-content: center; align-items: center;">
      <a-form
        :model="formState"
        name="basic"
        layout="vertical"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Usuário"
          name="username"
          :rules="[{ required: true, message: 'Insira seu nome de usuário!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item
          label="Senha"
          name="password"
          :rules="[{ required: true, message: 'Insira sua senha!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
  
        <a-form-item
          label="Tipo de usuário:"
          name="role"
          :rules="[{ required: true, message: 'Selecione o tipo de usuário!' }]"
        >
          <a-select
            v-model:value="formState.role"
            show-search
            style="width: 300px"
            :options="options"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
          ></a-select>
        </a-form-item>
  
        <br><br>
        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <a-form-item>
              <a-button type="primary" html-type="submit" class="register-button">
                <FileAddOutlined />
                Cadastrar
              </a-button>
            </a-form-item>
          </a-col>  

          <a-col :span="8">
            <a-button 
              type="primary" 
              @click="navegarParaHomescreen"
            >
              <SwapLeftOutlined />
              Voltar para tela inicial
            </a-button>
          </a-col>  
        </a-row>  
      </a-form>
    </div>
  </template>
  
  <script lang="ts" setup>
    import { reactive, ref } from 'vue';
    import { useStore } from 'vuex';
    import { message, type SelectProps } from 'ant-design-vue';
    import { FileAddOutlined, SwapLeftOutlined } from '@ant-design/icons-vue';
    import { useRouter } from 'vue-router';
  
    const store = useStore();
    const router = useRouter();
  
    interface FormState {
      username: string;
      password: string;
      role: string;
    }
  
    const formState = reactive<FormState>({
      username: '',
      password: '',
      role: '',
    });
  
    const options = ref<SelectProps['options']>([
      { value: 'ADMIN', label: 'Administrador' },
      { value: 'USER', label: 'Usuário' },
    ]);
  
    const onFinish = async () => {
      try {
        message.loading({ content: 'Criando novo usuário...' });
        await store.dispatch('registerUser', {
          login: formState.username,
          password: formState.password,
          role: formState.role,
        });
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
      }
    };
  
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
  
    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };
  
    const handleBlur = () => {
      console.log('blur');
    };
  
    const handleFocus = () => {
      console.log('focus');
    };
  
    const filterOption = (input: string, option: any) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const navegarParaHomescreen = () => {
        router.push('/HomeScreen');
    };
  </script>

<style>

.register-button{
  margin-right: 30px;
}

</style>