// Este objeto define a estrutura do seu formulário padrão
export const defaultRecordTemplate = {
  id: "default-psychological",
  name: "Prontuário Psicológico Padrão",
  fields: [
    { id: "nome", label: "Nome do Paciente", type: "text" },
    { id: "dataNascimento", label: "Data de Nascimento", type: "date" },
    { id: "idade", label: "Idade", type: "number" },
    { id: "sexo", label: "Sexo", type: "select", options: ["Feminino", "Masculino", "Outro"] },
    { id: "estadoCivil", label: "Estado Civil", type: "text" },
    { id: "grauInstrucao", label: "Grau de Instrução", type: "text" },
    { id: "profissao", label: "Profissão", type: "text" },
    { id: "contatoEmergencia", label: "Contato para emergência", type: "text" },
    { id: "foneEmergencia", label: "Fone", type: "text" },
    { id: "rg", label: "RG", type: "text" },
    { id: "cpf", label: "CPF", type: "text" },
    { id: "endereco", label: "Endereço", type: "text" },
    { id: "bairro", label: "Bairro", type: "text" },
    { id: "cidade", label: "Cidade", type: "text" },
    { id: "tomaMedicacao", label: "Toma Medicação?", type: "text" },
    { id: "nomePai", label: "Nome do Pai", type: "text" },
    { id: "nomeMae", label: "Nome da Mãe", type: "text" },
    { id: "indicacao", label: "Indicação/Outro", type: "text" },
    { id: "fezTerapia", label: "Já fez terapia?", type: "radio", options: ["Sim", "Não"] },
    { id: "motivoConsulta", label: "Motivo de Consulta", type: "textarea" },
    { id: "hipoteseDiagnostica", label: "Intuição da Psicóloga/Hipótese Diagnóstica", type: "textarea" },
    { id: "pagamentoTipo", label: "Pagamento", type: "radio", options: ["Por sessão", "Mensal"] },
    { id: "pagamentoValor", label: "Valor", type: "text" }, // Pode ser 'number'
    { id: "pagamentoDia", label: "Dia", type: "text" }, // Pode ser 'number'
    { id: "inicioTerapia", label: "Início da Terapia", type: "date" },
    { id: "terminoTerapia", label: "Término da Terapia", type: "date" },
    { id: "desfecho", label: "Desfecho", type: "radio", options: ["CONCLUÍDO", "DESISTENTE"] },
    { id: "avaliacao", label: "Avaliação", type: "textarea" },
  ]
};