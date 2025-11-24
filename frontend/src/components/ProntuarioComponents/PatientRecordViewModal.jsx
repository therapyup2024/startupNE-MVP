// src/components/ProntuarioComponents/PatientRecordViewModal.jsx
import React, { useState, useEffect } from 'react';
import { X, FileText, Clock, Download } from 'lucide-react';
import { defaultRecordTemplate } from "./defaultRecordTemplate";

// Mocks dos Modelos (Precisa ser igual ao do seu Editor)
const customTemplateMock = { 
  id: "custom-1", 
  name: "Anamnese Adulto (Customizado)",
  fields: [
    { id: "nome", label: "Nome do Paciente", type: "text" },
    { id: "queixa_principal", label: "Queixa Principal (Custom)", type: "textarea" },
    { id: "historico_medico", label: "Histórico Médico (Custom)", type: "text" }
  ]
};
const allTemplates = [defaultRecordTemplate, customTemplateMock];

// Componente do menu lateral do modal (baseado na sua imagem)
function ModalSidebar({ activeTab, onTabClick }) {
  const tabs = [
    { id: 'formulario', label: 'Prontuário', icon: <FileText size={18} /> },
    { id: 'sessoes', label: 'Registro de Sessões', icon: <Clock size={18} /> },
  ];

  return (
    <nav className="w-1/4 bg-gray-50 border-r border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Seções
      </h3>
      <ul className="space-y-2">
        {tabs.map(tab => (
          <li key={tab.id}>
            <button
              onClick={() => onTabClick(tab.id)}
              className={`flex items-center gap-3 w-full p-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-violet-100 text-violet-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Componente principal do Modal
export default function PatientRecordViewModal({ paciente, onClose }) {
  const [activeTab, setActiveTab] = useState('formulario');
  const [template, setTemplate] = useState(null);

  // Carrega o template correto quando o modal abre
  useEffect(() => {
    const templateEncontrado = allTemplates.find(t => t.id === paciente.templateId);
    setTemplate(templateEncontrado || defaultRecordTemplate);
  }, [paciente]);

  const handleDownload = () => {
    alert(`Iniciando download do relatório de ${paciente.nome}...`);
    // Aqui entraria a lógica de geração de PDF
  };

  // Se o template não foi carregado, não mostre nada
  if (!template) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4 z-50">
      {/* Container do Modal (grande) */}
      <div className="bg-white rounded-xl max-w-4xl w-full h-[80vh] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            Prontuário de: {paciente.nome}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Corpo (Layout 2 Colunas) */}
        <div className="flex-1 flex min-h-0">
          {/* Menu Lateral */}
          <ModalSidebar activeTab={activeTab} onTabClick={setActiveTab} />
          
          {/* Conteúdo */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'formulario' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{template.name}</h3>
                <div className="space-y-4">
                  {template.fields.map(field => (
                    <div key={field.id}>
                      <label className="block text-sm font-medium text-gray-500">
                        {field.label}
                      </label>
                      <p className="text-gray-800 text-base mt-1">
                        {/* Mostra o dado preenchido ou um traço se estiver vazio */}
                        {paciente.prontuarioData[field.id] || '---'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'sessoes' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Registro de Atendimentos</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Atividade</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Observações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paciente.sessoes.length > 0 ? (
                      paciente.sessoes.map(sessao => (
                        <tr key={sessao.id}>
                          <td className="px-4 py-3 text-sm text-gray-700">{sessao.data}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{sessao.atividade}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{sessao.obs}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-4 py-4 text-center text-sm text-gray-500">Nenhuma sessão registrada.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download size={18} />
            Baixar Relatório
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}