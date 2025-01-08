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
  horas: any[];
  novasSolicitacoes: any[];
  id: string | null;
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
            novasSolicitacoes: [],
            id: null
        };
    },
    mutations: {
        setData(state: State, payload: any[]) {
            state.solicitacoes = payload;
        },
        setHorasData(state: State, horas: any[]) {
            state.horas = horas;
        },
        setToken(state: State, token: string) {
            state.token = token;
        },
        setUser(state: State, user: string) {
            state.user = user;
        },
        setId(state: State, id: string) {
            state.id = id;
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
        },
        setNovasSolicitacoes(state: any, solicitacoes: any[]) {
            state.novasSolicitacoes = solicitacoes;
        },        
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
            { dispatch }: { dispatch: (action: string, payload?: any) => Promise<any> }, 
            id: string) 
        {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8080/solicitacoes/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                dispatch('fetchSolicitacoesByUser');
            } catch (error) {
                console.error('Erro ao excluir o documento:', error);
            }
        },
        async createSolicitacao(
            { dispatch }: { dispatch: (action: string, payload?: any) => Promise<any> },
            payload: { data: string; motivo: string; horasSolicitadas: number }
        ) {
            try {
                const token = localStorage.getItem('token'); // Recupera o token do localStorage
                await axios.post(
                    `http://localhost:8080/solicitacoes`,
                    {
                        data: payload.data,
                        motivo: payload.motivo,
                        horasSolicitadas: payload.horasSolicitadas,
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`, // Inclui o token no cabeçalho
                        },
                    }
                );
                console.log('Solicitação criada com sucesso!');
                await dispatch('fetchSolicitacoes');
            } catch (error) {
                console.error('Erro ao criar solicitação: ', error);
            }
        },   
        async createHoraValida( { dispatch }: { dispatch: (action: string, payload?: any) => Promise<any> }, horas: {nomeColaborador: string, filial: string, junhoJulho: number, agosto: number, setembroOutubro: number, novembro: number, dezembro: number, janeiro: number, fevereiro: number, marco: number,
        abril: number, maio: number, junho: number    
        }) {
            try{
                const token = localStorage.getItem('token');
                await axios.post(`http://localhost:8080/horas`, 
                {
                    nomeColaborador: horas.nomeColaborador,
                    filial: horas.filial,
                    junhoJulho: horas.junhoJulho,
                    agosto: horas.agosto,
                    setembroOutubro: horas.setembroOutubro,
                    novembro: horas.novembro,
                    dezembro: horas.dezembro,
                    janeiro: horas.janeiro,
                    fevereiro: horas.fevereiro,
                    marco: horas.marco,
                    abril: horas.abril,
                    maio: horas.maio,
                    junho: horas.junho
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                dispatch('fetchHoras');
            } catch (error) {
                console.log('Erro ao criar hora valida: ', error);
            }
        },
        async fetchHoras ({ commit }: { state: State; commit: (mutation: string, payload?: any) => void }) {
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/horas`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                commit('setHorasData', response.data);
            } catch ( error ){
                console.log('Erro ao mostrar horas válidas: ', error);
            }
        },
        async deleteHoras (
            { dispatch }: { dispatch: (action: string, payload?: any) => Promise<any> }, 
            id: string) 
        {
            try{
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8080/horas/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                dispatch('fetchHoras');
            } catch ( error ){
                console.log('Erro ao deletar hora válida: ', error);
            }
        },
        async searchHorasByName(
            { commit }: { commit: (mutation: string, payload?: any) => void }, 
            nomeColaborador: string) 
        {
            try {
              const token = localStorage.getItem('token');
              const response = await axios.get(`http://localhost:8080/horas/nome/${nomeColaborador}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
              });
              commit('setHorasData', response.data);
            } catch (error) {
              console.log("Erro ao buscar documento pelo nome!");
            }
        },
        async changeStatus(
            { dispatch }: { state: State; dispatch: (action: string, payload?: any) => Promise<any> },
            { id, status }: { id: string; status: string }
        ) {
            try {
                const token = localStorage.getItem('token');
                await axios.patch(
                    `http://localhost:8080/solicitacoes/${id}/status`, null, 
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                        params: {
                            status,
                        },
                    }
                );
                dispatch('fetchSolicitacoes');
            } catch (error) {
                console.error('Erro ao mudar status da solicitação:', error);
            }
        },
        async fetchNovasSolicitacoes({ commit }: any) {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/solicitacoes/nao-vistas', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            commit('setNovasSolicitacoes', response.data);
        },
        async marcarNotificacoesComoVistas({ dispatch }: any) {
            try {
                const token = localStorage.getItem('token');
                await axios.put('http://localhost:8080/solicitacoes/marcar-vistas', {}, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                // Atualiza a lista de notificações após marcar como vistas
                dispatch('fetchNovasSolicitacoes');
            } catch (error) {
                console.error('Erro ao marcar notificações como vistas:', error);
            }
        },
        async updateSolicitacao({ dispatch }: { dispatch: (action: string, payload?: any) => Promise<any> }, 
        { id, updatedData }: { id: string; updatedData: any }) {
            try {
                await axios.put(`http://localhost:8080/solicitacoes/${id}`, updatedData);
                dispatch('fetchSolicitacoesById');
            } catch (error) {
                console.error('Erro ao atualizar a solicitação!', error);
            }
        },
        async updateHoras( {dispatch}: { dispatch: (action: string, payload?: any) => Promise<any>}, 
        { id, updatedData }: { id: string; updatedData: any} ) {
            try {
                const token = localStorage.getItem('token');
                await axios.patch(`http://localhost:8080/horas/${id}`, updatedData, {
                    headers: { 'Authorization': `Bearer ${token}`}
                });
                dispatch('fetchHoras');
            } catch ( error ){
                console.log('Erro ao atualizar a hora válida! ', error);
            }
        },
        async fetchSolicitacaoById({ id }:{ id: string }) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/solicitacoes/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                return response.data;
            } catch (error) {
                console.log("Erro ao encontrar solicitação:", error);
            }
        },
        async fetchHorasById({id}: {id: string}) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/horas/${id}`, {
                    headers: { 'Authorizarion': `Bearer ${token}`}
                });
                return response.data;
            } catch ( error ) {
                console.log('Erro ao encontrar hora válida: ', error);
            }
        }        
    },     
    getters: {
        flightData: (state: State) => state.data,
        documentUrl: (state: State) => state.document,
        novasSolicitacoes: (state: State) => state.novasSolicitacoes
    },
});

export default store;