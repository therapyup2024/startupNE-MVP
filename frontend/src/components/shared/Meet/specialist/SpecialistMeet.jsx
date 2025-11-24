import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { Video, Circle } from 'lucide-react';

export default function SpecialistMeet() {
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
            <h1 className="text-2xl font-bold text-gray-900">Therapy Meet - Especialista</h1>
            <div className="flex items-center gap-4 text-gray-600 mt-1">
              <span>Sala: {roomId}</span>
              <span>{formattedDate}</span>
              <span>{formattedTime}</span>
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
            
            // Informações do usuário (especialista)
            userInfo={{
              displayName: 'Especialista',
              email: 'especialista@therapy.com',
            }}
            
            // Configurações
            configOverwrite={{
              prejoinPageEnabled: false, // Pular tela de pré-join para especialista
              startWithAudioMuted: false,
              startWithVideoMuted: false,
              disableModeratorIndicator: false,
              startScreenSharing: false,
              enableEmailInStats: false,
              enableWelcomePage: false,
              enableClosePage: false,
              
              // Configurações de interface
              interfaceConfigOverwrite: {
                TOOLBAR_BUTTONS: [
                  'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting', 
                  'fullscreen', 'fodeviceselection', 'hangup', 'profile', 'chat', 
                  'recording', 'livestreaming', 'etherpad', 'sharedvideo', 'settings', 
                  'raisehand', 'videoquality', 'filmstrip', 'feedback', 'stats', 
                  'shortcuts', 'tileview', 'videobackgroundblur', 'download', 'help', 
                  'mute-everyone', 'security'
                ],
                SETTINGS_SECTIONS: ['devices', 'language', 'moderator', 'profile', 'calendar'],
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                SHOW_BRAND_WATERMARK: false,
                BRAND_WATERMARK_LINK: '',
                SHOW_POWERED_BY: false,
                SHOW_PROMOTIONAL_CLOSE_PAGE: false,
                SHOW_CHROME_EXTENSION_BANNER: false,
              }
            }}
            
            // Interface do moderador (especialista)
            interfaceConfigOverwrite={{
              DEFAULT_BACKGROUND: '#f3f4f6',
              SHOW_JITSI_WATERMARK: false,
              SHOW_WATERMARK_FOR_GUESTS: false,
              SHOW_BRAND_WATERMARK: false,
              BRAND_WATERMARK_LINK: '',
              SHOW_POWERED_BY: false,
              TOOLBAR_BUTTONS: [
                'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
                'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
                'mute-video-everyone', 'security'
              ],
              SETTINGS_SECTIONS: ['devices', 'language', 'moderator', 'profile', 'calendar'],
              SHOW_CHROME_EXTENSION_BANNER: false
            }}
            
            // Callbacks importantes
            onApiReady={ (externalApi) => {
              console.log('Jitsi Meet API pronto', externalApi);
              
              // Configurar o especialista como moderador
              externalApi.executeCommand('displayName', 'Especialista');
              externalApi.executeCommand('subject', 'Consulta Terapêutica');
              
              // Event listeners
              externalApi.addEventListeners({
                videoConferenceJoined: (e) => {
                  console.log('Especialista entrou na sala', e);
                  externalApi.executeCommand('toggleShareScreen');
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
        
        {/* Informações da sala para compartilhar */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Informações da Sala</h3>
          <p className="text-blue-800 text-sm">
            <strong>Sala ID:</strong> {roomId}
          </p>
          <p className="text-blue-800 text-sm mt-1">
            Compartilhe este ID com o paciente para que ele possa entrar na sala.
          </p>
        </div>
      </div>
    </div>
  );
}