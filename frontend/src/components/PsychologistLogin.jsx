// src/components/PsychologistLogin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Particles, { initParticlesEngine } from "@tsparticles/react"; 
import { loadFull } from "tsparticles"; 
import particlesConfig from "./particles-config.js"; 
import { mappers } from "../lib/utils.js";
import { apiServer } from "../api/server.js";

export default function PsychologistLogin() {
  const navigate = useNavigate();
  const handleCadastrePsychologist = () => {
    navigate('/cadastro-psicologo');
  };

  const [showPassword, setShowPassword] = useState(false);
  
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  
  const [formData, setFormData] = useState({
    email: "",
    senha: ""
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiServer(navigate).professional.login(mappers.especialista_to_professional(formData));
  };

  const inputStyle = "w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:border-violet-400 focus:outline-none placeholder-gray-200";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#10002B] via-[#240046] to-[#3C096C] flex flex-col">
      <>
        <Navbar />
        {init && (
          <Particles
            id="tsparticles"
            options={particlesConfig}
            className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
          />
        )}
      </>

      <main className="relative z-10 flex-grow flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 w-[500px] shadow-2xl text-white">
          <h2 className="text-center text-2xl font-bold mb-6">Acesse sua conta - Profissional</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className={inputStyle}
            />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="senha"
                placeholder="Senha"
                onChange={handleChange}
                className={`${inputStyle} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243" />
                  </svg>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 transition-all p-3 rounded-lg font-semibold shadow-md"
            >
              Entrar
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-200">
            Não possui uma conta?{" "}
            <a href="#" onClick={handleCadastrePsychologist} className="text-violet-300 hover:text-violet-200 font-medium">
              Cadastre-se
            </a>
          </p>

        </div>
      </main>
    </div>
  );
}