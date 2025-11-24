import React, { useState } from "react";
const mockData = [
  {
    id: 1,
    nome: "Cleber",
    data: "20/03/2020",
    preco: "R$ 100,00",
    status: "Agendada",
    avatar: "",
  },
  {
    id: 2,
    nome: "Izaque",
    data: "02/06/2025",
    preco: "R$ 60,00",
    status: "Concluída",
    avatar: "",
  },
  {
    id: 3,
    nome: "Sarris",
    data: "15/09/2025",
    preco: "R$ 80,00",
    status: "Concluída",
    avatar: "",
  },
  {
    id: 4,
    nome: "Guanabara",
    data: "31/07/2025",
    preco: "R$ 100,00",
    status: "Concluída",
    avatar: "",
  },
  {
    id: 5,
    nome: "José",
    data: "08/16/2024",
    preco: "R$ 100,00",
    status: "Cancelada",
    avatar: "",
  },
];

// --- função para as cores de status (usada na tabela) ---
const getStatusClasses = (status) => {
  switch (status) {
    case "Agendada":
      return "text-yellow-800 bg-yellow-100";
    case "Concluída":
      return "text-green-800 bg-green-100";
    case "Cancelada":
      return "text-red-700 bg-red-100";
    default:
      return "text-gray-800 bg-gray-100";
  }
};

// vai criar um componente de paginação (os numeros de paginas)
function Paginacao({ paginaAtual, totalPaginas, onMudarPagina }) {
  const getPageButtonClass = (pagina) =>
    pagina === paginaAtual
      ? "px-4 py-2 text-sm text-white bg-indigo-700 rounded-md shadow"
      : "px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100";

  const navigationButtonClass =
    "px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        className={navigationButtonClass}
        onClick={() => onMudarPagina(paginaAtual - 1)}
        disabled={paginaAtual === 1}
      >
        Anterior
      </button>

      {[...Array(totalPaginas)].map((_, index) => (
        <button
          key={index + 1}
          className={getPageButtonClass(index + 1)}
          onClick={() => onMudarPagina(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className={navigationButtonClass}
        onClick={() => onMudarPagina(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
      >
        Próximo
      </button>
    </div>
  );
}

function FiltrosBusca() {
  return (
    <div className="flex justify-end space-x-3 items-center">
      {}
      <button className="flex items-center text-sm text-gray-600 font-semibold transition duration-150 hover:text-gray-900">
        Status ▾
      </button>
      <button className="flex items-center text-sm text-gray-600 font-semibold transition duration-150 hover:text-gray-900">
        Data ▾
      </button>
      <input
        type="text"
        placeholder="Buscar..."
        className="border border-gray-300 px-3 py-1.5 rounded-md text-sm w-48 
                  focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-500"
      />
    </div>
  );
}

function TabelaConsultas({ consultas }) {
  return (
    <div className="overflow-x-auto">
      {/* table-fixed garante que as larguras funcionem */}
      <table className="min-w-full divide-y divide-gray-200 mt-6 **table-fixed**">
        <thead>
          <tr className="text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
            {/* Nome (Reduzido para 1/3 para "empurrar" o resto para a direita) */}
            <th className="py-3 pl-8 pr-2 **w-1/3**">Nome do Cliente</th>

            {/* Data (Centralizado) */}
            <th className="py-3 px-2 w-1/5 **text-center**">Data</th>

            {/* Preço (Centralizado) */}
            <th className="py-3 px-2 w-1/5 **text-center**">Preço</th>

            {/* Status (Centralizado) */}
            <th className="py-3 px-2 w-auto **text-center**">Status</th>

            {/* Opções (Centralizado, ajustando largura e padding direito) */}
            <th className="py-3 pl-2 **pr-8 w-16 text-center**">Opções</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {consultas.map((consulta) => (
            <tr
              key={consulta.id}
              className="hover:bg-gray-50 transition duration-150"
            >
              {/* Nome do Cliente */}
              <td className="py-4 pl-8 pr-2 text-sm text-gray-900 break-words">
                <div className="flex items-center">
                  <img
                    className="h-9 w-9 rounded-full mr-3 object-cover bg-gray-200"
                    src={consulta.avatar}
                    alt={consulta.nome}
                  />
                  {consulta.nome}
                </div>
              </td>

              {/* Data: Centralizado */}
              <td className="py-4 px-2 text-sm text-gray-600 **text-center**">
                {consulta.data}
              </td>

              {/* Preço: Centralizado */}
              <td className="py-4 px-2 text-sm text-gray-600 **text-center**">
                {consulta.preco}
              </td>

              {}
              <td className="py-4 px-2 **flex justify-center items-center h-full**">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
                    consulta.status
                  )}`}
                >
                  {consulta.status}
                </span>
              </td>

              {}
              <td className="py-4 pl-2 pr-8 text-sm font-medium **text-center**">
                <button className="text-indigo-500 hover:text-indigo-800 p-2 text-lg rounded-full **bg-indigo-100/50** transition duration-150 ease-in-out">
                  i
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  const [consultas] = useState(mockData);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const totalPaginas = Math.ceil(mockData.length / 3) || 1; // calcula o numero de pagina basedo na qunatidade de pessoas por pagina

  const handleMudarPagina = (novaPagina) => {
    if (novaPagina >= 1 && novaPagina <= totalPaginas) {
      setPaginaAtual(novaPagina);
    }
  };

  const itensPorPagina = 10; // quantidedade de itens por página(clientes por pagina)
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const consultasPaginadas = consultas.slice(inicio, fim);

  return (
    <div className="App flex bg-gray-100 min-h-screen">
      
      <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-9xl">
        {/* --- Título e Filtros Alinhados Lateralmente --- */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Histórico de Consultas
          </h2>
          <FiltrosBusca />
        </div>

        <TabelaConsultas consultas={consultasPaginadas} />

        <hr className="my-6 border-gray-100" />

        <Paginacao
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          onMudarPagina={handleMudarPagina}
        />
      </div>
    </div>
  );
}
