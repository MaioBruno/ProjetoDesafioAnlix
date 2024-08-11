const PatientService = require('../services/PatientService');

class PatientController {
  // Função para buscar pacientes pelo nome
  async getPatientByName(req, res) {
    try {
      const { name } = req.query; // Pega o nome dos parâmetros da URL
      const patients = await PatientService.findPatientByName(name); // Chama o serviço para buscar pacientes pelo nome
      if (patients.length === 0) { // Verifica se encontrou algum paciente
        return res.status(404).json({ message: 'Paciente não encontrado' }); // Retorna um erro 404 se não encontrar
      }
      res.json(patients); // Retorna os pacientes encontrados
    } catch (error) {
      res.status(500).json({ message: 'Ocorreu um erro ao buscar o paciente pelo nome', error }); // Retorna um erro 500 se algo deu errado
    }
  }

  // Função para buscar todos os pacientes
  async getAllPatients(req, res) {
    try {
      const patients = await PatientService.getAllPatients();
      res.json(patients); // Retorna a lista de pacientes
    } catch (error) {
      res.status(500).json({ message: 'Ocorreu um erro ao buscar todos os pacientes', error }); // Retorna um erro 500 se algo deu errado
    }
  }

  // Função para buscar um paciente pelo CPF
  async getPatientById(req, res) {
    try {
      const { cpf } = req.params; // Obtém o CPF dos parâmetros da URL
      const patient = await PatientService.getPatientById(cpf); // Busca o paciente pelo CPF
      if (!patient) {
        return res.status(404).json({ message: 'Paciente não encontrado' }); // Retorna erro se o paciente não for encontrado
      }
      res.json(patient); // Retorna o paciente encontrado
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar o paciente pelo CPF', error }); // Retorna erro em caso de falha
    }
  }

}

module.exports = new PatientController();
