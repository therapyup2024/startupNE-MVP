import React, { useState, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  MapPin,
  X,
  Search,
  Filter,
  ChevronRight,
  Video,
  Phone,
  User,
  Star,
  AlertCircle
} from 'lucide-react';

// Configuração do localizador
const localizer = momentLocalizer(moment);

const CalendarioPaciente = () => {
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [activeTab, setActiveTab] = useState('proximos');
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [view, setView] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');

  // Dados do paciente atual (mock)
  const pacienteAtual = {
    nome: 'João Silva',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    plano: 'Premium',
    proximaRenovacao: '2024-12-31'
  };

  // Gerar datas dinâmicas
  const getCurrentDate = () => moment().format('YYYY-MM-DD');
  const getDate = (daysFromNow) => moment().add(daysFromNow, 'days').format('YYYY-MM-DD');

  // Dados de exemplo para o paciente
  const [eventos, setEventos] = useState([
    {
      id: '1',
      title: 'Consulta com Dra. Ana Santos',
      start: new Date(`${getCurrentDate()}T08:00:00`),
      end: new Date(`${getCurrentDate()}T09:00:00`),
      tipo: 'consulta',
      local: 'Online',
      duracao: '1h',
      profissional: {
        nome: 'Dra. Ana Santos',
        especialidade: 'Psicóloga',
        foto: 'https://randomuser.me/api/portraits/women/44.jpg',
        avaliacao: 4.8,
        experiencia: '5 anos',
        telefone: '(11) 99999-9999',
        email: 'ana.santos@clinicapsi.com'
      },
      anotacoes: 'Consulta de acompanhamento semanal. Favor preparar relatório de humor.',
      status: 'confirmada',
      backgroundColor: '#f0f9ff',
      borderColor: '#0ea5e9'
    },
    {
      id: '2',
      title: 'Avaliação com Dr. Carlos Lima',
      start: new Date(`${getDate(2)}T14:00:00`),
      end: new Date(`${getDate(2)}T15:00:00`),
      tipo: 'consulta',
      local: 'Consultório Centro',
      duracao: '1h',
      profissional: {
        nome: 'Dr. Carlos Lima',
        especialidade: 'Psiquiatra',
        foto: 'https://randomuser.me/api/portraits/men/22.jpg',
        avaliacao: 4.9,
        experiencia: '8 anos',
        telefone: '(11) 98888-8888',
        email: 'carlos.lima@clinicapsi.com'
      },
      anotacoes: 'Primeira avaliação psiquiátrica. Trazer exames anteriores se houver.',
      status: 'confirmada',
      backgroundColor: '#f0fdf4',
      borderColor: '#22c55e'
    },
    {
      id: '3',
      title: 'Sessão de Terapia',
      start: new Date(`${getDate(5)}T10:00:00`),
      end: new Date(`${getDate(5)}T11:00:00`),
      tipo: 'consulta',
      local: 'Online',
      duracao: '1h',
      profissional: {
        nome: 'Dra. Mariana Oliveira',
        especialidade: 'Psicóloga',
        foto: 'https://randomuser.me/api/portraits/women/33.jpg',
        avaliacao: 4.7,
        experiencia: '6 anos',
        telefone: '(11) 97777-7777',
        email: 'mariana.oliveira@clinicapsi.com'
      },
      anotacoes: 'Sessão regular de terapia cognitivo-comportamental.',
      status: 'pendente',
      backgroundColor: '#fef7cd',
      borderColor: '#eab308'
    },
    {
      id: '4',
      title: 'Consulta de Retorno',
      start: new Date(`${getDate(7)}T16:00:00`),
      end: new Date(`${getDate(7)}T17:00:00`),
      tipo: 'consulta',
      local: 'Consultório Centro',
      duracao: '1h',
      profissional: {
        nome: 'Dra. Ana Santos',
        especialidade: 'Psicóloga',
        foto: 'https://randomuser.me/api/portraits/women/44.jpg',
        avaliacao: 4.8,
        experiencia: '5 anos',
        telefone: '(11) 99999-9999',
        email: 'ana.santos@clinicapsi.com'
      },
      anotacoes: 'Retorno para avaliação do tratamento.',
      status: 'confirmada',
      backgroundColor: '#f0f9ff',
      borderColor: '#0ea5e9'
    }
  ]);

  const handleSelectEvent = (event) => {
    setSelectedConsulta(event);
    setShowDetalhesModal(true);
  };

  // Custom event style
  const eventStyleGetter = (event) => {
    const statusColors = {
      confirmada: { bg: '#f0f9ff', border: '#0ea5e9' },
      pendente: { bg: '#fef7cd', border: '#eab308' },
      cancelada: { bg: '#fef2f2', border: '#ef4444' }
    };

    const colors = statusColors[event.status] || statusColors.confirmada;

    return {
      style: {
        backgroundColor: colors.bg,
        border: `2px solid ${colors.border}`,
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
      evento.profissional.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.profissional.especialidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.local.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [eventos, searchTerm]);

  // Filtrar eventos para as seções
  const hoje = new Date();
  const eventosHoje = eventosFiltrados.filter(event => 
    moment(event.start).isSame(hoje, 'day')
  );

  const eventosProximos = eventosFiltrados.filter(event => 
    moment(event.start).isAfter(hoje)
  ).slice(0, 5);

  const eventosPassados = eventosFiltrados.filter(event => 
    moment(event.start).isBefore(hoje)
  ).slice(0, 3);

  // Estatísticas
  const consultasHoje = eventosHoje.length;
  const consultasProximas = eventosProximos.length;
  const totalProfissionais = new Set(eventos.map(e => e.profissional.nome)).size;

  // Views disponíveis
  const views = {
    month: true,
    week: true,
    day: true,
    agenda: true
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmada: { color: 'bg-green-100 text-green-800', label: 'Confirmada' },
      pendente: { color: 'bg-yellow-100 text-yellow-800', label: 'Pendente' },
      cancelada: { color: 'bg-red-100 text-red-800', label: 'Cancelada' }
    };
    
    const config = statusConfig[status] || statusConfig.pendente;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleJoinCall = () => {
    if (selectedConsulta) {
      alert(`Conectando com ${selectedConsulta.profissional.nome}...`);
      // Aqui iria a lógica para entrar na chamada
    }
  };

  return (
    // REMOVIDA: div com flex e PatientSidebar
    // CONTEÚDO DIRETO:
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Minhas Consultas</h1>
            <p className="text-gray-600">Acompanhe sua agenda de atendimentos</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar profissional..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={18} className="text-gray-600" />
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
              selectable={false}
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
                noEventsInRange: "Nenhuma consulta neste período"
              }}
            />
          </div>
        </div>

        {/* Sidebar Direita */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
          {/* Informações do Paciente */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={pacienteAtual.foto} 
                alt={pacienteAtual.nome}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{pacienteAtual.nome}</h3>
                <p className="text-sm text-gray-600">Plano {pacienteAtual.plano}</p>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Próxima renovação: {moment(pacienteAtual.proximaRenovacao).format('DD/MM/YYYY')}
            </div>
          </div>

          {/* Estatísticas */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users size={18} className="text-purple-500" />
              Consultas do dia
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-purple-50 rounded-lg border border-purple-200 col-span-2">
                <div className="text-xl lg:text-2xl font-bold text-purple-600">{consultasHoje}</div>
                <div className="text-xs text-purple-800">Hoje</div>
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
                Próximas
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
              <button 
                onClick={() => setActiveTab('passadas')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'passadas' 
                    ? 'text-blue-600 border-b-2 border-blue-500' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Passadas
              </button>
            </div>
            
            <div className="p-4 max-h-80 overflow-y-auto">
              {(activeTab === 'proximos' ? eventosProximos : 
                activeTab === 'hoje' ? eventosHoje : eventosPassados).map((evento) => (
                <div 
                  key={evento.id} 
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => {
                    setSelectedConsulta(evento);
                    setShowDetalhesModal(true);
                  }}
                >
                  <img 
                    src={evento.profissional.foto} 
                    alt={evento.profissional.nome}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {evento.profissional.nome.split(' ')[0]}
                      </p>
                      {getStatusBadge(evento.status)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
                      <span>{moment(evento.start).format('HH:mm')}</span>
                      <span>•</span>
                      <span className="truncate">{evento.local}</span>
                    </div>
                  </div>
                  
                  <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
                </div>
              ))}
              
              {(activeTab === 'proximos' ? eventosProximos : 
                activeTab === 'hoje' ? eventosHoje : eventosPassados).length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm">
                  <CalendarIcon size={24} className="mx-auto mb-2 text-gray-300" />
                  Nenhuma consulta {activeTab === 'proximos' ? 'próxima' : 
                  activeTab === 'hoje' ? 'para hoje' : 'passada'}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Detalhes da Consulta */}
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
              {/* Informações do Profissional */}
              <div className="flex items-center gap-4">
                <img 
                  src={selectedConsulta.profissional.foto} 
                  alt={selectedConsulta.profissional.nome}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedConsulta.profissional.nome}
                  </h3>
                  <p className="text-gray-600">{selectedConsulta.profissional.especialidade}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-700">{selectedConsulta.profissional.avaliacao}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{selectedConsulta.profissional.experiencia} de experiência</span>
                  </div>
                </div>
                {getStatusBadge(selectedConsulta.status)}
              </div>
              
              {/* Detalhes da Consulta */}
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
                
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Local</p>
                    <p className="font-medium text-gray-900">{selectedConsulta.local}</p>
                  </div>
                </div>

                {selectedConsulta.local === 'Online' && (
                  <div className="flex items-center gap-3">
                    <Video size={18} className="text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Tipo</p>
                      <p className="font-medium text-gray-900">Consulta Online</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Informações de Contato */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Contato do Profissional</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedConsulta.profissional.telefone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedConsulta.profissional.email}</span>
                  </div>
                </div>
              </div>
              
              {/* Anotações */}
              {selectedConsulta.anotacoes && (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <AlertCircle size={16} className="text-gray-400" />
                    Observações
                  </h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg text-sm">
                    {selectedConsulta.anotacoes}
                  </p>
                </div>
              )}
              
              {/* Ações */}
              <div className="flex gap-3 pt-4 border-t">
                {selectedConsulta.local === 'Online' && selectedConsulta.status === 'confirmada' && (
                  <button
                    onClick={handleJoinCall}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Video size={18} />
                    Entrar na Consulta
                  </button>
                )}
                                
                <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Remarcar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarioPaciente;