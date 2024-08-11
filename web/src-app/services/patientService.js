// src/services/patientService.js
import api from './api';

// Função para buscar pacientes por nome ou parte do nome
export async function searchPatientsByName(name) {
  try {
    const response = await fetch(`/api/patients?name=${name}`);
    if (!response.ok) {
      throw new Error('Erro na resposta da API');
    }
    return response.json();
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    return []; // Retorne um array vazio em caso de erro
  }
}

// Função para obter todas as informações de um paciente pelo CPF
export const getPatientDetailsById = async (cpf) => {
  try {
    const response = await api.get(`/patients/${cpf}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter detalhes do paciente:', error);
    throw error;
  }
};

// Função para obter todas as características mais recentes de um paciente
export const getAllLatestCharacteristics = async (cpf) => {
  try {
    const response = await api.get(`/patients/${cpf}/characteristics/latest`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter características mais recentes do paciente:', error);
    throw error;
  }
};


