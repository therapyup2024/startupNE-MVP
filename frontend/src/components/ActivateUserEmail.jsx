import React, { useEffect, useState } from "react"; // 1. Importe o useState
import { useNavigate } from "react-router-dom";
import ParticlesBackground from "./ParticleBackground.jsx";
import { apiServer } from "../api/server.js";

function ActivateUserEmail() {
  const navigate = useNavigate();

  const [validationData, setValidationData] = useState({
    type: "",
    email: "",
    code: ""
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    const accountType = urlParams.get('type');
    console.log(accountType);

    const validationCode = urlParams.get('code');
    console.log(validationCode);

    const validationEmail = urlParams.get('email');
    console.log(validationEmail);

    setValidationData({
        type: accountType,
        email: validationEmail,
        code: validationCode
    })
  }, []);

  const handleConfirm = async (e) => {
    e.preventDefault();
    console.log({ validationData });
    if(validationData.type == 'customer')
        await apiServer(navigate).customer.validateProfile({code: validationData.code, email: validationData.email});
    if(validationData.type == 'professional')
        await apiServer(navigate).professional.validateProfile({code: validationData.code, email: validationData.email});
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#10002B] via-[#240046] to-[#3C096C] flex flex-col z-10">
      <>
        <ParticlesBackground />
      </>

      <main className="flex-grow flex items-center justify-center z-10">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 w-[500px] shadow-2xl text-white">
          <h2 className="text-center text-2xl font-bold mb-6">
            Confirmar seu cadastro
          </h2>

          <form onSubmit={handleConfirm} className="space-y-4">
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 transition-all p-3 rounded-lg font-semibold shadow-md"
            >
              Confirmar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ActivateUserEmail;