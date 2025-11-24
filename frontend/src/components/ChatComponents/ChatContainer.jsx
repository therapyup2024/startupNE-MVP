import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';

const ChatContainer = ({ conversation, currentUser, users, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  // Função para agrupar mensagens por data
  const groupMessagesByDate = (messages) => {
    if (!messages || messages.length === 0) return [];

    const groups = [];
    let currentGroup = [];
    let currentDate = '';

    messages.forEach((message, index) => {
      const messageDate = new Date(message.timestamp).toDateString();
      
      if (messageDate !== currentDate) {
        // Se for uma nova data, cria um novo grupo
        if (currentGroup.length > 0) {
          groups.push({
            date: currentDate,
            messages: currentGroup
          });
        }
        currentGroup = [message];
        currentDate = messageDate;
      } else {
        // Mesma data, adiciona ao grupo atual
        currentGroup.push(message);
      }

      // Última mensagem, adiciona o último grupo
      if (index === messages.length - 1) {
        groups.push({
          date: currentDate,
          messages: currentGroup
        });
      }
    });

    return groups;
  };

  // Função para formatar a data no estilo WhatsApp
  const formatDateHeader = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  // Tela inicial quando nenhuma conversa está selecionada
if (!conversation) {
  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center px-6 py-10 max-w-md">
        {/* Logo com leve animação */}
        <div className="mb-1 animate-fade-in">
          <img 
            src="src/assets/icon/Logo.png" 
            alt="Therapy" 
            className="w-24 h-28 mx-auto drop-shadow-md"
          />
        </div>

        {/* Título */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-2 tracking-wide">
          Chat Therapy
        </h1>

        {/* Subtítulo */}
        <p className="text-gray-600 mb-6 text-sm">
           Suas conversas são seguras e confidenciais.
        </p>

        {/* Mensagem de segurança */}
        
      </div>
    </div>
  );
}


  const user = users.find(u => u.id === conversation.userId);
  const messageGroups = groupMessagesByDate(conversation.messages);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: Date.now(),
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
      sender: 'me'
    };

    onSendMessage(conversation.id, message);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center space-x-3">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {user.name}
            </h2>
            <p
              className={`text-sm truncate ${
                user.status === "online" ? "text-green-500" : "text-gray-500"
              }`}
            >
              {user.status === "online" ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* Área de Mensagens */}
      <div
        className="flex-1 overflow-y-scroll bg-gray-50 min-h-0
  [&::-webkit-scrollbar]:w-[8px]
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-gray-400
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:border-[2px]  /* Borda transparente cria o espaçamento */
  [&::-webkit-scrollbar-thumb]:border-transparent
  [&::-webkit-scrollbar-thumb]:bg-clip-padding  /* Importante: faz o background não preencher a borda */
  [&::-webkit-scrollbar-thumb]:hover:bg-gray-500
  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
      >
        <div className="p-6  max-w-4xl mx-auto h-full">
          {messageGroups.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p>Nenhuma mensagem ainda</p>
              <p className="text-sm">Envie a primeira mensagem!</p>
            </div>
          ) : (
            messageGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-6">
                {/* Header da data */}
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {formatDateHeader(group.date)}
                  </div>
                </div>

                {/* Mensagens do grupo */}
                {group.messages.map((message) => (
                  <Message
                    key={message.id}
                    message={message}
                    isOwnMessage={message.sender === "me"}
                  />
                ))}
              </div>
            ))
          )}
          <div ref={messagesEndRef} className="pb-[1px]" />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 flex-shrink-0">
        <form onSubmit={handleSendMessage} className="flex space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed flex-shrink-0"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;