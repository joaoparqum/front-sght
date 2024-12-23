<template>
    <a-form
      :model="formState"
      name="normal_login"
      class="login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Usuário"
        name="username"
        :rules="[{ required: true, message: 'Por favor coloque seu usuário!' }]"
      >
        <a-input v-model:value="formState.username">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
  
      <a-form-item
        label="Senha"
        name="password"
        :rules="[{ required: true, message: 'Por favor coloque sua senha!' }]"
      >
        <a-input-password v-model:value="formState.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
  
      <a-form-item>
        <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
          <LoginOutlined />
          Entrar
        </a-button>
      </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
  import { reactive, computed } from 'vue';
  import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons-vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { message } from 'ant-design-vue';

  const router = useRouter();
  const store = useStore();

  interface FormState {
    username: string;
    password: string;
    remember: boolean;
  }
  const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
  });

  const onFinish = async () => {
    const success = await store.dispatch('login', {
      username: formState.username,
      password: formState.password,
    });
    message.loading({ content: 'Fazendo o login no sistema...' });
    if (success) {
      setTimeout(() => {
        router.push('/TelaSolicitacao');
      }, 2000);
      console.log('Login realizado com sucesso!');
    }
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const disabled = computed(() => {
    return !(formState.username && formState.password);
  });
</script>

<style scoped>
    #components-form-demo-normal-login .login-form {
      max-width: 300px;
    }
    #components-form-demo-normal-login .login-form-forgot {
      float: right;
    }
    #components-form-demo-normal-login .login-form-button {
      width: 100%;
    }
</style>