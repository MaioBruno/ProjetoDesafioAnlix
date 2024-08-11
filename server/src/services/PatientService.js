const fs = require('fs');
const path = require('path');

class PatientService {
  constructor() {
    const pacientesPath = path.join(__dirname, '../dados/pacientes.json');
    this.pacientes = JSON.parse(fs.readFileSync(pacientesPath, 'utf8'));
  }

  // Busca pacientes pelo nome
  findPatientByName(name) {
    return this.pacientes.filter(patient =>
      patient.nome.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Retorna todos os pacientes
  getAllPatients() {
    return this.pacientes;
  }

  // Busca paciente por ID (CPF)
  getPatientById(cpf) {
    return this.pacientes.find(patient => patient.cpf === cpf) || null;
  }
}

module.exports = new PatientService();
