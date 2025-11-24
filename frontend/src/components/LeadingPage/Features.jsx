import React from "react";
import { motion } from "framer-motion";
import { Video, MessageSquare, Calendar, FileText } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Video,
      title: "Sessões de terapia online via vídeo ou chat",
      description:
        "Atendimentos por videoconferência com qualidade HD e conexão estável, ou conversas por chat quando preferir.",
    },
    {
      icon: MessageSquare,
      title: "Plantão psicológico em horários determinados",
      description:
        "Suporte psicológico em tempo real para momentos que precisam de apoio imediato.",
    },
    {
      icon: Calendar,
      title: "Agenda digital simples",
      description:
        "Sistema intuitivo para agendar e gerenciar suas sessões de terapia com facilidade.",
    },
    {
      icon: FileText,
      title: "Área do usuário com histórico básico de atendimentos",
      description:
        "Acompanhe seu progresso com registro das suas consultas e evolução ao longo do tempo.",
    },
  ];

  return (
    <section className="relative w-full py-24 px-6 text-white bg-[#0C0C47]">
      {/* leve textura/gradiente para dar profundidade */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_420px_at_30%_20%,rgba(125,42,232,0.25),transparent_60%),radial-gradient(900px_380px_at_80%_40%,rgba(198,97,255,0.18),transparent_65%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-extrabold sm:text-5xl">
            Funcionalidades previstas no{" "}
            <span style={{ color: "#C661FF" }}>MVP</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/80">
            Nossa versão inicial trará as funcionalidades essenciais para você
            começar sua jornada de cuidado com a saúde mental.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/12 bg-white/[0.06] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-colors hover:bg-white/[0.10]"
            >
              <div className="flex items-start gap-6">
                {/* Icone */}
                <div
                  className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-xl"
                  style={{ backgroundColor: "#C661FF" }}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </div>

                {/* Texto */}
                <div>
                  <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-white/80">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
