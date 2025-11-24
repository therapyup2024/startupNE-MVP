// src/components/SingUpPatient.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar.jsx";
import ParticlesBackground from "./ParticleBackground.jsx"
import { apiServer } from "../api/server.js";
import { mappers } from "../lib/utils.js";

export default function SingUpPatient() {
  const navigate = useNavigate();
  const handleLoginPatient = () => {
    navigate('/login-cliente');
  };

  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
    telefone: "",
    genero: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const inputStyle = "w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:border-violet-400 focus:outline-none placeholder-gray-300";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      let formatted = value.replace(/\D/g, "");
      if (formatted.length <= 11) {
        formatted = formatted
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      }
      setForm({ ...form, cpf: formatted });
      return;
    }

    if (name === "telefone") {
      let formatted = value.replace(/\D/g, "");
      if (formatted.length <= 11) {
        formatted = formatted.replace(/^(\d{2})(\d)/g, "($1) $2");
        formatted = formatted.replace(/(\d{5})(\d{4})$/, "$1-$2");
      }
      setForm({ ...form, telefone: formatted });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiServer(navigate).customer.register(mappers.cliente_to_costumer(form));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#10002B] via-[#240046] to-[#3C096C] flex flex-col">
      <>
        <Navbar />
        <ParticlesBackground />
      </>

      <main className="relative flex-grow flex items-center justify-center px-4 z-10">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl text-white">
          <h2 className="text-center text-2xl font-bold mb-6">Crie sua conta</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} required className={inputStyle} />
            <input type="text" name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} required className={inputStyle} />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className={inputStyle} />
            
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="senha"
                placeholder="Senha"
                value={form.senha} 
                onChange={handleChange}
                required
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
            
            <input type="tel" name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} className={inputStyle} />
            <select name="genero" value={form.genero} onChange={handleChange} className={inputStyle}>
              <option className="text-gray-400 bg-[#3C096C]" value="">Selecione seu gênero</option>
              <option className="text-white bg-[#3C096C]" value="masculino">Masculino</option>
              <option className="text-white bg-[#3C096C]" value="feminino">Feminino</option>
              <option className="text-white bg-[#3C096C]" value="outro">Outro</option>
              <option className="text-white bg-[#3C096C]" value="prefiro_nao_dizer">Prefiro não dizer</option>
            </select>

            <button
              type="submit"
              disabled={!form.nome || !form.cpf || !form.email || !form.senha}
              className={`w-full p-3 rounded-lg font-semibold shadow-md transition-all ${
                !form.nome || !form.cpf || !form.email || !form.senha
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-violet-600 hover:bg-violet-700"
              }`}
            >
              Criar Conta
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-300">
            Já possui uma conta?{" "}
            <a onClick={handleLoginPatient} className="text-violet-300 hover:text-violet-200 font-medium cursor-pointer">
              Faça login
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

