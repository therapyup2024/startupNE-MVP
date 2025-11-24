// src/components/ProntuarioComponents/PatientRecordEditor.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2 } from 'lucide-react';
import { defaultRecordTemplate } from "./defaultRecordTemplate";
import SuccessModal from './SucessModal'; // Corrigido para "SucessModal" (1 'c')
import WarningModal from './WarningModal';

// --- Mocks dos Modelos ---
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
// -------------------------

const inputStyle = "w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 placeholder-gray-500";
const labelStyle = "block text-sm font-medium text-gray-800 mb-1.5";

// Componente "helper" para renderizar o campo certo
function RenderField({ field, value, onChange }) {
  const { id, label, type, options } = field;

  switch (type) {
    case 'textarea':
      return (
        <div className="md:col-span-3"> 
          <label className={labelStyle}>{label}</label>
          <textarea name={id} value={value} onChange={onChange} rows="3" className={inputStyle} placeholder={label}></textarea>
        </div>
      );
    case 'date':
      return (
        <div>
          <label className={labelStyle}>{label}</label>
          <input type="date" name={id} value={value} onChange={onChange} className={inputStyle} />
        </div>
      );
    case 'number':
       return (
        <div>
          <label className={labelStyle}>{label}</label>
          <input type="number" name={id} value={value} onChange={onChange} className={inputStyle} placeholder={label} />
        </div>
      );
    case 'radio':
      return (
        <div>
          <label className={labelStyle}>{label}</label>
          <div className="flex gap-4 mt-2">
            {options.map(opt => (
              <label key={opt} className="flex items-center gap-2">
                <input type="radio" name={id} value={opt} checked={value === opt} onChange={onChange} className="focus:ring-violet-500 text-violet-600" />
                <span className="text-gray-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      );
    case 'select':
      return (
        <div>
          <label className={labelStyle}>{label}</label>
          <select name={id} value={value} onChange={onChange} className={inputStyle}>
            <option value="">Selecione...</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      );
    default: // 'text'
      return (
        <div>
          <label className={labelStyle}>{label}</label>
          <input type="text" name={id} value={value} onChange={onChange} className={inputStyle} placeholder={label} />
        </div>
      );
  }
}

export default function PatientRecordEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [template, setTemplate] = useState(null); 
  const [formData, setFormData] = useState({}); 
  const [sessoes, setSessoes] = useState([]); 
  const [novaSessao, setNovaSessao] = useState({ data: "", atividade: "", obs: "" });
  const [nomePaciente, setNomePaciente] = useState(""); 
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const todosPacientes = JSON.parse(localStorage.getItem("therapy_pacientes") || "[]");
    const pacienteAtual = todosPacientes.find(p => p.id === id);
    if (!pacienteAtual) { alert("Paciente não encontrado!"); navigate("/gestao-prontuarios"); return; }
    const templateEncontrado = allTemplates.find(t => t.id === pacienteAtual.templateId);
    if (!templateEncontrado) { alert("Modelo de prontuário não encontrado! Usando o padrão."); setTemplate(defaultRecordTemplate); } else { setTemplate(templateEncontrado); }
    setNomePaciente(pacienteAtual.nome);
    setFormData(pacienteAtual.prontuarioData || {});
    setSessoes(pacienteAtual.sessoes || []);
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSessaoChange = (e) => {
    const { name, value } = e.target;
    setNovaSessao(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSessao = (e) => {
    e.preventDefault(); 
    if (novaSessao.data && novaSessao.atividade) {
      setSessoes(prev => [...prev, { id: Date.now(), ...novaSessao }]);
      setNovaSessao({ data: "", atividade: "", obs: "" });
    } else {
      setShowWarning(true);
    }
  };
  
  const handleRemoveSessao = (id) => {
    setSessoes(prev => prev.filter(s => s.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const todosPacientes = JSON.parse(localStorage.getItem("therapy_pacientes") || "[]");
    const pacientesAtualizados = todosPacientes.map(p => {
      if (p.id === id) {
        return { ...p, nome: formData.nome || nomePaciente, prontuarioData: formData, sessoes: sessoes, status: "Ativo" };
      }
      return p;
    });
    localStorage.setItem("therapy_pacientes", JSON.stringify(pacientesAtualizados));
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/gestao-prontuarios"); 
  };

  // #########################################
  // ## CORREÇÃO ESTÁ AQUI ##
  // #########################################
  if (!template) {
    // Se o template ainda é 'null', mostre uma tela de carregamento.
    // O 'return' impede o resto do código de ser executado.
    return (
      <div className="flex h-screen w-full bg-gray-50">
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-700">Carregando prontuário...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gray-50">

      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-5">
          <h1 className="text-2xl font-bold text-gray-900">
            {`Editando Prontuário de ${nomePaciente}`}
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="flex-1 p-6 overflow-y-auto space-y-8">
          
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 border-gray-300 border-b pb-3 mb-6">
              {template.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
              {template.fields.map(field => (
                <RenderField
                  key={field.id}
                  field={field}
                  value={formData[field.id] || ""}
                  onChange={handleChange}
                />
              ))}
            </div>
          </section>
          
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-3 mb-6">Registro Simplificado dos Atendimentos</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 border border-gray-300 rounded-lg bg-gray-50 mb-6">
              <div className="md:col-span-1">
                <label className={labelStyle}>Data</label>
                <input type="date" name="data" value={novaSessao.data} onChange={handleSessaoChange} className={inputStyle} />
              </div>
              <div className="md:col-span-2">
                <label className={labelStyle}>Atividade Realizada</label>
                <input type="text" name="atividade" value={novaSessao.atividade} onChange={handleSessaoChange} className={inputStyle} placeholder="Resumo da sessão" />
              </div>
              <div className="md:col-span-4">
                <label className={labelStyle}>Observações</label>
                <textarea name="obs" value={novaSessao.obs} onChange={handleSessaoChange} rows="2" className={inputStyle} placeholder="Observações..."></textarea>
              </div>
              <div className="md:col-span-4 text-right">
                <button 
                  type="button" 
                  onClick={handleAddSessao} 
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus size={18} /> Adicionar Sessão
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Atividade Realizada</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Obs.</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Ação</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sessoes.map((sessao) => (
                    <tr key={sessao.id}>
                      <td className="px-4 py-3 text-sm text-gray-700">{sessao.data}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{sessao.atividade}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{sessao.obs}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveSessao(sessao.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Remover Sessão"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {sessoes.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-4 py-4 text-center text-sm text-gray-500">Nenhuma sessão registrada.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <div className="flex justify-end pt-4 pb-10">
            <button type="submit" className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg">
              <Save size={18} />
              Salvar Prontuário
            </button>
          </div>
        </form>
      </main>

      <SuccessModal
        isOpen={showSuccess}
        title="Prontuário Salvo!"
        message="As informações do paciente foram atualizadas com sucesso."
        onClose={handleSuccessClose}
      />
      
      <WarningModal
        isOpen={showWarning}
        title="Campos Obrigatórios"
        message="Por favor, preencha pelo menos a Data e a Atividade."
        onClose={() => setShowWarning(false)}
      />
    </div>
  );
}