import React, { useState } from "react";

/* Ícones SVG */
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    className="w-5 h-5 text-indigo-600"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    className="w-5 h-5 text-indigo-600"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    className="w-5 h-5 text-indigo-600"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

/* Dados com email e telefone */
const mockData = [
  {
    id: 1,
    nome: "Cleber",
    data: "20/03/2020",
    preco: "R$ 100,00",
    avatar: "",
    email: "cleber@email.com",
    telefone: "(11) 98765-4321",
  },
  {
    id: 2,
    nome: "Izaque",
    data: "02/06/2025",
    preco: "R$ 60,00",
    avatar: "",
    email: "izaque@email.com",
    telefone: "(21) 99876-5432",
  },
  {
    id: 3,
    nome: "Sarris",
    data: "15/09/2025",
    preco: "R$ 80,00",
    avatar: "",
    email: "sarris@email.com",
    telefone: "(31) 91234-5678",
  },
  {
    id: 4,
    nome: "Guanabara",
    data: "31/07/2025",
    preco: "R$ 100,00",
    avatar: "",
    email: "guanabara@email.com",
    telefone: "(41) 98765-1234",
  },
  {
    id: 5,
    nome: "José",
    data: "08/16/2024",
    preco: "R$ 100,00",
    avatar: "",
    email: "jose@email.com",
    telefone: "(51) 99988-7766",
  },
];

/* ---------- Popup de Sucesso (Aceitar/Recusar) ---------- */
function PopupSucesso({ tipo, nome, onClose }) {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isAceito = tipo === "aceito";

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg text-white font-medium text-sm transition-all ${
          isAceito ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {isAceito ? <CheckIcon /> : <XIcon />}
        <span>
          Cliente <strong>{nome}</strong> {isAceito ? "aceito" : "recusado"} com
          sucesso!
        </span>
        <button
          onClick={onClose}
          className="ml-3 text-white/80 hover:text-white transition"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

/* ---------- Popup de Detalhes do Cliente ---------- */
function PopupDetalhes({ cliente, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Detalhes do Cliente
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <UserIcon />
            <div>
              <p className="text-sm font-medium text-gray-500">Nome</p>
              <p className="text-base font-semibold text-gray-900">
                {cliente.nome}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <EmailIcon />
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-base text-gray-900">{cliente.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <PhoneIcon />
            <div>
              <p className="text-sm font-medium text-gray-500">Telefone</p>
              <p className="text-base text-gray-900">{cliente.telefone}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Paginação ---------- */
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

      {[...Array(totalPaginas)].map((_, i) => (
        <button
          key={i + 1}
          className={getPageButtonClass(i + 1)}
          onClick={() => onMudarPagina(i + 1)}
        >
          {i + 1}
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

/* ---------- Filtros ---------- */
function FiltrosBusca() {
  return (
    <div className="flex justify-end space-x-3 items-center">
      <button className="flex items-center text-sm text-gray-600 font-semibold transition duration-150 hover:text-gray-900">
        Data
      </button>
      <input
        type="text"
        placeholder="Buscar..."
        className="border border-gray-300 px-3 py-1.5 rounded-md text-sm w-48 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-500"
      />
    </div>
  );
}

/* ---------- Tabela ---------- */
function TabelaConsultas({ consultas, onVerDetalhes, onAceitar, onRecusar }) {
  return (
    <div className="overflow-x-auto flex-1">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
            <th className="py-3 pl-8 pr-2">Nome do Cliente</th>
            <th className="py-3 px-2 w-1/5 text-center">Data</th>
            <th className="py-3 px-2 w-1/5 text-center">Preço</th>
            <th className="py-3 px-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {consultas.map((consulta) => (
            <tr
              key={consulta.id}
              className="hover:bg-gray-50 transition duration-150"
            >
              {/* NOME CLICÁVEL → abre popup de detalhes */}
              <td className="py-4 pl-8 pr-2 text-sm text-gray-900 break-words">
                <button
                  onClick={() => onVerDetalhes(consulta)}
                  className="flex items-center hover:text-indigo-600 transition font-medium"
                >
                  <img
                    className="h-9 w-9 rounded-full mr-3 object-cover bg-gray-200"
                    src={consulta.avatar}
                    alt={consulta.nome}
                  />
                  {consulta.nome}
                </button>
              </td>

              <td className="py-4 px-2 text-sm text-gray-600 text-center">
                {consulta.data}
              </td>

              <td className="py-4 px-2 text-sm text-gray-600 text-center">
                {consulta.preco}
              </td>

              {/* BOTÕES: ACEITAR e RECUSAR */}
              <td className="py-4 px-2">
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => onAceitar(consulta)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-full hover:bg-green-200 transition duration-150"
                  >
                    <CheckIcon />
                    Aceitar
                  </button>

                  <button
                    onClick={() => onRecusar(consulta)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded-full hover:bg-red-200 transition duration-150"
                  >
                    <XIcon />
                    Recusar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- App Principal ---------- */
export default function PSlist() {
  const [consultas] = useState(mockData);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [popupSucesso, setPopupSucesso] = useState(null);
  const [popupDetalhes, setPopupDetalhes] = useState(null);

  const itensPorPagina = 10;
  const totalPaginas = Math.ceil(consultas.length / itensPorPagina) || 1;

  const handleMudarPagina = (novaPagina) => {
    if (novaPagina >= 1 && novaPagina <= totalPaginas) {
      setPaginaAtual(novaPagina);
    }
  };

  const handleAceitar = (cliente) => {
    setPopupSucesso({ tipo: "aceito", nome: cliente.nome });
  };

  const handleRecusar = (cliente) => {
    setPopupSucesso({ tipo: "recusado", nome: cliente.nome });
  };

  const handleVerDetalhes = (cliente) => {
    setPopupDetalhes(cliente);
  };

  const fecharPopup = () => {
    setPopupSucesso(null);
    setPopupDetalhes(null);
  };

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const consultasPaginadas = consultas.slice(inicio, fim);

  return (
    // ALTURA FIXA - ocupa 100% da altura disponível com scroll interno
    <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-9xl h-full flex flex-col">
      {/* Cabeçalho - altura fixa */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-3xl font-bold text-gray-900">
          Lista de Clientes
        </h2>
        <FiltrosBusca />
      </div>

      {/* Área da tabela - ocupa o espaço restante com scroll */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <TabelaConsultas
          consultas={consultasPaginadas}
          onVerDetalhes={handleVerDetalhes}
          onAceitar={handleAceitar}
          onRecusar={handleRecusar}
        />
      </div>

      {/* Paginação - altura fixa no final */}
      <div className="mt-6">
        <hr className="mb-6 border-gray-100" />
        <Paginacao
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          onMudarPagina={handleMudarPagina}
        />
      </div>

      {/* Popup de Sucesso */}
      {popupSucesso && (
        <PopupSucesso
          tipo={popupSucesso.tipo}
          nome={popupSucesso.nome}
          onClose={fecharPopup}
        />
      )}

      {/* Popup de Detalhes */}
      {popupDetalhes && (
        <PopupDetalhes cliente={popupDetalhes} onClose={fecharPopup} />
      )}
    </div>
  );
}

/* Animações */
const style = document.createElement("style");
style.innerHTML = `
  @keyframes slideUp {
    from { transform: translateY(100px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-slide-up { animation: slideUp 0.4s ease-out; }
  .animate-fade-in { animation: fadeIn 0.3s ease-out; }
`;
document.head.appendChild(style);