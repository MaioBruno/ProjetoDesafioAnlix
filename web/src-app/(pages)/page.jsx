"use client";

import { useState, useRef } from "react";

export default function Home() {
  // Estado para armazenar o nome e CPF digitados pelo usuário
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");

  // Estado para armazenar a lista de pacientes retornada da API
  const [patients, setPatients] = useState([]);

  // Estado para armazenar o paciente selecionado para exibição dos detalhes
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Estado para armazenar mensagens de erro
  const [error, setError] = useState("");

  // Estado para controlar o estado de carregamento durante as operações assíncronas
  const [loading, setLoading] = useState(false);

  // Referência para rolar a lista de pacientes para a visualização
  const patientsListRef = useRef(null);

  // Função para buscar pacientes com base nos parâmetros fornecidos
  const searchPatients = async (queryParams) => {
    setLoading(true);
    try {
      setError("");

      // Faz uma requisição para a API com os parâmetros de busca
      const response = await fetch(
        `http://localhost:3001/patients?${queryParams.toString()}`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar pacientes");
      }

      const data = await response.json();

      // Verifica se há pacientes retornados
      if (Array.isArray(data) && data.length > 0) {
        setPatients(data);
        setSelectedPatient(null);
      } else {
        setPatients([]);
        setError("Nenhum paciente encontrado");
      }

      // Rola a lista de pacientes para visualização
      if (patientsListRef.current) {
        patientsListRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.error("Erro ao buscar pacientes:", err.message);
      setError(err.message);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  // Função chamada quando o usuário clica no botão de busca
  const handleSearch = async () => {
    // Cria os parâmetros da consulta a partir do nome e CPF fornecidos
    const queryParams = new URLSearchParams({
      name: encodeURIComponent(name),
      cpf: encodeURIComponent(cpf),
    });
    await searchPatients(queryParams);
  };

  // Função chamada quando o usuário clica em um paciente para ver os detalhes
  const handlePatientClick = (patientCpf) => {
    setLoading(true);
    try {
      // Encontra o paciente selecionado na lista
      const patient = patients.find((p) => p.cpf === patientCpf);
      if (patient) {
        setSelectedPatient(patient);
      } else {
        setError("Paciente não encontrado");
      }
    } catch (err) {
      console.error("Erro ao buscar características do paciente:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para exportar os dados do paciente selecionado para um arquivo CSV
  const exportToCSV = () => {
    if (!selectedPatient) {
      setError("Nenhum paciente selecionado para exportar");
      return;
    }

    // Cria um array de linhas para o CSV
    const csvRows = [];
    const headers = [
      "Nome",
      "Idade",
      "CPF",
      "RG",
      "Data de Nascimento",
      "Sexo",
      "Signo",
      "Mãe",
      "Pai",
      "Email",
      "Senha",
      "CEP",
      "Endereço",
      "Número",
      "Bairro",
      "Cidade",
      "Estado",
      "Telefone Fixo",
      "Celular",
      "Altura",
      "Peso",
      "Tipo Sanguíneo",
      "Cor",
    ];

    // Adiciona o cabeçalho ao CSV
    csvRows.push(headers.join(","));

    // Adiciona os valores do paciente ao CSV
    const values = [
      selectedPatient.nome,
      selectedPatient.idade,
      selectedPatient.cpf,
      selectedPatient.rg,
      selectedPatient.data_nasc,
      selectedPatient.sexo,
      selectedPatient.signo,
      selectedPatient.mae,
      selectedPatient.pai,
      selectedPatient.email,
      selectedPatient.senha,
      selectedPatient.cep,
      selectedPatient.endereco,
      selectedPatient.numero,
      selectedPatient.bairro,
      selectedPatient.cidade,
      selectedPatient.estado,
      selectedPatient.telefone_fixo,
      selectedPatient.celular,
      selectedPatient.altura,
      selectedPatient.peso,
      selectedPatient.tipo_sanguineo,
      selectedPatient.cor,
    ];

    csvRows.push(values.join(","));

    // Cria o Blob e o URL para download do arquivo CSV
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "paciente.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Busca de Pacientes
      </h1>

      <div className="flex flex-col space-y-4 mb-6">
        {/* Campo de entrada para Nome do paciente */}
        <div className="flex flex-col w-full">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome do paciente"
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Campo de entrada para CPF do paciente */}
        <div className="flex flex-col w-full">
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Digite o CPF do paciente"
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Botão para iniciar a busca de pacientes */}
        <button
          onClick={handleSearch}
          className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
          disabled={loading}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {/* Mensagem de erro se houver algum problema na busca */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Lista de pacientes encontrados */}
      <ul ref={patientsListRef} className="list-disc list-inside">
        {patients.map((patient) => (
          <li
            key={patient.cpf}
            className="mb-2 p-2 bg-white border border-gray-300 rounded-md shadow-sm flex justify-between items-center"
          >
            <span>{patient.nome}</span>
            <button
              onClick={() => handlePatientClick(patient.cpf)}
              className="ml-4 p-1 bg-green-500 text-white rounded hover:bg-green-600"
              disabled={loading}
            >
              Ver Detalhes
            </button>
          </li>
        ))}
      </ul>

      {/* Detalhes do paciente selecionado */}
      {selectedPatient && (
        <div className="mt-6 p-4 bg-white border border-gray-300 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Detalhes do Paciente</h2>
          <p>
            <strong>Nome:</strong> {selectedPatient.nome}
          </p>
          <p>
            <strong>Idade:</strong> {selectedPatient.idade}
          </p>
          <p>
            <strong>CPF:</strong> {selectedPatient.cpf}
          </p>
          <p>
            <strong>RG:</strong> {selectedPatient.rg}
          </p>
          <p>
            <strong>Data de Nascimento:</strong> {selectedPatient.data_nasc}
          </p>
          <p>
            <strong>Sexo:</strong> {selectedPatient.sexo}
          </p>
          <p>
            <strong>Signo:</strong> {selectedPatient.signo}
          </p>
          <p>
            <strong>Mãe:</strong> {selectedPatient.mae}
          </p>
          <p>
            <strong>Pai:</strong> {selectedPatient.pai}
          </p>
          <p>
            <strong>Email:</strong> {selectedPatient.email}
          </p>
          <p>
            <strong>Senha:</strong> {selectedPatient.senha}
          </p>
          <p>
            <strong>CEP:</strong> {selectedPatient.cep}
          </p>
          <p>
            <strong>Endereço:</strong> {selectedPatient.endereco},{" "}
            {selectedPatient.numero}, {selectedPatient.bairro},{" "}
            {selectedPatient.cidade}/{selectedPatient.estado}
          </p>
          <p>
            <strong>Telefone Fixo:</strong> {selectedPatient.telefone_fixo}
          </p>
          <p>
            <strong>Celular:</strong> {selectedPatient.celular}
          </p>
          <p>
            <strong>Altura:</strong> {selectedPatient.altura}
          </p>
          <p>
            <strong>Peso:</strong> {selectedPatient.peso}
          </p>
          <p>
            <strong>Tipo Sanguíneo:</strong> {selectedPatient.tipo_sanguineo}
          </p>
          <p>
            <strong>Cor:</strong> {selectedPatient.cor}
          </p>

          {/* Botão para exportar os detalhes do paciente para CSV */}
          <button
            onClick={exportToCSV}
            className="mt-4 p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Exportar para CSV
          </button>
        </div>
      )}
    </div>
  );
}
