// src/components/SignUpPsychologist.jsx

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import ParticlesBackground from "./ParticleBackground";
import { apiServer } from "../api/server.js";
import { mappers } from "../lib/utils.js";

export default function SignUpPsychologist() {
    const navigate = useNavigate();
    const handleLoginPsychologist = () => {
      navigate('/login-profissional');
    };

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    cpf: "",
    genero: "",
    especialidade: "Psicólogo(a)",
    crp: "",
    abordagem: "",
    descricao: "",
    termos: false,
  });

  const [showPassword, setShowPassword] =useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSpecialtyClick = (specialty) => {
    setFormData((prevData) => ({
      ...prevData,
      especialidade: specialty,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiServer(navigate).professional.register(mappers.especialista_to_professional(formData));
  };

  const inputStyle = "w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:border-violet-400 focus:outline-none placeholder-gray-300";

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#10002B] via-[#240046] to-[#3C096C] text-white flex flex-col pb-10">
      <>
        <Navbar />
        <ParticlesBackground />
      </>

      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center flex-grow mt-8 mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Crie sua conta de Profissional</h1>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 md:p-10 w-full shadow-2xl">
          
          {/* ... (Resto do seu formulário) ... */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold mb-2">Sobre Você</h2>
              <input type="text" name="nome" placeholder="Nome completo" onChange={handleChange} className={inputStyle} />
              <input type="email" name="email" placeholder="Email" onChange={handleChange} className={inputStyle} />

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

              <div className="flex gap-4">
                <input type="tel" name="telefone" placeholder="Telefone" onChange={handleChange} className={inputStyle} />
                <input type="text" name="cpf" placeholder="CPF" onChange={handleChange} className={inputStyle} />
              </div>
              
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                className={inputStyle}
              >
                <option className="text-gray-400 bg-[#3C096C]" value="">
                  Selecione seu gênero
                </option>
                <option className="text-white bg-[#3C096C]" value="masculino">
                  Masculino
                </option>
                <option className="text-white bg-[#3C096C]" value="feminino">
                  Feminino
                </option>
                <option className="text-white bg-[#3C096C]" value="outro">
                  Outro
                </option>
                <option className="text-white bg-[#3C096C]" value="prefiro_nao_dizer">
                  Prefiro não dizer
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold mb-2">Sua Especialidade</h2>
              <div className="flex gap-4">
                {['Psicólogo(a)', 'Psicanalista', 'Terapeuta'].map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => handleSpecialtyClick(spec)}
                    className={`p-3 rounded-lg font-semibold transition-all w-full
                      ${formData.especialidade === spec 
                        ? 'bg-violet-600 text-white' 
                        : 'bg-white/20 text-gray-200 hover:bg-white/30'}`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
              <input type="text" name="crp" placeholder="CRP" onChange={handleChange} className={inputStyle} />
              <input type="text" name="abordagem" placeholder="Abordagem" onChange={handleChange} className={inputStyle} />
              <textarea name="descricao" placeholder="Descrição" onChange={handleChange} rows="3" className={`${inputStyle} resize-none`}></textarea>
            </div>

            <div className="md:col-span-2 flex flex-col items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="termos" name="termos" checked={formData.termos} onChange={handleChange} className="h-4 w-4 rounded bg-white/30 accent-violet-500" />
                    <label htmlFor="termos" className="text-sm text-gray-300">
                        Você concorda com nossos termos de <a href="#" className="text-violet-300 hover:text-violet-200 font-medium">privacidade</a> e <a href="#" className="text-violet-300 hover:text-violet-200 font-medium">política</a>
                    </label>
                </div>
                <button type="submit" className="w-full max-w-xs bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md">
                    Criar Conta
                </button>
            </div>
          </form>
          <p className="text-sm text-center mt-4 text-gray-300">
            Já possui uma conta?{" "}
            <a
              onClick={handleLoginPsychologist}
              className="text-violet-300 hover:text-violet-200 font-medium"
            >
              Faça login
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}