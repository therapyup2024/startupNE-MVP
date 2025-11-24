import React from "react";
import { motion } from "framer-motion";
import { Heart, Zap, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Cuidado humanizado",
    description: "Profissionais qualificados focados no seu bem-estar",
  },
  {
    icon: Zap,
    title: "Tecnologia intuitiva",
    description: "Interface simples e funcional para facilitar seu acesso",
  },
  {
    icon: Shield,
    title: "Segurança total",
    description:
      "Seus dados e conversas protegidos com criptografia avançada",
  },
  {
    icon: Users,
    title: "Comunidade de apoio",
    description:
      "Faça parte de uma rede que valoriza a saúde mental",
  },
];

export default function About() {
  return (
    <section className="bg-white py-20 px-6 text-[hsl(var(--color-foreground))]">
      <div className="mx-auto max-w-6xl">
        {/* Título + subtítulo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="text-4xl font-extrabold sm:text-5xl">
            Sobre o{" "}
            <span className="text-[hsl(var(--color-brand-purple-light))]">
              Therapy
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-black/70">
            Estamos desenvolvendo o Therapy, uma plataforma de teleconsultas
            psicológicas. Nosso MVP (versão inicial) oferecerá atendimentos
            online agendados e plantão psicológico, permitindo que você
            experimente a praticidade e acolhimento da terapia digital.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-black/[0.06] bg-white p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-xl ring-1 ring-[rgba(198,97,255,0.35)]"
                   style={{ background: "rgba(198,97,255,0.14)" }}>
                <item.icon className="h-8 w-8" style={{ color: "#7D2AE8" }} />
              </div>

              <h3 className="mb-2 text-lg font-bold text-black">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-black/70">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
