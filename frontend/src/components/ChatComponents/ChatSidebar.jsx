import React from 'react';

const ChatSidebar = ({ users, conversations, currentConversation, onSelectConversation, currentUser }) => {
  
  // Função para calcular o total de mensagens não lidas
  const getTotalUnreadMessages = () => {
    return conversations.reduce((total, conversation) => {
      return total + (conversation.unread || 0);
    }, 0);
  };

  const getLastMessageTime = (conversation) => {
    if (!conversation.messages || conversation.messages.length === 0) return '';
    
    const timestamp = conversation.lastActivity || 
                     conversation.messages[conversation.messages.length - 1].timestamp;
    
    const messageDate = new Date(timestamp);
    const today = new Date();
    
    if (messageDate.toDateString() === today.toDateString()) {
      return messageDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    }
    
    return messageDate.toLocaleDateString('pt-BR', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getLastMessagePreview = (conversation) => {
    if (conversation.lastMessage) {
      return conversation.lastMessage.length > 35 
        ? conversation.lastMessage.substring(0, 35) + '...' 
        : conversation.lastMessage;
    }
    
    if (conversation.messages.length === 0) return 'Nenhuma mensagem';
    
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    const preview = lastMessage.text.length > 35 
      ? lastMessage.text.substring(0, 35) + '...' 
      : lastMessage.text;
    
    return preview;
  };

  const getLastMessageSender = (conversation) => {
    if (conversation.messages.length === 0) return null;
    
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    return lastMessage.sender;
  };

  const getSenderIndicator = (conversation) => {
    const lastSender = getLastMessageSender(conversation);
    
    if (lastSender === 'me') {
      return (
        <span className="text-gray-600 mr-1">Você:</span>
      );
    } 
    
    return null;
  };

  const totalUnread = getTotalUnreadMessages();

  const getSubtitle = () => {
    if (currentUser.role === 'Psicóloga' || currentUser.role === 'Psiquiatra') {
      return 'Converse com seus pacientes';
    } else {
      return 'Converse com profissionais';
    }
  };

  // Verifica se não há conversas
  const hasConversations = conversations && conversations.length > 0;

  return (
    <div className="w-full md:w-1/3 bg-white border-r border-gray-200 flex flex-col min-h-0">
      {/* Header com contador de mensagens */}
      <div className="p-4 border-gray-200 flex-shrink-0 h-20 flex flex-col justify-center">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold text-gray-800">Chat Therapy</h1>
          {totalUnread > 0 ? (
            <span className="bg-purple-500 text-white text-xs font-semibold rounded-full px-2 py-1 min-w-6 h-6 flex items-center justify-center">
              {totalUnread}
            </span>
          ) : (
            <span className="bg-gray-200 text-gray-500 text-xs font-semibold rounded-full px-2 py-1 min-w-6 h-6 flex items-center justify-center">
              0
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600">{getSubtitle()}</p>
      </div>

      {/* Lista de Conversas ou Estado Vazio */}
      <div className="flex-1 overflow-y-scroll bg-gray-50 min-h-0
  [&::-webkit-scrollbar]:w-[8px]
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-gray-400
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:border-[2px]
  [&::-webkit-scrollbar-thumb]:border-transparent
  [&::-webkit-scrollbar-thumb]:bg-clip-padding
  [&::-webkit-scrollbar-thumb]:hover:bg-gray-500
  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        
        {!hasConversations ? (
          // Estado Vazio - quando não há conversas
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma conversa
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              {currentUser.role === 'Psicóloga' || currentUser.role === 'Psiquiatra' 
                ? 'Quando pacientes entrarem em contato, as conversas aparecerão aqui.'
                : 'Quando você iniciar uma conversa com um profissional, ela aparecerá aqui.'
              }
            </p>
            
          </div>
        ) : (
          // Lista de Conversas - quando há conversas
          <div className="divide-y divide-gray-100">
            {conversations.map((conversation) => {
              const user = users.find((u) => u.id === conversation.userId);
              if (!user) return null;

              const isActive = currentConversation?.id === conversation.id;
              const lastSender = getLastMessageSender(conversation);

              return (
                <div
                  key={conversation.id}
                  className={`p-4 ml-2 cursor-pointer transition-colors rounded-md ${
                    isActive ? "bg-blue-50" : "hover:bg-gray-100"
                  }`}
                  onClick={() => onSelectConversation(conversation)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative flex-shrink-0">
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
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          user.status === "online"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className={`text-sm font-semibold truncate`}>
                          {user.name}
                        </h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0 ml-2">
                          {getLastMessageTime(conversation)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="flex items-center flex-1 min-w-0">
                          {getSenderIndicator(conversation)}
                          <p
                            className={`text-sm truncate ${
                              isActive ? "text-gray-700" : "text-gray-500"
                            } `}
                          >
                            {getLastMessagePreview(conversation)}
                          </p>
                        </div>
                        {conversation.unread > 0 && (
                          <span className="ml-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;