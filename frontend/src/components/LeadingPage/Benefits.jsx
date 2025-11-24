import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Heart, Smartphone } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Acesso fácil e rápido à terapia",
      description: "Marque sua consulta em poucos cliques, sem filas ou deslocamentos desnecessários."
    },
    {
      icon: Users,
      title: "Profissionais verificados",
      description: "Todos os psicólogos são credenciados e passam por rigoroso processo de verificação."
    },
    {
      icon: Heart,
      title: "Atendimento acolhedor",
      description: "Ambiente virtual seguro e confortável, pensado para seu bem-estar emocional."
    },
    {
      icon: Smartphone,
      title: "Experiência acessível e prática",
      description: "Interface intuitiva que funciona perfeitamente em qualquer dispositivo."
    }
  ];

  return (
    <section className="py-24 px-4 bg-white text-brand-purple-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold">
            Benefícios esperados para o <span className="text-brand-purple">usuário</span>
          </h2>
          <p className="text-lg text-brand-gray max-w-3xl mx-auto">
            Estamos construindo uma plataforma que prioriza sua experiência e bem-estar em cada detalhe.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-brand-purple-extralight rounded-full opacity-50"></div>
              <div className="relative z-10">
                <div className="bg-brand-purple-extralight w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-8 h-8 text-brand-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-brand-gray">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;