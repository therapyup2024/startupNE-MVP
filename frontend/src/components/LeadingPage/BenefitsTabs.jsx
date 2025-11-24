import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Shield,
  Smartphone,
  User,
  Briefcase,
  Calendar,
  CreditCard,
  BarChart,
} from "lucide-react";

/** Paleta fixa para não depender de tokens */
const NAVY = "#0C0C47";
const PURPLE = "#7D2AE8";
const LILAC = "#C661FF";

const PatientBenefitCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
  >
    {/* círculo decorativo no canto superior direito */}
    <div
      className="pointer-events-none absolute -top-10 -right-6 h-28 w-28 rounded-full"
      style={{ background: "rgba(198,97,255,0.14)" }}
    />
    <div className="relative z-10">
      <div
        className="mb-6 grid h-16 w-16 place-items-center rounded-xl ring-1"
        style={{ background: "rgba(198,97,255,0.14)", ringColor: "rgba(198,97,255,0.35)" }}
      >
        <Icon className="h-8 w-8" style={{ color: PURPLE }} />
      </div>
      <h3 className="mb-2 text-lg font-bold text-black">{title}</h3>
      <p className="text-sm leading-relaxed text-black/70">{description}</p>
    </div>
  </motion.div>
);

const ProfessionalBenefitCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="rounded-2xl border border-white/12 bg-white/[0.06] p-8 text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-colors duration-300 hover:bg-white/[0.10]"
  >
    <div className="flex items-start gap-6">
      <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-xl" style={{ background: LILAC }}>
        <Icon className="h-7 w-7 text-white" />
      </div>
      <div>
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <p className="text-white/80">{description}</p>
      </div>
    </div>
  </motion.div>
);

export default function BenefitsTabs() {
  const [tab, setTab] = useState("patients");

  const patientBenefits = [
    {
      icon: Smartphone,
      title: "Praticidade na sua mão",
      description:
        "Acesse a terapia de onde estiver, pelo celular ou computador, sem precisar se deslocar.",
    },
    {
      icon: Heart,
      title: "Acessibilidade financeira",
      description:
        "Planos e valores pensados para tornar o cuidado com a saúde mental uma realidade para todos.",
    },
    {
      icon: Shield,
      title: "Privacidade e segurança",
      description:
        "Ambiente 100% sigiloso e criptografado para garantir a confidencialidade das suas sessões.",
    },
    {
      icon: User,
      title: "Profissionais qualificados",
      description:
        "Conecte-se com psicólogos verificados e encontre o profissional ideal para você.",
    },
  ];

  const professionalBenefits = [
    {
      icon: Briefcase,
      title: "Gestão simples de pacientes",
      description:
        "Organize informações e acompanhe o progresso dos seus pacientes de forma centralizada.",
    },
    {
      icon: Calendar,
      title: "Agenda flexível e inteligente",
      description:
        "Gerencie seus horários, defina sua disponibilidade e evite conflitos de agendamento.",
    },
    {
      icon: CreditCard,
      title: "Pagamentos automatizados",
      description:
        "Receba por suas consultas de forma segura e automatizada, sem se preocupar com a cobrança.",
    },
    {
      icon: BarChart,
      title: "Foco total no atendimento",
      description:
        "Reduza a carga administrativa e dedique mais tempo ao que realmente importa: seus pacientes.",
    },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="text-4xl font-extrabold sm:text-5xl text-black">
            Uma plataforma,{" "}
            <span style={{ color: LILAC }}>múltiplos benefícios</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-black/70">
            O Therapy foi desenhado para transformar a experiência de cuidado
            com a saúde mental tanto para pacientes quanto para profissionais.
          </p>
        </motion.div>

        {/* Tabs (pills) */}
        <div className="mb-10 flex justify-center gap-2">
          <button
            role="tab"
            aria-selected={tab === "patients"}
            onClick={() => setTab("patients")}
            className={`rounded-xl px-5 py-2 text-sm font-medium ring-1 transition ${
              tab === "patients"
                ? "bg-white text-black ring-[rgba(198,97,255,0.45)]"
                : "bg-[rgba(198,97,255,0.16)] text-black/80 ring-[rgba(198,97,255,0.35)]"
            }`}
          >
            Para Pacientes
          </button>
          <button
            role="tab"
            aria-selected={tab === "professionals"}
            onClick={() => setTab("professionals")}
            className={`rounded-xl px-5 py-2 text-sm font-medium ring-1 transition ${
              tab === "professionals"
                ? "bg-white text-black ring-[rgba(198,97,255,0.45)]"
                : "bg-[rgba(198,97,255,0.16)] text-black/80 ring-[rgba(198,97,255,0.35)]"
            }`}
          >
            Para Profissionais
          </button>
        </div>

        {/* Content */}
        {tab === "patients" ? (
          <div className="grid gap-8 md:grid-cols-2">
            {patientBenefits.map((b, i) => (
              <PatientBenefitCard key={b.title} {...b} delay={i * 0.08} />
            ))}
          </div>
        ) : (
          <div
            className="rounded-3xl p-8 lg:p-12"
            style={{ background: NAVY, color: "white" }}
          >
            <div className="grid gap-8 md:grid-cols-2">
              {professionalBenefits.map((b, i) => (
                <ProfessionalBenefitCard key={b.title} {...b} delay={i * 0.08} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
