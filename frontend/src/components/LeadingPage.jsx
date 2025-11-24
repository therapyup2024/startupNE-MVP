import React from "react";
import Navbar from "./Navbar.jsx";
import { Helmet } from 'react-helmet-async';
import { Toaster } from './LeadingPage/ui/toaster';
import Hero from './LeadingPage/Hero';
import About from './LeadingPage/About';
import Features from './LeadingPage/Features';
import BenefitsTabs from './LeadingPage/BenefitsTabs';
import MVPInvite from './LeadingPage/MVPInvite';
import SocialProof from './LeadingPage/SocialProof';
import FAQ from './LeadingPage/FAQ';
import FinalCTA from './LeadingPage/FinalCTA';
import Footer from './LeadingPage/Footer';

function LeadingPage() {
  return (
    <>
      <Helmet>
        <title>Therapy - O futuro do cuidado com a saúde mental está chegando</title>
        <meta name="description" content="O Therapy está em construção. Em breve, você terá uma plataforma completa de terapia online com profissionais qualificados — de forma prática, acessível e segura." />
      </Helmet>
      <main className="overflow-x-hidden">
        <div className='bg-[#0C0C47]'>
          <Navbar/>
          <Hero />
        </div>
        <About />
        <Features />
        <BenefitsTabs />
        <MVPInvite />
        <SocialProof />
        <FAQ />
        <FinalCTA />
        <Footer />
        <Toaster />
      </main>

      
    </>

    
  );
}

export default LeadingPage;