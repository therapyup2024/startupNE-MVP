import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Video } from 'lucide-react';

export default function SpecialistMeetHub() {
  const navigate = useNavigate();

  const handleCreateMeeting = () => {
    const randomId = `sessao-${Math.random().toString(36).substring(2, 9)}`;
    
    navigate(`/meet-especialista/${randomId}`);
  };

  return (
    <div className="flex h-screen w-full bg-[#ffffff] text-white">
      {/* Sidebar é fornecida pelo SpecialistLayout, então removemos aqui */}

      <main className="flex-1 flex flex-col p-6 md:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Therapy Meet</h1>
            <p className="text-gray-600">Inicie uma nova sessão de atendimento.</p>
          </div>
        </header>
        
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-gradient-to-b from-[#2E1967] to-[#29134E] backdrop-blur-lg border border-white/20 rounded-2xl p-8 md:p-12 w-full max-w-lg shadow-2xl text-white">
            
            <h1 className="text-3xl font-bold mb-4 text-center">Nova Reunião</h1>
            <p className="text-lg text-gray-300 mb-10 text-center">
              Clique no botão abaixo para gerar um link seguro e iniciar seu atendimento.
            </p>
            
            <button
              onClick={handleCreateMeeting}
              className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md"
            >
              <Video size={20} />
              Criar Nova Reunião
            </button>
            
          </div>
        </div>
      </main>
    </div>
  );
}