// src/components/RoleSelection.jsx
import React, { useEffect, useState } from "react"; 
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar.jsx";
import Particles, { initParticlesEngine } from "@tsparticles/react"; 
import { loadFull } from "tsparticles"; 
import particlesConfig from "./particles-config.js";
import CustomerImg from "../assets/icon/CustomerImg.png";
import ProfessionalImg from "../assets/icon/ProfessionalImg.png";

export default function RoleSelection() {
  const navigate = useNavigate(); 
  const handleSelectPsychologist = () => {
    navigate('/login-profissional');
  };
  const handleSelectPatient = () => {
    navigate('/login-cliente'); 
  };
  
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  
  
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0026] to-[#2a0066] text-white">
      <>
        <Navbar/>
        {/* 9. Adicionamos o componente <Particles> com renderização condicional */}
        {init && (
          <Particles
            id="tsparticles"
            options={particlesConfig}
            className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
          />
        )}
      </>      

      <div className="w-full max-w-4xl flex flex-col items-center flex-grow mx-auto px-4 justify-center z-10">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo(a)!</h1>
        <p className="text-lg text-gray-300 mb-10">Como você gostaria de acessar nossa plataforma?</p>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Card de Profissional */}
          <button
            onClick={handleSelectPsychologist}
            className="bg-white/10 border border-white/20 rounded-xl p-8 w-72 h-48 flex flex-col justify-center items-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-5xl mb-2">
              <img src={ProfessionalImg} alt="Profissional" className="w-35 h-35"/>
            </span>
            <span className="text-xl font-semibold">Sou Profissional</span>
          </button>

          {/* Card de Cliente */}
          <button
            onClick={handleSelectPatient}
            className="bg-white/10 border border-white/20 rounded-xl p-8 w-72 h-48 flex flex-col justify-center items-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-5xl mb-2">
              <img src={CustomerImg} alt="Paciente" className="w-35 h-35"/>
            </span>
            <span className="text-xl font-semibold">Sou Cliente</span>
          </button>
        </div>
      </div>
    </div>  
  );
}