import React, { useState, useMemo } from 'react';
import ChatSidebar from './ChatComponents/ChatSidebar';
import ChatContainer from './ChatComponents/ChatContainer';

// Mock data para PROFISSIONAL
const currentUser = {
  id: 'me',
  name: 'Dra. Ana Santos',
  avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
  role: 'Psicóloga'
};

const users = [
  {
    id: '1',
    name: 'José Henrique',
    role: 'Paciente',
    specialty: 'Terapia Cognitivo-Comportamental',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    status: 'online'
  },
  {
    id: '2',
    name: 'Amanda',
    role: 'Paciente', 
    specialty: 'Ansiedade',
    avatar:  null,
    status: 'offline'
  },
  {
    id: '3',
    name: 'Victor Sarrís',
    role: 'Paciente',
    specialty: 'Depressão',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'online'
  }
  ,
  {
    id: '4',
    name: 'Izaque Nicolas',
    role: 'Paciente',
    specialty: 'Depressão',
    avatar: null,
    status: 'offline'
  },
  {
    id: '5',
    name: 'Sabrina Laís',
    role: 'Paciente',
    specialty: 'Depressão',
    avatar: null,
    status: 'offline'
  },
  {
    id: '6',
    name: 'Matheus',
    role: 'Paciente',
    specialty: 'Depressão',
    avatar: null,
    status: 'offline'
  }
  ,
  {
    id: '7',
    name: 'Cleber',
    role: 'Paciente',
    specialty: 'Depressão',
    avatar: null,
    status: 'offline'
  }
];

const initialConversations = [
  {
    id: '1',
    userId: '1',
    unread: 1,
    lastMessage: 'Dra, tenho tido dificuldades para dormir ultimamente',
    lastActivity: '2025-10-16T10:05:00Z',
    messages: [
      {
        id: 1,
        text: 'Olá Dra. Ana, gostaria de marcar uma consulta',
        timestamp: '2025-10-15T10:00:00Z',
        sender: 'them'
      },
      {
        id: 2,
        text: 'Claro! Tenho horários disponíveis na quarta-feira',
        timestamp: '2025-10-16T10:05:00Z',
        sender: 'me'
      },
      {
        id: 3,
        text: 'Perfeito! Pode ser às 14h?',
        timestamp: '2025-10-16T10:05:00Z',
        sender: 'them'
      },
      {
        id: 4,
        text: 'Sim, às 14h está ótimo. Nos vemos então!',
        timestamp: '2025-10-16T10:05:00Z',
        sender: 'me'
      },
      {
        id: 5,
        text: 'Dra, tenho tido dificuldades para dormir ultimamente',
        timestamp: '2025-10-16T10:05:00Z',
        sender: 'them'
      }
    ]
  },
  {
    id: '2',
    userId: '2',
    unread: 0,
    lastMessage: 'Que ótimo! Continue com a rotina',
    lastActivity: '2025-09-14T16:45:00Z',
    messages: [
      {
        id: 1,
        text: 'Bom dia Dra, os exercícios estão ajudando muito',
        timestamp: '2025-09-14T16:45:00Z',
        sender: 'them'
      },
      {
        id: 2,
        text: 'Que ótimo! Continue com a rotina',
        timestamp: '2025-09-14T16:45:00Z',
        sender: 'me'
      }
    ]
  },
  {
    id: '3',
    userId: '3',
    unread: 0,
    lastMessage: 'Sem problemas, qual dia seria melhor?',
    lastActivity: '2025-08-15T09:20:00Z',
    messages: [
      {
        id: 1,
        text: 'Dra. Ana, preciso remarcar nossa sessão',
        timestamp: '2025-08-15T09:20:00Z',
        sender: 'them'
      },
      {
        id: 2,
        text: 'Sem problemas, qual dia seria melhor?',
        timestamp: '2025-08-15T09:20:00Z',
        sender: 'me'
      }
    ]
  }
  ,
  {
    id: '4',
    userId: '4',
    unread: 0,
    lastMessage: 'Sem problemas, qual dia seria melhor?',
    lastActivity: '2025-08-15T09:20:00Z',
    messages: [
      {
        id: 1,
        text: 'Dra. Ana, preciso remarcar nossa sessão',
        timestamp: '2025-08-15T09:20:00Z',
        sender: 'them'
      },
      {
        id: 2,
        text: 'Sem problemas, qual dia seria melhor?',
        timestamp: '2025-08-15T09:20:00Z',
        sender: 'me'
      }
    ]
  },
  {
    id: '5',
    userId: '5',
    unread: 0,
    lastMessage: 'Sem problemas, qual dia seria melhor?',
    lastActivity: '2025-08-15T09:20:00Z',
    messages: [
      {
        id: 1,
        text: 'Dra. Ana, preciso remarcar nossa sessão',
        timestamp: '2025-08-15T09:20:00Z',
        sender: 'them'
      },
      {
        id: 2,
        text: 'Sem problemas, qual dia seria melhor?',
        timestamp: '2025-08-15T09:20:00Z',
        sender: 'me'
      }
    ]
  },
  {
    id: '6',
    userId: '6',
    unread: 0,
    lastMessage: 'Sem problemas, qual dia seria melhor?',
    lastActivity: '2025-08-15T09:20:00Z',
    messages: [
      {
        id: 1,
        text: 'Dra. Ana, preciso remarcar nossa sessão',
        timestamp: '2025-08-15T09:20:00Z',
        sender: 'them'
      },
      {
        id: 2,
        text: 'Sem problemas, qual dia seria melhor?',
        timestamp: '2025-08-15T09:20:00Z',
        sender: 'me'
      }
    ]
  },
  {
    id: '7',
    userId: '7',
    unread: 0,
    lastMessage: 'Sem problemas, qual dia seria melhor?',
    lastActivity: '2025-08-15T09:20:00Z',
    messages: [
      {
        id: 1,
        text: 'Dra. Ana, preciso remarcar nossa sessão',
        timestamp: '2025-08-15T09:20:00Z',
        sender: 'them'
      },
      {
        id: 2,
        text: 'Sem problemas, qual dia seria melhor?',
        timestamp: '2025-08-15T09:20:00Z',
        sender: 'me'
      }
    ]
  }
];

function ChatProfessional() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const sortedConversations = useMemo(() => {
    return [...conversations].sort((a, b) => {
      const getLastMessageTime = (conv) => {
        if (conv.messages.length === 0) return 0;
        return new Date(conv.messages[conv.messages.length - 1].timestamp).getTime();
      };
      
      return getLastMessageTime(b) - getLastMessageTime(a);
    });
  }, [conversations]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === conversation.id 
          ? { ...conv, unread: 0 }
          : conv
      )
    );
  };

  const handleSendMessage = (conversationId, newMessage) => {
    setConversations(prevConversations => {
      const updatedConversations = prevConversations.map(conv => {
        if (conv.id === conversationId) {
          return { 
            ...conv, 
            messages: [...conv.messages, newMessage],
            lastMessage: newMessage.text,
            unread: 0,
            lastActivity: new Date().toISOString()
          };
        }
        return conv;
      });

      return updatedConversations;
    });

    if (selectedConversation && selectedConversation.id === conversationId) {
      setSelectedConversation(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage],
        lastMessage: newMessage.text,
        lastActivity: new Date().toISOString()
      }));
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      
      {/* Área do Chat */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Conteúdo do Chat */}
        <main className="flex-1 min-h-0 overflow-hidden">
          <div className="flex-1 flex overflow-hidden h-full">
            <ChatSidebar
              users={users}
              conversations={sortedConversations}
              currentConversation={selectedConversation}
              onSelectConversation={handleSelectConversation}
              currentUser={currentUser}
            />
            <ChatContainer
              conversation={selectedConversation}
              currentUser={currentUser}
              users={users}
              onSendMessage={handleSendMessage}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ChatProfessional;