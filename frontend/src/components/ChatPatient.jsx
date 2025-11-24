import React, { useState, useMemo } from 'react';
import ChatSidebar from './ChatComponents/ChatSidebar';
import ChatContainer from './ChatComponents/ChatContainer';

// Mock data
const currentUser = {
  id: 'me',
  name: 'João Silva',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
};

const users = [
  {
    id: '1',
    name: 'Ana Santos',
    role: 'Psicóloga',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    status: 'online'
  },
  {
    id: '2',
    name: 'Carlos Lima',
    role: 'Psiquiatra',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    status: 'offline'
  },
  {
    id: '3',
    name: 'Mariana Oliveira',
    role: 'Psicóloga',
    avatar: 'https://images.unsplash.com/photo-1517842536804-bf6629e2c291?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    status: 'online'
  }
];

const initialConversations = [
  {
    id: '1',
    userId: '1',
    unread: 1,
    lastMessage: 'Entendo, vamos trabalhar nisso na próxima sessão',
    lastActivity: '2025-10-15T14:30:00Z',
    messages: [
      {
        id: 1,
        text: 'Olá Dra. Ana, gostaria de marcar uma consulta',
        timestamp: '2025-10-15T10:00:00Z',
        sender: 'me'
      },
      {
        id: 2,
        text: 'Claro! Tenho horários disponíveis na quarta-feira',
        timestamp: '2025-10-16T10:05:00Z',
        sender: 'them'
      },
      {
        id: 3,
        text: 'Perfeito! Pode ser às 14h?',
        timestamp: '2025-10-16T10:05:00Z',
        sender: 'me'
      },
      {
        id: 4,
        text: 'Sim, às 14h está ótimo. Nos vemos então!',
        timestamp: '2025-10-16T10:05:00Z',
        sender: 'them'
      },
      {
        id: 5,
        text: 'Dra, tenho tido dificuldades para dormir ultimamente',
        timestamp: '2025-10-16T10:05:00Z',
        sender: 'me'
      },
      {
        id: 6,
        text: 'Entendo, vamos trabalhar nisso na próxima sessão',
        timestamp: '2025-10-16T10:05:00Z',
        sender: 'them'
      }
    ]
  },
  {
    id: '2',
    userId: '2',
    unread: 1,
    lastMessage: 'Os exames estão todos normais',
    lastActivity: '2025-09-14T16:45:00Z',
    messages: [
      {
        id: 1,
        text: 'Bom dia Dr. Carlos, gostaria do resultado dos exames',
        timestamp: '2025-09-14T16:45:00Z',
        sender: 'me'
      },
      {
        id: 2,
        text: 'Os exames estão todos normais, pode ficar tranquilo',
        timestamp: '2025-09-14T16:45:00Z',
        sender: 'them'
      }
    ]
  },
  {
    id: '3',
    userId: '3',
    unread: 0,
    lastMessage: 'Vamos marcar uma avaliação para seu filho',
    lastActivity: '2025-08-15T09:20:00Z',
    messages: [
      {
        id: 1,
        text: 'Dra. Mariana, meu filho está com dificuldades na escola',
        timestamp: '2025-08-15T09:20:00Z',
        sender: 'me'
      },
      {
        id: 2,
        text: 'Vamos marcar uma avaliação para seu filho',
        timestamp: '2025-08-15T09:20:00Z',
        sender: 'them'
      }
    ]
  }
];

function ChatPatient() {
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

export default ChatPatient;