// src/components/shared/Sidebar/common/SidebarItem.jsx - VERSÃO COM MAIS DESTAQUE
import React from "react";

export default function SidebarItem({ icon, text, active = false, alert = false, onClick, isCollapsed = false }) {
  return (
    <li
      className={`
        relative flex items-center py-3 px-3 my-1
        font-medium rounded-xl cursor-pointer
        transition-all duration-300 group
        ${
          active
            ? "bg-gradient-to-r from-white/30 to-white/15 backdrop-blur-md border border-white/20 shadow-md shadow-blue-500/15 transform scale-[1.02]"
            : "bg-transparent hover:bg-white/10 border border-transparent hover:border-white/20"
        }
      `}
      onClick={onClick}
    >
      {/* Ícone com animação quando ativo */}
      <span className={`
        transition-all duration-300
        ${active ? "scale-110 text-white filter drop-shadow-sm" : "text-white/80 hover:text-white"}
      `}>
        {icon}
      </span>
      
      {/* Texto sempre destacado */}
      {!isCollapsed && (
        <span className={`
          overflow-hidden transition-all ml-3 
          font-semibold text-sm
          ${active ? "text-white font-bold drop-shadow-md" : "text-white/90"}
        `}>
          {text}
        </span>
      )}
      
      {/* Indicador de alerta */}
      {alert && (
        <div className="absolute right-2 w-2 h-2 rounded-full bg-red-400 animate-pulse shadow-sm" />
      )}

      {/* Efeito de brilho sutil para o item ativo */}
      {active && (
        <>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/15 to-white/5 pointer-events-none"></div>
          <div className="absolute -inset-1 rounded-xl bg-blue-400/10 blur-sm pointer-events-none"></div>
        </>
      )}

      {/* Tooltip quando sidebar estiver recolhido */}
      {isCollapsed && (
        <div className={`
          absolute left-full rounded-xl px-3 py-2 ml-3
          bg-white/95 backdrop-blur-sm text-sm font-semibold
          invisible opacity-0 -translate-x-3 transition-all
          group -hover:visible group-hover:opacity-100 group-hover:translate-x-0
          z-50 shadow-xl border border-white/30
          whitespace-nowrap
          ${active ? "text-blue-600 ring-2 ring-blue-400/30" : "text-gray-800"}
        `}>
          {text}
          {/* Seta do tooltip */}
          <div className={`absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent ${
            active ? "border-r-blue-400/30" : "border-r-white/95"
          }`}></div>
        </div>
      )}
    </li>
  );
}