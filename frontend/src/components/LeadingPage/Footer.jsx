import React from 'react';
import { Mail, Phone, Globe, Heart } from 'lucide-react';
import { toast } from './ui/use-toast';

const Footer = () => {
  const handleLinkClick = () => {
    toast({
      title: "🚧 Página em construção",
      description: "Este link estará disponível em breve.",
    });
  };

  return (
    <footer className="px-4 bg-gradient-to-b from-[#4C1D95] via-[#5B21B6] to-[#1E1B4B] text-white">
      <div className="max-w-7xl mx-auto pt-20 pb-10">
        <div className="text-center space-y-8">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-brand-purple rounded-lg flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold">Therapy</span>
          </div>
          <p className="text-gray-300">
            Therapy - Plataforma em construção | Versão MVP em breve
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300">
            <a
              href="mailto:contato@therapy.com.br"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>therapy.up2024@gmail.com</span>
            </a>
            <a
              href="https://wa.me/5589994498928"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>(89) 99449-8928</span>
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-center gap-6">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Therapy. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6 text-gray-300 text-sm">
            <button
              onClick={handleLinkClick}
              className="hover:text-white transition-colors"
            >
              Política de Privacidade
            </button>
            <button
              onClick={handleLinkClick}
              className="hover:text-white transition-colors"
            >
              Termos de Uso
            </button>
            <button
              onClick={handleLinkClick}
              className="hover:text-white transition-colors"
            >
              Contato
            </button>
            <button
              onClick={handleLinkClick}
              className="hover:text-white transition-colors"
            >
              Sobre
            </button>
          </div>
        </div>

        <div className="mt-12 bg-white/10 border border-white/20 rounded-2xl p-6 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Globe className="w-5 h-5 text-white" />
            <h4 className="font-bold text-white">Nossa missão</h4>
          </div>
          <p className="text-sm text-gray-200">
            Revolucionar o acesso à saúde mental através da tecnologia. Nossa missão é tornar
            o cuidado psicológico mais acessível, prático e acolhedor para todos.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
