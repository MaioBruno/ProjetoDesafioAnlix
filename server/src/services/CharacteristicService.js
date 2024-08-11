const path = require('path');
const { readCharacteristicFiles } = require('../utils/fileUtils');

class CharacteristicService {
  constructor() {
    // Carrega os dados das características a partir de arquivos
    this.indiceCardiacoData = readCharacteristicFiles(path.join(__dirname, '../dados/indice_cardiaco'));
    this.indicePulmonarData = readCharacteristicFiles(path.join(__dirname, '../dados/indice_pulmonar'));
  }

  // Função para obter as características mais recentes de um paciente
  async getCharacteristicsByPatientCpf(cpf) {
    try {
      // Obtém as características mais recentes de acordo com o CPF do paciente
      const characteristics = {
        indiceCardiaco: this.getLatestCharacteristic(cpf, 'indice_cardiaco'),
        indicePulmonar: this.getLatestCharacteristic(cpf, 'indice_pulmonar')
      };
      console.log('Características retornadas:', characteristics);
      return characteristics;
    } catch (error) {
      console.error('Erro ao obter características pelo CPF do paciente:', error);
      throw error; // Propaga o erro para que o controlador possa tratá-lo
    }
  }

  // Função para obter a característica mais recente de um paciente
  getLatestCharacteristic(cpf, characteristic) {
    const data = this.getDataByCharacteristic(characteristic); // Obtém os dados da característica
    const patientData = data.filter(item => item.cpf === cpf); // Filtra os dados do paciente específico
    const latestEntry = patientData.reduce((latest, current) => {
      return (current.epoch > latest.epoch) ? current : latest; // Obtém a entrada mais recente com base na época
    }, patientData[0]);

    return latestEntry || null; // Retorna a entrada mais recente ou null se não houver entradas
  }

  // Função para obter os dados da característica com base no tipo de característica
  getDataByCharacteristic(characteristic) {
    if (characteristic === 'indice_cardiaco') {
      return this.indiceCardiacoData;
    } else if (characteristic === 'indice_pulmonar') {
      return this.indicePulmonarData;
    }
    return []; // Retorna um array vazio se a característica não for reconhecida
  }
}

module.exports = new CharacteristicService();
