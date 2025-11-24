import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SpecialistSidebar from './shared/Sidebar/SpecialisSidebar';

const SupportTherapy = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [activeFeature, setActiveFeature] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Adicionar as variáveis CSS ao estilo do componente
  const styles = `
    .theme-roxo {
      --background-roxo: linear-gradient(to bottom, #0f0623, #2b0f6b);
      --branco-default: #fff;
      --box-shadow-roxo: rgba(44, 0, 128, 0.15);
      --btn-color-roxo: #5a23c8;
      --btn-hover-roxo: #2b1e6b;
      --link-login: #b36be2;
      --link-login-hover: #5a23c8;
      --link-home-list-hover: #b150a4;
    }
    
    /* Animações personalizadas */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 0.5s ease-out;
    }
    
    .hover-lift {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .hover-lift:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .gradient-border {
      background: linear-gradient(white, white) padding-box,
                  linear-gradient(to right, #8B5CF6, #6366F1) border-box;
      border: 2px solid transparent;
    }
  `;

  // Auto-scroll para o final do chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const faqResponses = {
    contact: "Nossa equipe de suporte está disponível 24/7 no +55 (11) 1234-5678 ou suporte@therapy.com",
    faq: "Você pode encontrar nossa base de conhecimento completa em ajuda.therapy.com/faq",
    schedule: "Para remarcar consultas, vá ao seu painel → Consultas → Modificar",
    login: "Para problemas de login, tente redefinir sua senha ou entre em contato com o suporte técnico",
    billing: "Dúvidas sobre cobrança podem ser direcionadas para cobranca@therapy.com ou ligue para +55 (11) 1234-5679",
    technical: "Nossa equipe técnica pode ajudar com problemas na plataforma. Por favor, descreva seu problema."
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
    if (!isChatbotOpen) {
      // Adicionar mensagem de boas-vindas ao abrir o chatbot
      setTimeout(() => {
        const welcomeMessage = {
          id: Date.now(),
          text: "Olá! Eu sou seu Assistente Therapy. Como posso ajudá-lo hoje?",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [welcomeMessage]);
      }, 500);
    }
  };

  const sendMessage = async () => {
    const trimmedInput = userInput.trim();
    if (trimmedInput === '') return;

    const newMessage = {
      id: Date.now(),
      text: trimmedInput,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Adiciona a mensagem do usuário à lista imediatamente
    setMessages(prev => [...prev, newMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmedInput })
      });

      if (!response.ok) {
        throw new Error('Falha ao conectar com o servidor do chatbot');
      }

      const data = await response.json();
      let responseText = "Desculpe, não entendi.";

      if (data.status === 'success' && data.response) {
        responseText = data.response;
      }

      const botResponse = {
        id: Date.now() + 1,
        text: responseText,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error("Erro ao enviar mensagem para o chatbot:", error);
      
      const errorResponse = {
        id: Date.now() + 1,
        text: "Desculpe, o assistente está fora do ar. Tente novamente mais tarde.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickReplies = [
    "Como remarcar consulta?",
    "Problemas de login",
    "Dúvida sobre cobrança",
    "Falar com atendente"
  ];

  const handleQuickReply = (reply) => {
    setUserInput(reply);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const supportFeatures = [
    { 
      icon: 'fa-phone', 
      title: 'Falar com Atendente', 
      description: 'Obtenha assistência imediata da nossa equipe de suporte',
      action: 'contact',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      icon: 'fa-book', 
      title: 'Base de Conhecimento', 
      description: 'Navegue por nosso FAQ abrangente e guias',
      action: 'faq',
      color: 'from-violet-500 to-violet-600'
    },
    { 
      icon: 'fa-calendar-alt', 
      title: 'Remarcar Consultas', 
      description: 'Aprenda a gerenciar suas consultas',
      action: 'schedule',
      color: 'from-indigo-500 to-indigo-600'
    },
    { 
      icon: 'fa-key', 
      title: 'Problemas de Login', 
      description: 'Solucione problemas de senha e acesso',
      action: 'login',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      icon: 'fa-credit-card', 
      title: 'Cobrança e Planos', 
      description: 'Informações sobre pagamentos e assinaturas',
      action: 'billing',
      color: 'from-purple-600 to-purple-700'
    },
    { 
      icon: 'fa-tools', 
      title: 'Suporte Técnico', 
      description: 'Obtenha ajuda com problemas técnicos na plataforma',
      action: 'technical',
      color: 'from-indigo-600 to-indigo-700'
    }
  ];

  const handleFeatureClick = (feature) => {
    setActiveFeature(feature);
    
    const question = `Preciso de ajuda com ${feature.title.toLowerCase()}`;
    setUserInput(question);
    
    if (!isChatbotOpen) {
      toggleChatbot();
    }
  };

  return (
    <div className="theme-roxo min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 font-sans">
      <style jsx>{styles}</style>
      
      {/* Adicione o Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <div className="min-h-screen flex">
        <SpecialistSidebar activeItem="suporte" />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-60 h-60 bg-indigo-500 rounded-full filter blur-3xl"></div>
            </div>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10">
              <div className="lg:w-2/3 text-center lg:text-left animate-fade-in-up">
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Como podemos ajudá-lo hoje?
                </h1>
                <p className="text-xl opacity-90 mb-8 max-w-2xl">
                  Obtenha suporte instantâneo para suas necessidades na plataforma Therapy
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center space-x-2 hover-lift">
                    <i className="fas fa-circle text-green-400 text-xs"></i>
                    <span>Suporte 24/7 Disponível</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center space-x-2 hover-lift">
                    <i className="fas fa-circle text-green-400 text-xs"></i>
                    <span>Tempo Médio de Resposta: 5min</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3 mt-12 lg:mt-0 flex justify-center">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="absolute inset-4 bg-white/5 rounded-full animate-ping"></div>
                  <div className="absolute inset-8 bg-white/5 rounded-full flex items-center justify-center">
                    <i className="fas fa-comments text-white text-5xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions Grid */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                  Opções de Suporte Rápido
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Escolha entre nossas categorias de suporte mais comuns para obter ajuda mais rapidamente
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {supportFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-xl p-6 cursor-pointer transition-all duration-300 hover-lift gradient-border group ${
                      activeFeature?.action === feature.action 
                        ? 'shadow-lg transform scale-105 ring-2 ring-purple-500' 
                        : 'shadow-md'
                    }`}
                    onClick={() => handleFeatureClick(feature)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <i className={`fas ${feature.icon}`}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                      <div className="text-gray-400 group-hover:text-purple-500 transition-colors duration-300 transform group-hover:translate-x-1">
                        <i className="fas fa-chevron-right"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Dynamic Help Section */}
          <section id="help-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {activeFeature ? `Ajuda com ${activeFeature.title}` : 'Precisa de Assistência?'}
              </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                {activeFeature 
                  ? `Veja como podemos ajudá-lo com ${activeFeature.title.toLowerCase()}. Nossa equipe de suporte está disponível 24/7 para atendê-lo.`
                  : 'Selecione uma opção acima para obter ajuda específica, ou converse com nosso assistente virtual para suporte imediato.'
                }
              </p>
              
              {activeFeature && (
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <button 
                    onClick={() => setIsChatbotOpen(true)}
                    className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3 hover:from-purple-700 hover:to-indigo-800"
                  >
                    <i className="fas fa-comment"></i>
                    <span>Iniciar Chat sobre {activeFeature.title}</span>
                  </button>
                  <button className="bg-green-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3 hover:bg-green-600">
                    <i className="fas fa-phone"></i>
                    <span>Ligar para Suporte</span>
                  </button>
                  <button className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center space-x-3 hover-lift">
                    <i className="fas fa-envelope"></i>
                    <span>Enviar Email</span>
                  </button>
                </div>
              )}

              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                <div className="text-center p-6 bg-white rounded-xl shadow-sm hover-lift">
                  <i className="fas fa-clock text-3xl text-purple-600 mb-4"></i>
                  <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600 font-medium">Suporte Disponível</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm hover-lift">
                  <i className="fas fa-user-md text-3xl text-purple-600 mb-4"></i>
                  <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
                  <div className="text-sm text-gray-600 font-medium">Profissionais</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm hover-lift">
                  <i className="fas fa-stopwatch text-3xl text-purple-600 mb-4"></i>
                  <div className="text-3xl font-bold text-purple-600 mb-2">5min</div>
                  <div className="text-sm text-gray-600 font-medium">Tempo Médio de Resposta</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm hover-lift">
                  <i className="fas fa-star text-3xl text-purple-600 mb-4"></i>
                  <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
                  <div className="text-sm text-gray-600 font-medium">Taxa de Satisfação</div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
                Perguntas Frequentes
              </h2>
              <div className="space-y-6">
                {[
                  {
                    question: "Como remarcar minha consulta?",
                    answer: "Você pode remarcar consultas do seu painel na seção 'Consultas'. Selecione a consulta que deseja alterar e clique em 'Remarcar'."
                  },
                  {
                    question: "O que devo fazer se não consigo fazer login?",
                    answer: "Use o recurso 'Esqueci minha senha' na página de login. Se continuar com problemas, entre em contato com nossa equipe de suporte técnico."
                  },
                  {
                    question: "Como atualizar meu método de pagamento?",
                    answer: "Vá para Configurações → Cobrança → Métodos de Pagamento para atualizar seu cartão de crédito ou outras informações de pagamento."
                  },
                  {
                    question: "Minha sessão é confidencial?",
                    answer: "Sim, todas as sessões de terapia são completamente confidenciais e criptografadas. Seguimos rigorosos padrões de privacidade e conformidade com a LGPD."
                  },
                  {
                    question: "Como cancelar minha assinatura?",
                    answer: "Você pode cancelar sua assinatura a qualquer momento em Configurações → Assinatura → Cancelar Assinatura. O cancelamento é efetivo imediatamente."
                  },
                  {
                    question: "Quais formas de pagamento são aceitas?",
                    answer: "Aceitamos cartão de crédito (Visa, Mastercard, American Express), PIX e boleto bancário. Todas as transações são seguras e criptografadas."
                  }
                ].map((faq, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 rounded-xl hover:border-purple-300 transition-all duration-300 overflow-hidden hover-lift"
                  >
                    <button 
                      className="w-full px-8 py-6 text-left font-semibold text-gray-800 flex justify-between items-center hover:text-purple-600 transition-colors duration-300 bg-gray-50 hover:bg-purple-50"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="text-lg">{faq.question}</span>
                      <i 
                        className={`fas ${expandedFaq === index ? 'fa-minus' : 'fa-plus'} text-purple-500 transform transition-transform duration-300`}
                      ></i>
                    </button>
                    <div 
                      className={`px-8 overflow-hidden transition-all duration-300 ${
                        expandedFaq === index ? 'max-h-96 py-6' : 'max-h-0 py-0'
                      }`}
                    >
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Additional Resources */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-indigo-50">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-12">
                Recursos Adicionais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm hover-lift border border-purple-100 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6 text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-video"></i>
                  </div>
                  <h3 className="font-semibold text-xl mb-4 text-gray-800">Tutoriais em Vídeo</h3>
                  <p className="text-gray-600 leading-relaxed">Aprenda a usar nossa plataforma com vídeos passo a passo</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm hover-lift border border-purple-100 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-6 text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-file-pdf"></i>
                  </div>
                  <h3 className="font-semibold text-xl mb-4 text-gray-800">Documentação</h3>
                  <p className="text-gray-600 leading-relaxed">Guias detalhados e documentação para todos os recursos</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm hover-lift border border-purple-100 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-6 text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-users"></i>
                  </div>
                  <h3 className="font-semibold text-xl mb-4 text-gray-800">Fórum da Comunidade</h3>
                  <p className="text-gray-600 leading-relaxed">Conecte-se com outros usuários e compartilhe experiências</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Chatbot Toggle */}
      <div 
        className={`fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-full flex items-center justify-center cursor-pointer shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50 ${
          isChatbotOpen ? 'hidden' : ''
        }`}
        onClick={toggleChatbot}
        aria-label="Abrir suporte por chat"
      >
        <i className="fas fa-comments text-xl"></i>
        <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
      </div>

      {/* Chatbot Container */}
      {isChatbotOpen && (
        <div className="fixed bottom-8 right-8 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-purple-200 animate-fade-in-up">
          {/* Chatbot Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <i className="fas fa-robot"></i>
              </div>
              <div>
                <h3 className="font-semibold">Assistente Therapy</h3>
                <div className="flex items-center space-x-1 text-sm opacity-90">
                  <i className="fas fa-circle text-green-400 text-xs"></i>
                  <span>Online</span>
                </div>
              </div>
            </div>
            <button 
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
              onClick={toggleChatbot}
              aria-label="Fechar chat"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Chat Messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 p-4 bg-gradient-to-b from-purple-50 to-white overflow-y-auto"
          >
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <i className="fas fa-robot text-4xl text-purple-500 mb-4"></i>
                <p className="text-gray-600 mb-4">Olá! Estou aqui para ajudar. Como posso ajudá-lo hoje?</p>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="bg-white border border-purple-200 rounded-lg px-3 py-2 text-sm hover:bg-purple-50 transition-colors duration-300 text-gray-700 hover:text-purple-600 hover-lift"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md rounded-2xl p-4 ${
                        message.isUser
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-br-none'
                          : 'bg-white border border-purple-200 text-gray-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                      <div className={`text-xs mt-1 ${message.isUser ? 'text-purple-100' : 'text-gray-500'}`}>
                        <i className="fas fa-clock mr-1"></i>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-purple-200 rounded-2xl rounded-bl-none p-4 shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-purple-200 bg-white">
            <div className="flex space-x-2">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem aqui..."
                rows="1"
                className="flex-1 px-4 py-3 border border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || userInput.trim() === ''}
                className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-full flex items-center justify-center hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Enviar mensagem"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTherapy;