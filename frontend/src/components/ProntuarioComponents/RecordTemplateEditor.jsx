// src/components/ProntuarioComponents/RecordTemplateEditor.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Plus, Trash2 } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';
import SuccessModal from './SucessModal'; 
import WarningModal from './WarningModal'; // 1. Importe o WarningModal

const TEMPLATES_KEY = "therapy_templates";

// --- DICIONÁRIO DE TRADUÇÃO ---
const fieldTypeTranslations = {
  text: "Texto Curto",
  textarea: "Texto Longo",
  date: "Data",
  number: "Número",
  select: "Seleção (Múltipla Escolha)",
  radio: "Botão (Sim/Não)",
};
// ----------------------------

// --- ESTILOS PADRONIZADOS ---
const inputStyle = "w-full p-2 bg-transparent border-0 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:ring-0 focus:border-violet-500 placeholder-gray-500";
const labelStyle = "block text-sm font-medium text-gray-700";
// ----------------------------

export default function RecordTemplateEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [templateName, setTemplateName] = useState("");
  const [fields, setFields] = useState([]);
  
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState("text"); 

  // Modais
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  
  // 2. Adicione o estado para o novo modal de aviso
  const [showWarning, setShowWarning] = useState(false);

  // Carrega o modelo se estiver editando
  useEffect(() => {
    if (id) {
      const todosTemplates = JSON.parse(localStorage.getItem(TEMPLATES_KEY) || "[]");
      const templateAtual = todosTemplates.find(t => t.id === id);
      
      if (templateAtual) {
        setTemplateName(templateAtual.name);
        setFields(templateAtual.fields || []);
      } else {
        alert("Modelo não encontrado!");
        navigate("/gestao-prontuarios/modelos");
      }
    }
  }, [id, navigate]);

  // 3. ADEQUAÇÃO: Adicione o 'else' para mostrar o aviso
  const handleAddField = (e) => {
    e.preventDefault();
    if (newFieldLabel && newFieldType) { // Se o nome do campo NÃO está vazio
      const newField = {
        id: `field-${Date.now()}`,
        label: newFieldLabel,
        type: newFieldType,
        options: newFieldType === 'radio' ? ['Sim', 'Não'] : [] 
      };
      setFields(prev => [...prev, newField]);
      setNewFieldLabel("");
      setNewFieldType("text");
    } else {
      // Se o nome do campo ESTÁ vazio
      setShowWarning(true);
    }
  };

  const handleRemoveField = (fieldId) => {
    setShowConfirmDelete(fieldId);
  };

  const confirmRemoveField = () => {
    if (!showConfirmDelete) return;
    setFields(prev => prev.filter(f => f.id !== showConfirmDelete));
    setShowConfirmDelete(null);
  };
  
  const handleSaveTemplate = () => {
    const todosTemplates = JSON.parse(localStorage.getItem(TEMPLATES_KEY) || "[]");
    const novoTemplate = {
      id: id || `custom-${Date.now()}`,
      name: templateName || "Modelo sem nome",
      fields: fields
    };

    let templatesAtualizados = [];
    if (id) {
      templatesAtualizados = todosTemplates.map(t => t.id === id ? novoTemplate : t);
    } else {
      templatesAtualizados = [...todosTemplates, novoTemplate];
    }

    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templatesAtualizados));
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/gestao-prontuarios/modelos");
  };

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-5">
          <h1 className="text-2xl font-bold text-gray-900">
            {id ? `Editando Modelo: ${templateName}` : "Criar Novo Modelo de Prontuário"}
          </h1>
        </header>

        <div className="flex-1 p-6 overflow-y-auto space-y-8">
          
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <label className={labelStyle}>Nome do Modelo</label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Ex: Anamnese Adulto"
              className={inputStyle}
            />
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-3 mb-6">Campos do Formulário</h2>
            
            <div className="space-y-4 mb-6">
              {fields.length === 0 && (
                <p className="text-gray-500 text-center py-4">Nenhum campo adicionado.</p>
              )}
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-3 p-3 bg-white border-b-2 border-gray-200">
                  <span className="text-sm font-bold text-violet-600">{index + 1}.</span> 
                  <span className="font-medium text-gray-700 flex-1">{field.label}</span>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full capitalize">
                    {fieldTypeTranslations[field.type] || field.type}
                  </span>
                  <button type="button" onClick={() => handleRemoveField(field.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddField} className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 items-end p-4 border-t border-gray-300 pt-6">
              <div className="md:col-span-2">
                <label className={labelStyle}>Nome do Campo</label>
                <input
                  type="text"
                  value={newFieldLabel}
                  onChange={(e) => setNewFieldLabel(e.target.value)}
                  placeholder="Ex: Queixa Principal"
                  className={inputStyle}
                />
              </div>
              
              <div>
                <label className={labelStyle}>Tipo do Campo</label>
                <select value={newFieldType} onChange={(e) => setNewFieldType(e.target.value)} className={inputStyle}>
                  {Object.entries(fieldTypeTranslations).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <button type="submit" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <Plus size={18} /> Adicionar Campo
                </button>
              </div>
            </form>
          </section>
          
          <div className="flex justify-end pt-4 pb-10">
            <button
              type="button" 
              onClick={handleSaveTemplate}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg"
            >
              <Save size={18} />
              Salvar Modelo
            </button>
          </div>
        </div>
      </main>
      
      {/* Modais de Feedback */}
      <SuccessModal
        isOpen={showSuccess}
        title="Modelo Salvo!"
        message="Seu modelo de prontuário foi salvo com sucesso."
        onClose={handleSuccessClose}
      />
      
      <ConfirmationModal
        isOpen={!!showConfirmDelete}
        title="Excluir Campo"
        message="Tem certeza que deseja excluir este campo do formulário?"
        onClose={() => setShowConfirmDelete(null)}
        onConfirm={confirmRemoveField}
      />

      {/* 4. Renderize o novo WarningModal */}
      <WarningModal
        isOpen={showWarning}
        title="Campo Obrigatório"
        message="Por favor, preencha o 'Nome do Campo' antes de adicionar."
        onClose={() => setShowWarning(false)}
      />
    </div>
  );
}