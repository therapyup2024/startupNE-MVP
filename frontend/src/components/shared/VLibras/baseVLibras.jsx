// src/components/shared/VLibras/baseVLibras.jsx
import React, { useEffect } from "react";

function BaseVLibras() {
  
  useEffect(() => {
    // 1. VERIFICAÇÃO ANTI-STRICTMODE: Se o widget já foi adicionado, não faz mais nada.
    if (document.getElementById('vlibras-widget-container')) {
      return;
    }

    const vwDiv = document.createElement('div');
    vwDiv.setAttribute('vw', 'true');
    vwDiv.className = 'enabled';
    vwDiv.id = 'vlibras-widget-container';

    // Mantemos o z-index "nuclear" para garantir que fica no topo
    vwDiv.style.zIndex = '9998'; 
    
    const vwAccessButtonDiv = document.createElement('div');
    vwAccessButtonDiv.setAttribute('vw-access-button', 'true');
    vwAccessButtonDiv.className = 'active';

    // E no botão também
    vwAccessButtonDiv.style.zIndex = '9999';

    vwDiv.appendChild(vwAccessButtonDiv);
    
    const vwPluginWrapperDiv = document.createElement('div');
    vwPluginWrapperDiv.setAttribute('vw-plugin-wrapper', 'true');
    vwPluginWrapperDiv.innerHTML = '<div class="vw-plugin-top-wrapper"></div>';
    vwDiv.appendChild(vwPluginWrapperDiv);

    document.body.appendChild(vwDiv);

    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.id = 'vlibras-script';

    script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    };

    document.body.appendChild(script);
    
  }, []); 

  return null;
}

export default BaseVLibras;