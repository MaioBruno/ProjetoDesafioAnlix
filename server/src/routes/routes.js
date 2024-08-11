// Importa o módulo 'express' para criar rotas e manipular requisições
const express = require('express');

// Cria um roteador Express para definir as rotas da aplicação
const router = express.Router();

// Importa os controladores responsáveis pela lógica de negócios
const PatientController = require('../controllers/PatientController');
const CharacteristicController = require('../controllers/CharacteristicController');

// Buscar paciente por nome
// Utiliza o método 'getPatientByName' do 'PatientController'
router.get('/patients', (req, res) => PatientController.getPatientByName(req, res));

// Listar todos os pacientes
// Utiliza o método 'getAllPatients' do 'PatientController'
router.get('/patients/all', (req, res) => PatientController.getAllPatients(req, res));

// Rota para buscar um paciente pelo CPF
router.get('/patients/:cpf', (req, res) => PatientController.getPatientById(req, res));

// Rota para obter características mais recentes de um paciente pelo CPF
router.get('/patients/:cpf/characteristics/latest', CharacteristicController.getLatestCharacteristicByPatient);

// Exporta o roteador para ser utilizado no servidor
module.exports = router;
