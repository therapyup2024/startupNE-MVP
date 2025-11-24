// src/components/shared/Sidebar/BaseSidebar.jsx - VERSÃO COM BOTÕES MAIS DESTACADOS
import React from "react";
import logoImg from "../../../assets/icon/Logo.png";
import { ChevronFirst, LogOut } from "lucide-react";

export default function BaseSidebar({
  children,
  user,
  isCollapsed,
  onToggle,
  onLogout,
}) {
  return (
    <aside className="h-screen">
      <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm -z-10 pointer-events-none"></div>

      <nav
        className={`h-full flex flex-col bg-gradient-to-b from-[#230d60]/95 to-[#1d0540]/95 border-r shadow-2xl transition-all duration-300 backdrop-blur-xl ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="p-4 pb-2 flex justify-between items-center border-b border-white/10">
          {!isCollapsed && <img src={logoImg} className="w-14" alt="Logo" />}
          <button
            onClick={onToggle}
            className={`
              p-2 rounded-xl cursor-pointer relative
              transition-all duration-300 group
              bg-gradient-to-r from-white/5 to-white/10 
              border border-white/20 shadow-md shadow-blue-500/10
              hover:from-white/10 hover:to-white/15 hover:border-white/30
              hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105
              backdrop-blur-md
            `}
          >
            <ChevronFirst
              className={`
              transition-all duration-300 text-white
              ${isCollapsed ? "rotate-180" : ""}
            `}
            />

            {/* Efeito de brilho no hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* Tooltip */}
            {isCollapsed && (
              <div
                className="
                absolute left-full rounded-xl px-3 py-2 ml-3
                bg-white/95 backdrop-blur-sm text-gray-800 text-sm font-semibold
                invisible opacity-0 -translate-x-3 transition-all
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                z-50 shadow-xl border border-white/30
                whitespace-nowrap
              "
              >
                {isCollapsed ? "Expandir" : "Recolher"}
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-white/95"></div>
              </div>
            )}
          </button>
        </div>

        {/* Menu Items */}
        <ul className="flex-1 px-3 py-4">{children}</ul>

        {/* User Info */}
        <div className="border-t border-white/10 flex p-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-sm">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user?.name}
                className="w-10 h-10 rounded-lg"
              />
            ) : (
              <span className="text-white text-sm font-semibold">
                {user?.name?.charAt(0) || "U"}
              </span>
            )}
          </div>
          {!isCollapsed && (
            <div className="flex justify-between items-center flex-1 ml-3">
              <div className="leading-4">
                <h4 className="font-semibold text-white">
                  {user?.name || "Usuário"}
                </h4>
                <span className="text-xs text-white/70">
                  {user?.email || "email@gmail.com"}
                </span>
              </div>
              <button
                onClick={onLogout}
                className={`
                  p-2 rounded-xl cursor-pointer relative
                  transition-all duration-300 group
                  bg-gradient-to-r from-red-500/5 to-red-500/10 
                  border border-red-400/30 shadow-md shadow-red-500/10
                  hover:from-red-500/15 hover:to-red-500/20 hover:border-red-400/50
                  hover:shadow-lg hover:shadow-red-500/20 hover:scale-105
                  backdrop-blur-md
                `}
                title="Sair"
              >
                <LogOut
                  className={`
                  transition-all duration-300 text-red-400
                  group-hover:text-red-300
                `}
                  size={18}
                />

                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-400/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {/* Tooltip */}
                <div
                  className="
                  absolute left-full bottom-0 rounded-xl px-3 py-2 ml-3
                  bg-white/95 backdrop-blur-sm text-gray-800 text-sm font-semibold
                  invisible opacity-0 -translate-x-3 transition-all
                  group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                  z-50 shadow-xl border border-white/30
                  whitespace-nowrap
                "
                >
                  Sair
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-white/95"></div>
                </div>
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
