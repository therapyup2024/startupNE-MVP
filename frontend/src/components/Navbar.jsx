// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/icon/Logo.png';

export default function Navbar() {
  return (
    // O <header> agora só se preocupa em ocupar toda a largura
    <header className="w-full z-10">
      
      {/* Este container interno controla o alinhamento e o espaçamento */}
      <div className="w-full mx-auto flex justify-between items-center py-6 px-4 sm:px-6 lg:px-8">
        
        {/* Lado Esquerdo: Logo e Nome */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logoImg} alt="Therapy Logo" className="w-10 h-10" />
          <h1 className="text-white text-2xl font-semibold tracking-wide">
            Therapy
          </h1>
        </Link>

        {/* Lado Direito: Links de Navegação */}
        <nav className="flex gap-8 text-sm font-medium">
          <Link to="/role-selection" className="text-gray-300 hover:text-white transition-colors">
            Faça Login
          </Link>
          <Link to="/leading-page" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
        </nav>
        
      </div>
    </header>
  );
}