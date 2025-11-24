// src/components/MeetPatient.jsx
import React, { useState, useEffect } from 'react';

// SDK oficial do Jitsi
import { JitsiMeeting } from '@jitsi/react-sdk';
import { VscRecord } from 'react-icons/vsc'; // Ícone de "Gravando"
import { FaRegUserCircle } from 'react-icons/fa'; // Ícone de avatar placeholder

const NavLink = ({ icon, text, active = false }) => (
  <a
    href="#"
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active
        ? 'bg-violet-600 text-white' // Estilo do link "Meet" (ativo)
        : 'text-gray-300 hover:bg-white/10' // Links inativos
    }`}
  >
    {icon}
    <span className="font-medium">{text}</span>
  </a>
);

export default function TherapyMeet() {
  // Estado para o relógio (para bater com a imagem)
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Formata a data e hora
  const formattedDate = currentTime.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const formattedTime = currentTime.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="flex h-screen w-full bg-[#0F081C] text-white">
      <main className="flex-1 flex flex-col p-6 md:p-10 overflow-y-auto">
        
        {/* Cabeçalho */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Therapy Meet</h1>
            <div className="flex items-center gap-4 text-gray-400">
              {/* Data e Hora Dinâmicas */}
              <span>{formattedDate}</span>
              <span>{formattedTime}</span>
            </div>
          </div>
          
          {/* Status "Gravando" */}
          <div className="flex items-center gap-2 text-red-500">
            <VscRecord size={24} className="animate-pulse" />
            <span className="font-medium">Gravando</span>
          </div>
        </header>

        {/* Container da Reunião Jitsi */}
        {/* O 'flex-grow' faz este container preencher o espaço restante */}
        <div className="flex-grow w-full bg-black rounded-xl overflow-hidden shadow-2xl">
          <JitsiMeeting
            // Nome da sala (da imagem)
            roomName="TherapyConsultaDaviClarice"
            
            // Informações do usuário (da imagem)
            userInfo={{
              displayName: 'Davi Oliveira'
            }}
            
            configOverwrite={{
              prejoinPageEnabled: true,
              
              subject: ' ',
              
              prejoinConfig: {
                hideDisplayName: true
              }
            }}
            
            getIFrameRef={(iframe) => {
              if (iframe) {
                iframe.style.height = '100%';
                iframe.style.width = '100%';
              }
            }}
          />
        </div>
      </main>
    </div>
  );
}