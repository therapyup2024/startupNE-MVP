// src/components/ProntuarioComponents/CreatePatientRecordModal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { defaultRecordTemplate } from './defaultRecordTemplate'; // Ajuste o caminho se você moveu

// Mock para simular seus modelos. No futuro, isso viria de um banco.
const customTemplateMock = { 
  id: "custom-1", 
  name: "Anamnese Adulto (Customizado)",
  fields: [
    { id: "nome_paciente_custom", label: "Nome Paciente (Custom)", type: "text" },
    { id: "queixa_principal", label: "Queixa Principal (Custom)", type: "textarea" },
  ]
};
const templates = [defaultRecordTemplate, customTemplateMock];

export default function CreatePatientRecordModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [templateId, setTemplateId] = useState(defaultRecordTemplate.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Criar o novo paciente
    const novoPacienteId = `paciente-${Date.now()}`;
    const novoPaciente = {
      id: novoPacienteId,
      nome: nome,
      cpf: cpf,
      inicioTerapia: new Date().toLocaleDateString('pt-BR'), // Data de hoje
      status: "Pendente",
      templateId: templateId, // <<< Salva o ID do modelo que você escolheu
      prontuarioData: {}, // Prontuário em branco
      sessoes: [] // Sessões em branco
    };
    
    // 2. Salvar no localStorage
    // Lê os dados antigos, ou cria uma lista vazia
    const dadosAntigos = JSON.parse(localStorage.getItem("therapy_pacientes") || "[]");
    const novosDados = [...dadosAntigos, novoPaciente];
    localStorage.setItem("therapy_pacientes", JSON.stringify(novosDados));
    
    onClose(); // Fecha o modal
    
    // 3. Navega para a tela de edição para PREENCHER o prontuário
    navigate(`/gestao-prontuarios/editar/${novoPacienteId}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Criar Novo Prontuário</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Paciente
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome completo"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CPF (ou Identificador)
            </label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite o CPF"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modelo de Prontuário
            </label>
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
            >
              {templates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
            >
              Criar e Preencher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}