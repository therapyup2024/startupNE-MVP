import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Briefcase, Heart, Zap } from "lucide-react";
import { SignupForm } from "./SignupForm";
import logoImg from '../../assets/icon/therapy-logo.png';

const Hero = () => {
  const [isLaunchModalOpen, setLaunchModalOpen] = useState(false);
  const [isMvpModalOpen, setMvpModalOpen] = useState(false);

  return (
    <>
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

      <section className="relative w-full min-h-screen overflow-hidden text-white bg-[#0C0C47]">
        <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-6 py-24 md:grid-cols-2 md:py-28 lg:py-32">
          {/* Coluna esquerda */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm">
              <Briefcase className="h-4 w-4 text-[#C661FF]" />
              Plataforma em construção
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.02] sm:text-6xl lg:text-[64px]">
              O futuro do cuidado
              <br />
              com a <span className="text-[#C661FF]">saúde mental</span>
              <br />
              está chegando.
            </h1>

            <p className="max-w-xl text-white/80">
              O Therapy está em construção. Em breve, você terá uma plataforma
              completa de terapia online com profissionais qualificados — de forma
              prática, acessível e segura.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={() => setLaunchModalOpen(true)}
                className="rounded-xl px-6 py-3 font-semibold text-white bg-[#7D2AE8] hover:bg-[#A94DFF] transition"
              >
                Quero ser avisado no lançamento
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                onClick={() => setMvpModalOpen(true)}
                variant="outline"
                className="rounded-xl px-6 py-3 font-semibold text-white/90 bg-white/5 hover:bg-white/10 border border-white/20 transition"
              >
                Entrar para a lista de espera do MVP
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-2 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#C661FF]" />
                MVP em desenvolvimento
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-[#C661FF]" />
                Profissionais verificados
              </div>
            </div>
          </motion.div>

          {/* Coluna direita com a logo */}
          <div className="relative flex items-center justify-center">
            <motion.img
              src={logoImg} // salve sua logo em public/therapy-logo.png
              alt="Therapy Logo"
              className="w-[320px] md:w-[400px] lg:w-[460px] select-none pointer-events-none"
              style={{
                filter:
                  "drop-shadow(0 0 25px rgba(198,97,255,.6)) drop-shadow(0 0 40px rgba(125,42,232,.35))",
              }}
              animate={{
                y: [0, -18, 0, 15, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
