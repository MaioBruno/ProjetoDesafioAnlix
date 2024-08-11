"use client";

// Importa componentes e funcionalidades do Chart.js e React Chart.js 2
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useEffect, useState } from "react";

// Registra os componentes necessários do Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale
);

// Componente que renderiza um gráfico de linha com base nos dados das características dos pacientes
export default function PatientCharacteristicChart({ data }) {
  // Estado para armazenar os dados formatados do gráfico
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Hook useEffect para atualizar os dados do gráfico quando os dados de entrada mudam
  useEffect(() => {
    // Log dos dados recebidos para depuração
    console.log("Dados do gráfico:", data);

    // Verifica se há dados disponíveis para processamento
    if (data && data.length > 0) {
      // Mapeia os dados para extrair labels e valores
      const labels = data.map((c) =>
        new Date(c.date * 1000).toLocaleDateString()
      );
      const values = data.map((c) => c.value);

      // Atualiza o estado com os dados formatados para o gráfico
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Características", // Título da série de dados
            data: values, // Dados a serem exibidos no gráfico
            borderColor: "rgba(75,192,192,1)", // Cor da linha do gráfico
            backgroundColor: "rgba(75,192,192,0.2)", // Cor de fundo da linha do gráfico
            borderWidth: 1, // Largura da linha do gráfico
          },
        ],
      });
    }
  }, [data]); // O hook useEffect é acionado sempre que os dados são alterados

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">
        Gráfico das Características
      </h3>
      {/* Renderiza o gráfico de linha com os dados formatados */}
      <Line data={chartData} />
    </div>
  );
}
