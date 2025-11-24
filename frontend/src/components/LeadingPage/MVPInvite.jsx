import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Rocket, Star, Users } from "lucide-react";
import { SignupForm } from "./SignupForm";

// paleta fixa
const PURPLE = "#7D2AE8";
const PURPLE_DARK = "#5F28C2";
const LILAC = "#C661FF";

export default function MVPInvite() {
  const [isMvpModalOpen, setMvpModalOpen] = useState(false);

  return (
    <>
      <SignupForm
        isOpen={isMvpModalOpen}
        setIsOpen={setMvpModalOpen}
        title="Participe do nosso MVP"
        description="Inscreva-se com seu e-mail para ter a chance de participar da fase inicial do Therapy e nos ajudar a construir a melhor plataforma."
        buttonText="Quero participar do MVP"
        listType="mvp_list"
      />

      <section
        className="relative w-full py-24 px-6 text-white"
        style={{
          background:
            `linear-gradient(180deg, ${PURPLE} 0%, ${PURPLE_DARK} 100%)`,
        }}
      >
        {/* radiais sutis para profundidade */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_15%,rgba(198,97,255,0.22),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_80%_30%,rgba(255,255,255,0.10),transparent_65%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* selo */}
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm">
              <Star className="h-4 w-4 text-yellow-300" />
              <span>Convite especial</span>
            </div>

            {/* título */}
            <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Participe da nossa fase inicial e ajude a construir o
              Therapy com a gente.
            </h2>

            {/* subtítulo */}
            <p className="mx-auto max-w-3xl text-white/85">
              Seja um dos pioneiros na construção da plataforma que vai
              revolucionar o acesso à saúde mental. Sua participação e feedback
              serão fundamentais para criar a melhor experiência possível.
            </p>

            {/* cards */}
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 text-left md:grid-cols-2">
              <div className="rounded-2xl border border-white/25 bg-white/10 p-6">
                <Rocket className="mb-4 h-8 w-8 text-white" />
                <h3 className="mb-2 text-xl font-bold">Seja pioneiro</h3>
                <p className="text-white/85">
                  Teste funcionalidades exclusivas antes do lançamento oficial
                  e ajude a moldar o futuro da terapia digital.
                </p>
              </div>

              <div className="rounded-2xl border border-white/25 bg-white/10 p-6">
                <Users className="mb-4 h-8 w-8 text-white" />
                <h3 className="mb-2 text-xl font-bold">Impacte vidas</h3>
                <p className="text-white/85">
                  Contribua para criar uma plataforma que tornará o cuidado
                  psicológico acessível para milhares de pessoas.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div>
              <Button
                onClick={() => setMvpModalOpen(true)}
                className="rounded-lg bg-white px-8 py-4 text-lg font-bold text-[#5F28C2] transition hover:bg-gray-100"
              >
                Quero participar do MVP
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="mt-4 text-sm text-white/85">
                Vagas limitadas • Participação gratuita
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
