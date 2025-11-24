import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { Circle, Calendar, Clock } from 'lucide-react';

export default function PatientMeet() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { roomId } = useParams();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  
  const formattedTime = currentTime.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cabeçalho */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Therapy Meet - Paciente</h1>
            <div className="flex items-center gap-4 text-gray-600 mt-1">
              <Calendar size={16} />
              <span>{formattedDate}</span>
              <Clock size={16} />
              <span>{formattedTime}</span>
              <span>Sala: {roomId}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-red-500">
            <Circle size={16} className="animate-pulse fill-red-500" />
            <span className="font-medium">Sessão Ativa</span>
          </div>
        </div>
      </header>

      {/* Área do Jitsi Meet */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: '70vh' }}>
          <JitsiMeeting
            roomName={roomId || "SalaDeEmergencia"}
            
            // Informações do usuário (paciente)
            userInfo={{
              displayName: 'Paciente',
              email: 'paciente@therapy.com',
            }}
            
            // Configurações para paciente
            configOverwrite={{
              prejoinPageEnabled: true, // Paciente vê tela de pré-join
              startWithAudioMuted: true,
              startWithVideoMuted: true,
              disableModeratorIndicator: false,
              startScreenSharing: false,
              enableEmailInStats: false,
              
              // Configurações de interface
              interfaceConfigOverwrite: {
                TOOLBAR_BUTTONS: [
                  'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                  'fodeviceselection', 'hangup', 'profile', 'chat', 'settings', 
                  'raisehand', 'videoquality', 'filmstrip', 'feedback', 'stats', 
                  'shortcuts', 'tileview', 'videobackgroundblur', 'help'
                ],
                SETTINGS_SECTIONS: ['devices', 'language', 'profile'],
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                SHOW_BRAND_WATERMARK: false,
                BRAND_WATERMARK_LINK: '',
                SHOW_POWERED_BY: false,
                SHOW_PROMOTIONAL_CLOSE_PAGE: false,
                SHOW_CHROME_EXTENSION_BANNER: false,
              }
            }}
            
            // Interface do paciente
            interfaceConfigOverwrite={{
              DEFAULT_BACKGROUND: '#f3f4f6',
              SHOW_JITSI_WATERMARK: false,
              SHOW_WATERMARK_FOR_GUESTS: false,
              SHOW_BRAND_WATERMARK: false,
              BRAND_WATERMARK_LINK: '',
              SHOW_POWERED_BY: false,
              TOOLBAR_BUTTONS: [
                'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                'fodeviceselection', 'hangup', 'profile', 'chat', 'settings', 
                'raisehand', 'videoquality', 'filmstrip', 'feedback', 'stats', 
                'shortcuts', 'tileview', 'videobackgroundblur', 'help'
              ],
              SETTINGS_SECTIONS: ['devices', 'language', 'profile'],
              SHOW_CHROME_EXTENSION_BANNER: false
            }}
            
            // Callbacks importantes
            onApiReady={ (externalApi) => {
              console.log('Jitsi Meet API pronto para paciente', externalApi);
              
              // Configurar o paciente
              externalApi.executeCommand('displayName', 'Paciente');
              
              // Event listeners para paciente
              externalApi.addEventListeners({
                videoConferenceJoined: (e) => {
                  console.log('Paciente entrou na sala', e);
                },
                participantJoined: (e) => {
                  console.log('Participante entrou:', e);
                },
                participantLeft: (e) => {
                  console.log('Participante saiu:', e);
                }
              });
            }}
            
            getIFrameRef={(iframeRef) => {
              if (iframeRef) {
                iframeRef.style.height = '100%';
                iframeRef.style.width = '100%';
                iframeRef.style.border = 'none';
              }
            }}
          />
        </div>
        
        {/* Informações da sala */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Sua Sessão</h3>
          <p className="text-blue-800 text-sm">
            <strong>Sala ID:</strong> {roomId}
          </p>
          <p className="text-blue-800 text-sm mt-1">
            Aguarde o especialista iniciar a sessão. Você pode ligar seu microfone e câmera quando se sentir confortável.
          </p>
        </div>
      </div>
    </div>
  );
}