import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Video } from "lucide-react";

export default function MeetHub() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const basePath = "/meet-paciente";

  const handleJoinMeeting = (e) => {
    e.preventDefault();
    const rawValue = roomId.trim(); // Pega o valor digitado, ex: "https://meet.jit.si/sessao-123"
    if (!rawValue) return;

    // 1. Quebra o texto em partes usando a barra "/"
    const parts = rawValue.split('/');
    
    // 2. Pega a última parte do array
    // Ex: ['https:', '', 'meet.jit.si', 'sessao-123'] -> "sessao-123"
    let extractedId = parts.pop();

    if (extractedId === '' && parts.length > 0) {
      extractedId = parts.pop();
    }
    
    extractedId = extractedId.split('?')[0];

    if (extractedId) {
      navigate(`${basePath}/${extractedId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-white">
      <main className="flex flex-col p-6 md:p-10">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Therapy Meet</h1>
            <p className="text-gray-600">Pronto para sua sessão?</p>
          </div>
        </header>

        <div className="flex-grow flex items-center justify-center py-12">
          <div className="bg-gradient-to-b from-[#2E1967] to-[#29134E] backdrop-blur-lg border border-white/20 rounded-2xl p-8 md:p-12 w-full max-w-lg shadow-2xl text-white">
            <h1 className="text-3xl font-bold mb-4 text-center">
              Entrar na Reunião
            </h1>
            <p className="text-lg text-gray-300 mb-10 text-center">
              Cole o link da sala fornecido pelo seu especialista.
            </p>

            <form onSubmit={handleJoinMeeting} className="flex gap-2">
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Cole o link aqui"
                className="flex-1 p-3 rounded-lg bg-white/20 border border-white/30 focus:border-violet-400 focus:outline-none placeholder-gray-300"
              />
              <button
                type="submit"
                disabled={!roomId.trim()}
                className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-5 rounded-lg transition-all disabled:opacity-50 disabled:bg-violet-400 flex items-center gap-2"
              >
                <Video size={18} />
                Participar
              </button>
            </form>
            
            <div className="mt-6 text-center text-gray-300 text-sm">
              <p>Ou digite apenas o ID da sala: <strong>sessao-abc123</strong></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}