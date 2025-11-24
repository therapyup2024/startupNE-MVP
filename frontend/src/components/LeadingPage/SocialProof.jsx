import React from "react";
import { motion } from "framer-motion";
import { Quote, Star, Users } from "lucide-react";

const LILAC = "#C661FF";
const PURPLE = "#7D2AE8";

export default function SocialProof() {
  const testimonials = [
    {
      quote:
        "Estou muito animada para conhecer a plataforma! Acredito que ela vai facilitar meu acesso a atendimentos de qualidade sem sair de casa.",
      author: "Ana Paula",
      role: "Cliente",
      icon: Quote,
      avatarUrl:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=128&auto=format&fit=facearea&facepad=2&h=128",
    },
    {
      quote:
        "Tenho grandes expectativas em relação ao MVP. Espero que ele facilite ainda mais a conexão entre psicólogos e pacientes, trazendo organização e eficiência.",
      author: "Felipe Silva",
      role: "Psicólogo",
      icon: Star,
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face",
    },
    {
      quote:
        "Tenho grandes expectativas.  Acredito que essa inovação vai aproximar as pessoas do cuidado psicológico e transformar o acesso à saúde mental.",
      author: "Adilon Oliveira",
      role: "Psicólogo",
      icon: Users,
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face",
    },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div
            className="mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{
              background: "rgba(198,97,255,0.14)",
              border: "1px solid rgba(125,42,232,0.25)",
              color: PURPLE,
            }}
          >
            <Star className="h-4 w-4" />
            <span>Expectativas para o MVP</span>
          </div>

          <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl text-black">
            O que nossos <span style={{ color: LILAC }}>futuros usuários</span>{" "}
            esperam
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-black/70">
            Recomendações e expectativas de clientes e psicólogos para o
            lançamento do nosso MVP.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
            >
              <t.icon className="mb-4 h-8 w-8" style={{ color: PURPLE }} />
              <p className="mb-6 italic text-black/70">"{t.quote}"</p>

              <div className="flex items-center gap-4">
                <img
                  src={t.avatarUrl}
                  alt={t.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-black">{t.author}</p>
                  <p className="text-sm text-black/70">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner de prova social */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-14 max-w-4xl rounded-2xl p-6 text-center"
          style={{
            background: "rgba(198,97,255,0.14)",
            border: "1px solid rgba(125,42,232,0.25)",
          }}
        >
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex items-center gap-2" style={{ color: PURPLE }}>
              <Users className="h-5 w-5" />
              <span className="font-semibold">
                Mais de 200 pessoas já aguardam o MVP
              </span>
            </div>
            <p className="text-black/70">
              Venha ser parte dessa transformação no cuidado com a saúde mental
              digital.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
