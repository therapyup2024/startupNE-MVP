// src/components/ProntuarioComponents/RecordTemplateManager.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Edit2, Eye, Trash2 } from 'lucide-react';
import { defaultRecordTemplate } from './defaultRecordTemplate';
import ConfirmationModal from './ConfirmationModal';
import RecordTemplateViewModal from './RecordTemplateViewModal'; // Este é o modal que você colou por engano

// Lógica de localStorage para os modelos
const MOCK_TEMPLATES_INICIAL = [
  { 
    id: "custom-1", 
    name: "Meu Modelo de Anamnese",
    fields: [
      { id: "nome", label: "Nome do Paciente", type: "text" },
      { id: "queixa_principal", label: "Queixa Principal (Custom)", type: "textarea" },
    ]
  }
];
const TEMPLATES_KEY = "therapy_templates"; // Chave do localStorage

export default function RecordTemplateManager() {
  const navigate = useNavigate();
  const [customTemplates, setCustomTemplates] = useState([]);
  const [viewingTemplate, setViewingTemplate] = useState(null);
  const [templateToConfirmDelete, setTemplateToConfirmDelete] = useState(null);

  // Carregar modelos do localStorage
  useEffect(() => {
    const dadosSalvos = localStorage.getItem(TEMPLATES_KEY);
    if (dadosSalvos && JSON.parse(dadosSalvos).length > 0) {
      setCustomTemplates(JSON.parse(dadosSalvos));
    } else {
      setCustomTemplates(MOCK_TEMPLATES_INICIAL);
      localStorage.setItem(TEMPLATES_KEY, JSON.stringify(MOCK_TEMPLATES_INICIAL));
    }
  }, []);

  // Funções para os botões de ação
  const handleDeleteClick = (template) => {
    setTemplateToConfirmDelete(template);
  };

  const handleConfirmDelete = () => {
    if (!templateToConfirmDelete) return;
    const novosTemplates = customTemplates.filter(t => t.id !== templateToConfirmDelete.id);
    setCustomTemplates(novosTemplates);
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(novosTemplates));
    setTemplateToConfirmDelete(null);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50">

      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gerenciar Modelos de Prontuário</h1>
              <p className="text-gray-600">Crie e edite seus modelos de formulário.</p>
            </div>
            <button
              onClick={() => navigate('/gestao-prontuarios/modelos/novo')}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <Plus size={18} />
              Criar Novo Modelo
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Modelo Padrão */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FileText className="text-gray-400" size={20} />
                <h3 className="text-lg font-semibold text-gray-800">{defaultRecordTemplate.name}</h3>
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">Padrão</span>
              </div>
              <div>
                <button
                  onClick={() => setViewingTemplate(defaultRecordTemplate)}
                  className="text-blue-600 hover:text-blue-900 p-2"
                  title="Visualizar"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Modelos Customizados */}
          {customTemplates.map(template => (
            <div key={template.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FileText className="text-violet-600" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">{template.name}</h3>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => setViewingTemplate(template)}
                    className="text-blue-600 hover:text-blue-900 p-2"
                    title="Visualizar"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => navigate(`/gestao-prontuarios/modelos/editar/${template.id}`)}
                    className="text-violet-600 hover:text-violet-900 p-2"
                    title="Editar"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(template)}
                    className="text-red-600 hover:text-red-900 p-2"
                    title="Excluir"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Renderize os dois modais */}
      {viewingTemplate && (
        <RecordTemplateViewModal
          template={viewingTemplate}
          onClose={() => setViewingTemplate(null)}
        />
      )}

      {templateToConfirmDelete && (
        <ConfirmationModal
          isOpen={true}
          title="Confirmar Exclusão"
          message={`Tem certeza que deseja excluir o modelo "${templateToConfirmDelete.name}"? Esta ação não pode ser desfeita.`}
          onClose={() => setTemplateToConfirmDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}