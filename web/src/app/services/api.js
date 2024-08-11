import axios from 'axios';

// Configurando a instância do Axios com a URL base da API
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    timeout: 5000, // Tempo máximo de espera para a resposta da API
});

// Adicionando um interceptador para tratar erros de resposta
api.interceptors.response.use(
    response => response,
    error => {
        console.error('Erro na resposta da API:', error);
        return Promise.reject(error);
    }
);

export default api;
