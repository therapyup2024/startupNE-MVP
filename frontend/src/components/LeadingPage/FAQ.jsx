import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

// paleta fixa
const PURPLE = "#7D2AE8";
const LILAC_BG = "rgba(198,97,255,0.14)";
const LILAC_BORDER = "rgba(125,42,232,0.25)";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "O que é o MVP do Therapy?",
      answer:
        "O MVP (Produto Mínimo Viável) é a versão inicial do Therapy que incluirá funcionalidades essenciais como videochamadas para sessões de terapia, sistema de agendamento básico e área do usuário. É nossa forma de validar o produto com usuários reais antes do lançamento completo.",
    },
    {
      question: "Como posso participar?",
      answer:
        "Você pode se inscrever na nossa lista de espera para o MVP ou para ser notificado no lançamento oficial. Os participantes do MVP terão acesso antecipado e poderão nos ajudar com feedbacks valiosos.",
    },
    {
      question: "O Therapy já está disponível?",
      answer:
        "Ainda não. A plataforma está em fase final de desenvolvimento. O lançamento do MVP está previsto para breve. Inscreva-se para ser um dos primeiros a saber!",
    },
    {
      question:
        "Os atendimentos são feitos por profissionais credenciados?",
      answer:
        "Sim. A segurança e a qualidade são nossas prioridades. Todos os psicólogos da plataforma passam por um rigoroso processo de verificação e devem possuir registro ativo no Conselho Regional de Psicologia (CRP).",
    },
    {
      question: "Como será garantida a privacidade?",
      answer:
        "Levamos sua privacidade a sério. Todas as comunicações na plataforma serão criptografadas de ponta a ponta, e seguimos a LGPD para garantir a segurança e confidencialidade das suas informações.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex((curr) => (curr === index ? null : index));
  };

  return (
    <section className="bg-white py-20 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div
            className="mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: LILAC_BG, border: `1px solid ${LILAC_BORDER}`, color: PURPLE }}
          >
            <HelpCircle className="h-4 w-4" />
            <span>Perguntas frequentes</span>
          </div>
          <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl text-black">
            Dúvidas sobre o <span style={{ color: PURPLE }}>MVP</span>
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-black/70">
            Esclarecemos as principais questões sobre nossa fase de desenvolvimento e como você pode participar.
          </p>
        </motion.div>

        {/* List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="overflow-hidden rounded-2xl"
                style={{ background: `${LILAC_BG}`, border: `1px solid ${LILAC_BORDER}` }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${index}`}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <h3 className="pr-4 text-lg font-semibold text-black">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-6 w-6 flex-shrink-0 transition-transform duration-300`}
                    style={{ color: PURPLE, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <p className="leading-relaxed text-black/70">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
