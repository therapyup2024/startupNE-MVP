// src/components/ProntuarioComponents/PatientRecordList.jsx
import React, { useState, useEffect, useMemo } from 'react'; // 1. Importe o useMemo
import { useNavigate } from 'react-router-dom';
// 2. Importe os ícones de seta
import { User, FilePen, Trash2, Plus, Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react'; 
import CreatePatientRecordModal from './CreatePatientRecordModal';
import PatientRecordViewModal from './PatientRecordViewModal'; 
import ConfirmationModal from './ConfirmationModal';

// Mova os mocks para fora, apenas para inicialização
const MOCK_PACIENTES_INICIAL = [
  { id: 1, nome: "Ana Paula", cpf: "123.456.789-00", inicioTerapia: "20/03/2024", status: "Ativo", templateId: "default-psychological", prontuarioData: {}, sessoes: [] },
  { id: 2, nome: "Carlos Silva", cpf: "987.654.321-00", inicioTerapia: "15/01/2023", status: "Ativo", templateId: "default-psychological", prontuarioData: {}, sessoes: [] },
  { id: 3, nome: "Bruno Lima", cpf: "111.222.333-44", inicioTerapia: "05/06/2024", status: "Pendente", templateId: "custom-1", prontuarioData: {}, sessoes: [] },
  { id: 4, nome: "Daniela Costa", cpf: "222.333.444-55", inicioTerapia: "10/07/2024", status: "Ativo", templateId: "default-psychological", prontuarioData: {}, sessoes: [] },
  { id: 5, nome: "Eduardo Reis", cpf: "333.444.555-66", inicioTerapia: "12/08/2024", status: "Ativo", templateId: "default-psychological", prontuarioData: {}, sessoes: [] },
  { id: 6, nome: "Fernanda Dias", cpf: "444.555.666-77", inicioTerapia: "14/09/2024", status: "Ativo", templateId: "default-psychological", prontuarioData: {}, sessoes: [] },
  { id: 7, nome: "Gabriel Matos", cpf: "555.666.777-88", inicioTerapia: "16/10/2024", status: "Ativo", templateId: "default-psychological", prontuarioData: {}, sessoes: [] },
  { id: 8, nome: "Heloísa Pinto", cpf: "666.777.888-99", inicioTerapia: "18/11/2024", status: "Ativo", templateId: "default-psychological", prontuarioData: {}, sessoes: [] },
  { id: 9, nome: "Igor Valente", cpf: "777.888.999-00", inicioTerapia: "20/12/2024", status: "Ativo", templateId: "default-psychological", prontuarioData: {}, sessoes: [] },
  { id: 10, nome: "Júlia Andrade", cpf: "888.999.000-11", inicioTerapia: "22/01/2025", status: "Ativo", templateId: "default-psychological", prontuarioData: {}, sessoes: [] },
  { id: 11, nome: "Lucas Mendes", cpf: "999.000.111-22", inicioTerapia: "24/02/2025", status: "Ativo", templateId: "default-psychological", prontuarioData: {}, sessoes: [] },
];

const RESULTS_PER_PAGE = 10; // 3. Defina quantos itens por página

// 4. Função 'helper' para gerar o array de páginas
const getPaginationRange = (currentPage, totalPages, siblingCount = 1) => {
  const totalPageNumbers = siblingCount + 5; 

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, '...', totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + 1 + i);
    return [firstPageIndex, '...', ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
    return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
  }
  return [];
};


export default function PatientRecordList() {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [viewingPatient, setViewingPatient] = useState(null);
  const [patientToConfirmDelete, setPatientToConfirmDelete] = useState(null);
  
  // 5. Adicione o estado da página atual
  const [currentPage, setCurrentPage] = useState(1); 

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("therapy_pacientes");
    if (dadosSalvos && JSON.parse(dadosSalvos).length > 0) {
      setPacientes(JSON.parse(dadosSalvos));
    } else {
      setPacientes(MOCK_PACIENTES_INICIAL);
      localStorage.setItem("therapy_pacientes", JSON.stringify(MOCK_PACIENTES_INICIAL));
    }
  }, []);

  // --- 6. LÓGICA DE PAGINAÇÃO ---
  const totalPages = Math.ceil(pacientes.length / RESULTS_PER_PAGE);
  
  // Filtra os pacientes a serem mostrados na página atual
  const pacientesPaginados = useMemo(() => {
    const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
    const endIndex = startIndex + RESULTS_PER_PAGE;
    return pacientes.slice(startIndex, endIndex);
  }, [currentPage, pacientes]);
  
  // Gera os números dos botões (ex: [1, 2, '...', 9, 10])
  const paginationRange = getPaginationRange(currentPage, totalPages) || [];
  
  const onNext = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const onPrevious = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  // Calcula o texto "Mostrando 1 a 10..."
  const startResult = (currentPage - 1) * RESULTS_PER_PAGE + 1;
  const endResult = Math.min(currentPage * RESULTS_PER_PAGE, pacientes.length);
  // --- FIM DA LÓGICA ---


  const handleEdit = (id) => {
    navigate(`/gestao-prontuarios/editar/${id}`);
  };

  const handleDeleteClick = (paciente) => {
    setPatientToConfirmDelete(paciente);
  };

  const handleConfirmDelete = () => {
    if (!patientToConfirmDelete) return;
    const novosPacientes = pacientes.filter(p => p.id !== patientToConfirmDelete.id);
    setPacientes(novosPacientes);
    localStorage.setItem("therapy_pacientes", JSON.stringify(novosPacientes));
    setPatientToConfirmDelete(null);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50">

      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-5">
          {/* ... (Seu cabeçalho com o botão 'Criar Novo Prontuário') ... */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestão de Prontuários</h1>
              <p className="text-gray-600">Visualize e gerencie os prontuários dos seus pacientes.</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <Plus size={18} />
              Preecher Prontuário
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
            {/* ... (Sua barra de busca) ... */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar por nome ou CPF..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          {/* Container da Tabela + Paginação */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3">Paciente</th>
                  <th className="px-6 py-3">CPF</th>
                  <th className="px-6 py-3">Início da Terapia</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* 7. Altere 'pacientes' para 'pacientesPaginados' */}
                {pacientesPaginados.map((paciente) => (
                  <tr key={paciente.id}>
                    {/* ... (Suas <td>s da tabela) ... */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center">
                          <User size={20} className="text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{paciente.nome}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.cpf}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.inicioTerapia}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${paciente.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {paciente.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button onClick={() => setViewingPatient(paciente)} className="text-blue-600 hover:text-blue-900 p-2" title="Visualizar"><Eye size={18} /></button>
                      <button onClick={() => handleEdit(paciente.id)} className="text-violet-600 hover:text-violet-900 p-2" title="Editar"><FilePen size={18} /></button>
                      <button onClick={() => handleDeleteClick(paciente)} className="text-red-600 hover:text-red-900 p-2" title="Excluir"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* 8. ADICIONADO: Seção de Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center bg-white px-4 py-3 border-t border-gray-200">
                {/* Texto "Showing..." */}
                <div>
                  <p className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">{startResult}</span> a <span className="font-medium">{endResult}</span> de <span className="font-medium">{pacientes.length}</span> resultados
                  </p>
                </div>

                {/* Botões de Paginação */}
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={onPrevious}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {/* Mapeia os números/reticências */}
                  {paginationRange.map((pageNumber, index) => {
                    if (pageNumber === '...') {
                      return (
                        <span key={`dots-${index}`} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                          ...
                        </span>
                      );
                    }
                    const isActive = pageNumber === currentPage;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                          ${isActive
                            ? 'z-10 bg-violet-600 border-violet-600 text-white'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }
                        `}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  <button
                    onClick={onNext}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            )}
            {/* Fim da Seção de Paginação */}

          </div>
        </div>
      </main>

      {/* Modais */}
      <CreatePatientRecordModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
      {viewingPatient && (
        <PatientRecordViewModal
          paciente={viewingPatient}
          onClose={() => setViewingPatient(null)}
        />
      )}
      {patientToConfirmDelete && (
        <ConfirmationModal
          isOpen={true}
          title="Confirmar Exclusão"
          message={`Tem certeza que deseja excluir o prontuário de ${patientToConfirmDelete.nome}? Esta ação não pode ser desfeita.`}
          onClose={() => setPatientToConfirmDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}