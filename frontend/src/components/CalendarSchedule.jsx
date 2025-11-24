import React, { useState, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Bell, 
  Phone, 
  Mail, 
  MapPin,
  Edit3,
  Trash2,
  X,
  Check,
  Search,
  Filter,
  ChevronRight
} from 'lucide-react';

// Configuração do localizador
const localizer = momentLocalizer(moment);

const CalendarioAgenda = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [activeTab, setActiveTab] = useState('proximos');
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [view, setView] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    paciente: '',
    data: '',
    horario: '',
    tipo: 'consulta',
    local: '',
    duracao: '1h',
    anotacoes: ''
  });

  // Gerar datas dinâmicas
  const getCurrentDate = () => moment().format('YYYY-MM-DD');
  const getDate = (daysFromNow) => moment().add(daysFromNow, 'days').format('YYYY-MM-DD');

  // Dados de exemplo atualizados
  const [eventos, setEventos] = useState([
    {
      id: '1',
      title: 'Ana Paula - Consulta',
      start: new Date(`${getCurrentDate()}T08:00:00`),
      end: new Date(`${getCurrentDate()}T09:00:00`),
      tipo: 'consulta',
      local: 'Centro',
      duracao: '1h',
      foto: 'https://randomuser.me/api/portraits/women/44.jpg',
      telefone: '(11) 99999-9999',
      email: 'ana.paula@email.com',
      anotacoes: 'Paciente em acompanhamento há 6 meses. Relatou melhora significativa nos últimos 30 dias.',
      historico: 'Consulta de retorno',
      nome: 'Ana Paula',
      backgroundColor: '#fef3c7',
      borderColor: '#f59e0b'
    },
    {
      id: '2',
      title: 'Plantão - Emergência',
      start: new Date(`${getDate(1)}T09:00:00`),
      end: new Date(`${getDate(1)}T10:00:00`),
      tipo: 'plantao',
      duracao: '1h',
      local: 'Online',
      anotacoes: 'Plantão de emergência - disponível para atendimentos urgentes',
      historico: 'Plantão regular',
      backgroundColor: '#dbeafe',
      borderColor: '#3b82f6'
    },
    {
      id: '3',
      title: 'Carlos Silva - Consulta',
      start: new Date(`${getCurrentDate()}T14:00:00`),
      end: new Date(`${getCurrentDate()}T15:00:00`),
      tipo: 'consulta',
      local: 'Online',
      duracao: '1h',
      foto: 'https://randomuser.me/api/portraits/men/32.jpg',
      telefone: '(11) 98888-8888',
      email: 'carlos.silva@email.com',
      anotacoes: 'Primeira consulta. Relatou ansiedade no trabalho.',
      historico: 'Consulta inicial',
      nome: 'Carlos Silva',
      backgroundColor: '#fef3c7',
      borderColor: '#f59e0b'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newId = (eventos.length + 1).toString();
    const backgroundColor = formData.tipo === 'consulta' ? '#fef3c7' : '#dbeafe';
    const borderColor = formData.tipo === 'consulta' ? '#f59e0b' : '#3b82f6';
    
    const startDateTime = new Date(`${formData.data}T${formData.horario}:00`);
    let endDateTime = new Date(startDateTime);
    
    // Converter duração
    const durationMatch = formData.duracao.match(/(\d+)(h|min)/);
    if (durationMatch) {
      const value = parseInt(durationMatch[1]);
      const unit = durationMatch[2];
      
      if (unit === 'h') {
        endDateTime.setHours(endDateTime.getHours() + value);
      } else if (unit === 'min') {
        endDateTime.setMinutes(endDateTime.getMinutes() + value);
      }
    }
    
    const newEvent = {
      id: newId,
      title: formData.tipo === 'consulta' ? `${formData.paciente} - Consulta` : 'Plantão',
      start: startDateTime,
      end: endDateTime,
      tipo: formData.tipo,
      local: formData.local,
      duracao: formData.duracao,
      anotacoes: formData.anotacoes,
      ...(formData.tipo === 'consulta' && {
        nome: formData.paciente,
        foto: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 70)}.jpg`,
        telefone: `(11) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
        email: `${formData.paciente.toLowerCase().replace(' ', '.')}@email.com`,
        historico: 'Consulta agendada'
      }),
      backgroundColor,
      borderColor
    };
    
    setEventos(prev => [...prev, newEvent]);
    setShowModal(false);
    setShowConfirmacao(true);
    setFormData({ 
      paciente: '', 
      data: '', 
      horario: '',
      tipo: 'consulta',
      local: '',
      duracao: '1h',
      anotacoes: '' 
    });
  };

  const handleSelectEvent = (event) => {
    setSelectedConsulta(event);
    setShowDetalhesModal(true);
  };

  const handleSelectSlot = ({ start, end }) => {
    setFormData(prev => ({
      ...prev,
      data: moment(start).format('YYYY-MM-DD'),
      horario: moment(start).format('HH:mm')
    }));
    setShowModal(true);
  };

  const handleEditarConsulta = () => {
    setShowDetalhesModal(false);
    setShowModal(true);
    
    if (selectedConsulta) {
      const startDate = new Date(selectedConsulta.start);
      
      // Calcular duração
      const diffMs = selectedConsulta.end - selectedConsulta.start;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const remainingMins = diffMins % 60;
      
      let duracao = '';
      if (diffHours > 0) {
        duracao = `${diffHours}h`;
        if (remainingMins > 0) {
          duracao += ` ${remainingMins}min`;
        }
      } else {
        duracao = `${diffMins}min`;
      }
      
      setFormData({
        paciente: selectedConsulta.nome || selectedConsulta.title.replace(' - Consulta', ''),
        data: moment(startDate).format('YYYY-MM-DD'),
        horario: moment(startDate).format('HH:mm'),
        tipo: selectedConsulta.tipo,
        local: selectedConsulta.local || '',
        duracao: duracao,
        anotacoes: selectedConsulta.anotacoes || ''
      });
    }
  };

  const handleExcluirConsulta = () => {
    if (selectedConsulta && selectedConsulta.id) {
      setEventos(prev => prev.filter(event => event.id !== selectedConsulta.id));
    }
    setShowDetalhesModal(false);
    setShowConfirmacao(true);
  };

  // Custom event style
  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.backgroundColor,
        border: `2px solid ${event.borderColor}`,
        borderRadius: '8px',
        color: '#1f2937',
        fontWeight: '500',
        fontSize: '12px',
        padding: '2px 4px'
      }
    };
  };

  // Filtrar eventos baseado na busca
  const eventosFiltrados = useMemo(() => {
    if (!searchTerm) return eventos;
    
    return eventos.filter(evento => 
      evento.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.local?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.tipo?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [eventos, searchTerm]);

  // Filtrar eventos para as seções
  const hoje = new Date();
  const eventosHoje = eventosFiltrados.filter(event => 
    moment(event.start).isSame(hoje, 'day')
  );

  const eventosProximos = eventosFiltrados.filter(event => 
    moment(event.start).isAfter(hoje) && 
    moment(event.start).isBefore(moment(hoje).add(7, 'days'))
  ).slice(0, 5);

  // Estatísticas
  const consultasHoje = eventosHoje.filter(event => event.tipo === 'consulta').length;
  const plantoesHoje = eventosHoje.filter(event => event.tipo === 'plantao').length;
  const horasLivres = 8 - eventosHoje.reduce((total, event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    return total + (end - start) / (1000 * 60 * 60);
  }, 0);

  // Views disponíveis
  const views = {
    month: true,
    week: true,
    day: true,
    agenda: true
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Calendário de Consultas</h1>
              <p className="text-gray-600">Gerencie sua agenda de atendimentos</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar paciente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter size={18} className="text-gray-600" />
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={18} />
                Nova Consulta
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col lg:flex-row gap-6 p-6">
          {/* Calendário Principal */}
          <div className="flex-1 min-w-0">
            {/* Calendário React Big Calendar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <Calendar
                localizer={localizer}
                events={eventosFiltrados}
                startAccessor="start"
                endAccessor="end"
                views={views}
                view={view}
                onView={setView}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                style={{ 
                  height: 'clamp(500px, 65vh, 800px)',
                  minHeight: '500px'
                }}
                eventPropGetter={eventStyleGetter}
                messages={{
                  next: "Próximo",
                  previous: "Anterior",
                  today: "Hoje",
                  month: "Mês",
                  week: "Semana",
                  day: "Dia",
                  agenda: "Lista",
                  date: "Data",
                  time: "Hora",
                  event: "Evento",
                  noEventsInRange: "Nenhum evento neste período"
                }}
              />
            </div>
          </div>

          {/* Sidebar Direita */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
            {/* Estatísticas */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Users size={18} className="text-blue-500" />
                Estatísticas do Dia
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="text-xl lg:text-2xl font-bold text-amber-600">{consultasHoje}</div>
                  <div className="text-xs text-amber-800">Consultas</div>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-xl lg:text-2xl font-bold text-blue-600">{plantoesHoje}</div>
                  <div className="text-xs text-blue-800">Plantões</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-xl lg:text-2xl font-bold text-gray-600">{horasLivres.toFixed(1)}</div>
                  <div className="text-xs text-gray-800">Horas Livres</div>
                </div>
              </div>
            </div>

            {/* Compromissos com Abas */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="flex border-b border-gray-200">
                <button 
                  onClick={() => setActiveTab('proximos')}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'proximos' 
                      ? 'text-blue-600 border-b-2 border-blue-500' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Próximos
                </button>
                <button 
                  onClick={() => setActiveTab('hoje')}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'hoje' 
                      ? 'text-blue-600 border-b-2 border-blue-500' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Hoje
                </button>
              </div>
              
              <div className="p-4 max-h-80 overflow-y-auto">
                {(activeTab === 'proximos' ? eventosProximos : eventosHoje).map((evento) => (
                  <div 
                    key={evento.id} 
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => {
                      setSelectedConsulta(evento);
                      setShowDetalhesModal(true);
                    }}
                  >
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      evento.tipo === 'consulta' ? 'bg-amber-500' : 'bg-blue-500'
                    }`}></div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {evento.tipo === 'consulta' ? evento.nome : 'Plantão'}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
                        <span>{moment(evento.start).format('HH:mm')}</span>
                        {evento.duracao && <span>• {evento.duracao}</span>}
                        {evento.local && <span className="truncate">• {evento.local}</span>}
                      </div>
                    </div>
                    
                    <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
                  </div>
                ))}
                
                {(activeTab === 'proximos' ? eventosProximos : eventosHoje).length === 0 && (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    <CalendarIcon size={24} className="mx-auto mb-2 text-gray-300" />
                    Nenhum compromisso {activeTab === 'proximos' ? 'próximo' : 'para hoje'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal de Nova Consulta */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Nova Consulta</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Compromisso
                </label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="consulta">Consulta</option>
                  <option value="plantao">Plantão</option>
                </select>
              </div>
              
              {formData.tipo === 'consulta' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Paciente
                  </label>
                  <input
                    type="text"
                    name="paciente"
                    value={formData.paciente}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Digite o nome do paciente"
                    required
                  />
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data
                  </label>
                  <input
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Horário
                  </label>
                  <input
                    type="time"
                    name="horario"
                    value={formData.horario}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Local
                  </label>
                  <select
                    name="local"
                    value={formData.local}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione...</option>
                    <option value="Consultório Centro">Consultório Centro</option>
                    <option value="Online">Online</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Hospital">Hospital</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duração
                  </label>
                  <select
                    name="duracao"
                    value={formData.duracao}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="30min">30 minutos</option>
                    <option value="45min">45 minutos</option>
                    <option value="1h">1 hora</option>
                    <option value="1h30min">1 hora e 30 minutos</option>
                    <option value="2h">2 horas</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Anotações
                </label>
                <textarea
                  name="anotacoes"
                  value={formData.anotacoes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Observações sobre a consulta..."
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Agendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Detalhes */}
      {showDetalhesModal && selectedConsulta && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Detalhes da Consulta</h2>
              <button 
                onClick={() => setShowDetalhesModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {selectedConsulta.tipo === 'consulta' && (
                <div className="flex items-center gap-4">
                  <img 
                    src={selectedConsulta.foto} 
                    alt={selectedConsulta.nome}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedConsulta.nome}</h3>
                    <p className="text-gray-600">{selectedConsulta.historico}</p>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CalendarIcon size={18} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Data</p>
                    <p className="font-medium text-gray-900">
                      {moment(selectedConsulta.start).format('DD/MM/YYYY')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Horário</p>
                    <p className="font-medium text-gray-900">
                      {moment(selectedConsulta.start).format('HH:mm')} - {moment(selectedConsulta.end).format('HH:mm')}
                    </p>
                  </div>
                </div>
                
                {selectedConsulta.local && (
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Local</p>
                      <p className="font-medium text-gray-900">{selectedConsulta.local}</p>
                    </div>
                  </div>
                )}
                
                {selectedConsulta.tipo === 'consulta' && (
                  <>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Telefone</p>
                        <p className="font-medium text-gray-900">{selectedConsulta.telefone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">E-mail</p>
                        <p className="font-medium text-gray-900">{selectedConsulta.email}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {selectedConsulta.anotacoes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Anotações</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {selectedConsulta.anotacoes}
                  </p>
                </div>
              )}
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleEditarConsulta}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit3 size={16} />
                  Editar
                </button>
                <button
                  onClick={handleExcluirConsulta}
                  className="flex-1 flex items-center justify-center gap-2 border border-red-300 text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação */}
      {showConfirmacao && (
        <div className="fixed inset-0  backdrop-blur-sm bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={24} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sucesso!</h3>
            <p className="text-gray-600 mb-6">Operação realizada com sucesso.</p>
            <button
              onClick={() => setShowConfirmacao(false)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarioAgenda;