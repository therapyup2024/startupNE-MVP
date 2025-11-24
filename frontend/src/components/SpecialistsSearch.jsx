import React, { useMemo, useState } from "react";
import { Search, Filter } from "lucide-react";
import SpecialistCard from "./SpecialistCard";

export default function SpecialistsSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [onlyTeleconsulta, setOnlyTeleconsulta] = useState(false);

  const specialists = [
    {
      avatarUrl:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=256&auto=format&fit=facearea&facepad=2&h=256",
      name: "Seline Melo",
      title: "Psicóloga, Psicanalista",
      rating: 5,
      opinions: 50,
      doc: "CRP 05/30054",
      address: "Rua Silveira Neto, 129, Floriano - PI",
      price: "160",
      teleconsulta: true,
      about:
        "Oi! Que bom que você chegou aqui! Através da experiência pessoal e profissional afirmo que é possível transformar-se através do autoconhecimento. Permita-se encontrar uma nova maneira de sentir e viver a vida através da psicanálise e mudança de hábitos. Eu posso ajudar você nesse caminho! Vamos?",
      topics: [
        "Ansiedade",
        "TOC",
        "Autoconhecimento",
        "TDAH",
        "Depressão",
        "Relacionamentos / Conflitos Familiares",
      ],
      schedule: {
        "Hoje\n19 Out": ["—", "—"],
        "Amanhã\n20 Out": ["07:05", "08:45"],
        "Sex,\n24 Out": ["13:15", "15:15"],
        "Sab,\n25 Out": ["19:45", "17:45"],
      },
    },
    {
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=facearea&facepad=2&h=256",
      name: "Ana Aguiar",
      title: "Psicóloga, Psicanalista",
      rating: 5,
      opinions: 38,
      doc: "CRP 05/28912",
      address: "Rua Projetada, 200, Floriano - PI",
      price: "160",
      teleconsulta: true,
      about:
        "Atendimento acolhedor com foco em escuta qualificada e intervenções baseadas em evidências. Vamos organizar sua rotina emocional e construir novas estratégias.",
      topics: [
        "Ansiedade",
        "Estresse",
        "Autoconhecimento",
        "Luto",
        "Depressão",
        "Adaptação escolar",
      ],
      schedule: {
        "Hoje\n19 Out": ["—", "—"],
        "Amanhã\n20 Out": ["07:05", "08:45"],
        "Sex,\n24 Out": ["13:15", "15:15"],
        "Sab,\n25 Out": ["19:45", "17:45"],
      },
    },
  ];

  const filteredSpecialists = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return specialists.filter((s) => {
      if (onlyTeleconsulta && !s.teleconsulta) return false;

      if (!term) return true;

      const text = (
        s.name +
        " " +
        s.title +
        " " +
        s.address +
        " " +
        s.topics.join(" ")
      ).toLowerCase();

      return text.includes(term);
    });
  }, [specialists, searchTerm, onlyTeleconsulta]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Buscar Especialistas
            </h1>
            <p className="text-gray-600">
              Encontre o profissional ideal para o seu momento.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Buscar por nome, especialidade, tema..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-72 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
              />
            </div>

            <button
              type="button"
              onClick={() => setOnlyTeleconsulta((prev) => !prev)}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                onlyTeleconsulta
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Filter size={16} />
              Teleconsulta
            </button>
          </div>
        </div>
      </header>

      {/* Lista de especialistas */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
          {filteredSpecialists.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-10">
              Nenhum especialista encontrado para esse filtro.
            </div>
          ) : (
            filteredSpecialists.map((s, idx) => (
              <SpecialistCard key={idx} {...s} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}