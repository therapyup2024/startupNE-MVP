// src/components/ProntuarioComponents/RecordTemplateViewModal.jsx
import React, { useState } from 'react';
import { X, FileText, Eye } from 'lucide-react';

// 1. ADICIONADO: Dicionário de tradução
const fieldTypeTranslations = {
  text: "Texto Curto",
  textarea: "Texto Longo",
  date: "Data",
  number: "Número",
  select: "Seleção (Múltipla Escolha)",
  radio: "Botão (Sim/Não)",
};

// Componente do menu lateral interno do modal
function ModalSidebar({ activeTab, onTabClick }) {
  // ... (Esta parte não muda)
  const tabs = [
    { id: 'fields', label: 'Campos do Formulário', icon: <FileText size={18} /> },
  ];

  return (
    <nav className="w-1/3 md:w-1/4 bg-gray-50 border-r border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">
        Seções do Modelo
      </h3>
      <ul className="space-y-1">
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
              <span className="text-sm">{tab.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Componente principal do Modal
export default function RecordTemplateViewModal({ template, onClose }) {
  const [activeTab, setActiveTab] = useState('fields');

  if (!template) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full h-[80vh] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            Visualizar Modelo: {template.name}
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Campos do Formulário
              </h3>
              <Eye size={20} className="text-gray-500" />
            </div>

            {activeTab === 'fields' && (
              <div className="space-y-3 p-4 border rounded-md bg-gray-50">
                {template.fields.map((field, index) => (
                  <div key={field.id} className="flex justify-between items-center p-3 bg-white border rounded-md shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-violet-600">{index + 1}.</span> 
                      <span className="font-medium text-gray-800">{field.label}</span>
                    </div>
                    
                    {/* 2. ADEQUAÇÃO AQUI: Usando o dicionário para traduzir */}
                    <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full capitalize">
                      {fieldTypeTranslations[field.type] || field.type}
                    </span>
                  </div>
                ))}
                {template.fields.length === 0 && (
                   <p className="text-gray-500 text-center py-4">Este modelo ainda não possui campos.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}