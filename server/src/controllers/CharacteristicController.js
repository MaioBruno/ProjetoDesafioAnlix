const CharacteristicService = require('../services/CharacteristicService');
const PatientService = require('../services/PatientService');

class CharacteristicController {
  async getLatestCharacteristicByPatient(req, res) {
    const { cpf } = req.params; // Obtém o CPF dos parâmetros da URL
    console.log(`Buscando características do paciente com CPF: ${cpf}`);

    try {
      // Busca o paciente pelo CPF
      const patient = await PatientService.getPatientById(cpf);

      if (!patient) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
      }

      // Busca as características mais recentes do paciente
      const latestCharacteristics = await CharacteristicService.getCharacteristicsByPatientId(cpf);
      res.json(latestCharacteristics);

    } catch (error) {
      console.error('Erro ao buscar características do paciente:', error.message);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

module.exports = new CharacteristicController();
