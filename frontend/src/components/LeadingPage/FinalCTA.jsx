import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { SignupForm } from "./SignupForm";

/**
 * Paleta fixa para garantir o visual do print
 */
const PURPLE = "#7D2AE8";
const GRADIENT_FROM = "#6D28D9"; // roxo escuro
const GRADIENT_TO = "#9333EA";   // roxo vivo
const CARD_BORDER = "rgba(255,255,255,0.20)";
const CARD_BG = "rgba(255,255,255,0.10)";
const TEXT_FAINT = "rgba(255,255,255,0.6)";

/**
 * Uma textura suave sem dependência externa.
 * (hexágonos/leves linhas com opacidade baixa)
 */
const textureStyle = {
  backgroundImage:
    `radial-gradient(ellipse at 20% 10%, rgba(255,255,255,.08), transparent 60%),
     radial-gradient(ellipse at 80% 0%, rgba(255,255,255,.06), transparent 55%),
     linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px),
     linear-gradient(0deg, rgba(255,255,255,.03) 1px, transparent 1px)`,
  backgroundSize: "100% 100%, 100% 100%, 24px 24px, 24px 24px",
  backgroundPosition: "center, center, center, center",
  opacity: 0.18,
};

export default function FinalCTA() {
  const [isLaunchModalOpen, setLaunchModalOpen] = useState(false);
  const [isMvpModalOpen, setMvpModalOpen] = useState(false);

  return (
    <>
      {/* Modais que você já tem */}
      <SignupForm
        isOpen={isLaunchModalOpen}
        setIsOpen={setLaunchModalOpen}
        title="Seja o primeiro a saber!"
        description="Deixe seu e-mail para ser notificado sobre o lançamento oficial do Therapy."
        buttonText="Quero ser avisado"
        listType="launch_list"
      />
      <SignupForm
        isOpen={isMvpModalOpen}
        setIsOpen={setMvpModalOpen}
        title="Participe do nosso MVP"
        description="Inscreva-se com seu e-mail para ter a chance de participar da fase inicial do Therapy e nos ajudar a construir a melhor plataforma."
        buttonText="Entrar na lista de espera"
        listType="mvp_list"
      />

      <section className="py-24 px-4 bg-white">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl p-10 sm:p-12 lg:p-20"
            style={{
              background: `linear-gradient(135deg, ${GRADIENT_FROM}, ${GRADIENT_TO})`,
              color: "white",
            }}
          >
            {/* Textura suave */}
            <div className="absolute inset-0 pointer-events-none" style={textureStyle} />

            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl font-extrabold leading-tight lg:text-5xl">
                Estamos quase prontos para abrir as portas do Therapy.
              </h2>

              <p
                className="mx-auto max-w-3xl text-lg"
                style={{ color: TEXT_FAINT }}
              >
                Inscreva-se para ser um dos primeiros a experimentar nossa
                plataforma de terapia online e faça parte da revolução no
                cuidado com a saúde mental.
              </p>

              {/* Blocos de destaque */}
              <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 text-left md:grid-cols-2">
                <div
                  className="rounded-2xl p-6"
                  style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
                >
                  <h3 className="mb-2 text-xl font-bold">Acesso prioritário ao MVP</h3>
                  <p style={{ color: TEXT_FAINT }}>
                    Seja um dos primeiros a testar e ajude a moldar a plataforma.
                  </p>
                </div>

                <div
                  className="rounded-2xl p-6"
                  style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
                >
                  <h3 className="mb-2 text-xl font-bold">Notificação de lançamento</h3>
                  <p style={{ color: TEXT_FAINT }}>
                    Avise-me quando a versão completa estiver no ar.
                  </p>
                </div>
              </div>

              {/* Ações */}
              <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
                <Button
                  onClick={() => setMvpModalOpen(true)}
                  className="rounded-lg bg-white px-6 py-3 font-bold text-[var(--tw-brand-purple,#7D2AE8)] transition-transform hover:scale-[1.03] hover:bg-gray-200"
                  style={{ color: PURPLE }}
                >
                  Entrar na lista de espera <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  onClick={() => setLaunchModalOpen(true)}
                  variant="outline"
                  className="rounded-lg border-white/50 bg-transparent px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Quero ser avisado no lançamento
                </Button>
              </div>

              <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                Mais de 100 pessoas já manifestaram interesse• Seja você também
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
