import { createStore } from 'vuex';
import axios from 'axios';
import { message } from 'ant-design-vue';

interface State {
  data: any[];
  token: string | null;
  user: string | null;
  isLoggedIn: boolean | null;
  role: string | null;
  login: string | null;
  document: any | null;
  url: string | null;
  solicitacoes: any[];
}

const store = createStore({
    state() {
        return {
            data: [],
            token: null,
            user: null,
            role: null,
            login: null,
            isLoggedIn: false,
            document: null,
        };
    },
    mutations: {
        setData(state: State, payload: any[]) {
            state.solicitacoes = payload;
        },
        setToken(state: State, token: string) {
            state.token = token;
        },
        setUser(state: State, user: string) {
            state.user = user;
        },
        setRole(state: State, role: string) { 
            state.role = role;
        },
        setLogin(state: State, login: string){
            state.login = login;
        },
        login(state: State) {
            state.isLoggedIn = true;
        },
        logout(state: State) {
            state.isLoggedIn = false;
        },
        setDocument(state: State, url: string) {
            state.document = url;
        },
        clearDocument(state: State) {
            state.document = null;
        }
    },
    actions: {
    async login(
        { commit }: { commit: (mutation: string, payload?: any) => void }, 
        { username, password }: { username: string; password: string }) 
    {
        try {
        const response = await axios.post('http://localhost:8080/auth/login', {
            login: username,
            password: password,
        });
        const token = response.data.token;
        const role = response.data.role;
        const login = response.data.login;

        commit('setToken', token);
        commit('setUser', role);
        commit('setLogin', login);
        
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('login', login);

        console.log('token:', token);
        console.log('role:', role);
        console.log('login:', login);

        message.success('Login realizado com sucesso!');

        return true;
        } catch (error: any) {
        if (error.response && error.response.status === 401) {
            message.error('Credenciais inválidas. Verifique seu login e senha.');
        } else {
            message.error('Erro ao fazer login! Tente novamente mais tarde.');
        }
        return false;
        }
    },
    async logout({ commit }: { commit: (mutation: string, payload?: any) => void }) {
        commit('setToken', null);
        localStorage.removeItem('token');
    },
    async registerUser(
        { commit }: { commit: (mutation: string, payload?: any) => void }, 
        userData: any) 
    {
        try {
            const response = await axios.post('http://localhost:8080/auth/register', userData);
            console.log('Usuário cadastrado com sucesso:', response.data);
            message.success('Usuário cadastrado com sucesso!');
            commit('setUser', userData);
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            message.error('Erro ao cadastrar usuário!');
        }
    },
    async fetchSolicitacoes({ commit }: { state: State; commit: (mutation: string, payload?: any) => void }) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/solicitacoes', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            //console.log('Dados recebidos:', response.data);
            commit('setData', response.data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    },
    async fetchSolicitacoesByUser({ commit }: { state: State; commit: (mutation: string, payload?: any) => void }) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/solicitacoes/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            //console.log('Dados recebidos:', response.data);
            commit('setData', response.data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    },
    async deleteSolicitacao(
        { state, dispatch }: { state: State; dispatch: (action: string, payload?: any) => Promise<any> }, 
        id: string) 
    {
        try {
        await axios.delete(`http://localhost:8080/solicitacoes/${id}`, {
            headers: {
            'Authorization': `Bearer ${state.token}`,
            },
        });
        dispatch('fetchSolicitacoes');
        } catch (error) {
        console.error('Erro ao excluir o documento:', error);
        }
    },
    async addDocument(
        { state, dispatch }: { state: State; dispatch: (action: string, payload?: any) => Promise<any> }, 
        file: File) 
    {
        try {
            const formData = new FormData();
            formData.append('file', file);
            await axios.post('http://localhost:8080/vistas/upload', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${state.token}`
            },
        });
        dispatch('fetchData');
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
        }
    },
    },
    getters: {
        flightData: (state: State) => state.data,
        documentUrl: (state: State) => state.document,
    },
});

export default store;