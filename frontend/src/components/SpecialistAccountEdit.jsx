import React, { useState, useRef, useEffect } from "react";
import SpecialistSidebar from "./shared/Sidebar/SpecialisSidebar";
import { SquarePen, Check, User, ImageUp, Trash2 } from "lucide-react";
import { apiServer } from "../api/server";
import { mappers } from "../lib/utils.js";
import { useNavigate } from "react-router-dom";

function SpecialistAccountEdit() {
  const navigate = useNavigate();

  const [uid, setUid] = useState("");
  const [dadosAlterados, setDadosAlterados] = useState([]);

  const [personalData, setPersonalData] = useState({
    nome: "",
    telefone: "",
    genero: "",
  });

  const [professionalData, setProfessionalData] = useState({
    especialidade: "",
    abordagem: "",
    descricao: "",
    imagem: "",
  });

  const [photoPreview, setPhotoPreview] = useState("");
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const fileInputRef = useRef(null);
  const dadosOriginaisDoPerfil = useRef({
    nome: "",
    telefone: "",
    genero: "",
    especialidade: "",
    abordagem: "",
    descricao: "",
    imagem: "",
  });

  const loadProfessionalData = async () => {
    const profileData = await apiServer(navigate).professional.profile();
    setUid(profileData.uid);
    setPersonalData({ ...mappers.professional_to_especialista(profileData) });
    setProfessionalData({ ...mappers.professional_to_especialista(profileData) })
    dadosOriginaisDoPerfil.current = { ...mappers.professional_to_especialista(profileData) };
  }

  useEffect(() => {
    loadProfessionalData();
  }, []);

  const handleInputChange = (section, fieldName, value) => {
    if (section === "personal") {
      setPersonalData((prev) => ({ ...prev, [fieldName]: value }));
    } else {
      setProfessionalData((prev) => ({ ...prev, [fieldName]: value }));
    }

    if(dadosOriginaisDoPerfil.current[fieldName] !== value) {
      if(!dadosAlterados.filter(elm => elm === fieldName).length)
        setDadosAlterados([...dadosAlterados, fieldName])
    } else
      setDadosAlterados(dadosAlterados.filter(elm => elm !== fieldName))
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
    setShowPhotoOptions(false);
  };

  const handleRemovePhoto = () => {
    setPhotoPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setShowPhotoOptions(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveAll = async () => {
    const dados = {
      ...personalData,
      ...professionalData,
    };

    if(dadosAlterados.length)
      await apiServer(navigate).professional.update(uid, mappers.especialista_to_professional(dados));
    
    if(photoPreview.length)
      await apiServer(navigate).upload.profile("#image-upload-input");
  };

  return (
    <div className="flex h-screen w-full bg-[#ffffff]">
      <SpecialistSidebar activeItem="settings" />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white/80 border-b border-gray-200/60 px-6 py-5 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">
            Configurações do Perfil
          </h1>
          <p className="text-gray-600">
            Gerencie suas informações pessoais e profissionais
          </p>
        </header>

        <main className="flex-1 p-6 md:p-3 overflow-y-auto">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="relative">
                <label className="block w-full text-center text-gray-700 text-sm font-semibold mb-3 tracking-wide">
                  Foto do Perfil
                </label>
                {photoPreview ? (
                  <div
                    className="relative cursor-pointer"
                    onClick={() => setShowPhotoOptions(!showPhotoOptions)}
                  >
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-48 h-48 rounded-full object-cover border-2 border-purple-400 shadow-lg mx-auto"
                    />
                    <button
                      onClick={() => setShowPhotoOptions(!showPhotoOptions)}
                      className="cursor-pointer absolute bottom-3 right-3 bg-purple-600 text-white p-2.5 rounded-full shadow-md hover:bg-purple-700 transition-all duration-200  z-20"
                    >
                      <SquarePen className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div
                    className="relative cursor-pointer"
                    onClick={() => setShowPhotoOptions(!showPhotoOptions)}
                  >
                    {professionalData.imagem != ""? (
                      <img
                        src={professionalData.imagem}
                        alt="Preview"
                        className="w-48 h-48 rounded-full object-cover border-2 border-purple-400 shadow-lg mx-auto"
                      />
                    ) : (
                      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-gray-300 flex items-center justify-center shadow-sm mx-auto">
                        <User className="w-14 h-14  text-gray-600" />
                      </div>
                    )}
                    <button
                      onClick={() => setShowPhotoOptions(!showPhotoOptions)}
                      className="cursor-pointer absolute bottom-3 right-3 bg-purple-600 text-white p-2.5 rounded-full shadow-md hover:bg-purple-700 transition-all duration-200  z-20"
                    >
                      <SquarePen className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              <input
                type="file"
                id="image-upload-input"
                ref={fileInputRef}
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />

              {showPhotoOptions && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-white rounded-lg shadow-xl border border-gray-200 z-10 min-w-[140px]">
                  <div className="py-1">
                    <button
                      onClick={handleUploadClick}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <ImageUp className="w-4 h-4" />
                      Upload
                    </button>
                    {photoPreview && (
                      <button
                        onClick={handleRemovePhoto}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remover
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

            <section className="">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    value={personalData.nome}
                    onChange={(e) =>
                      handleInputChange(
                        "personal",
                        "nome",
                        e.target.value
                      )
                    }
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-1 outline-none focus:ring-purple-500 focus:border-purple-500 transition-all bg-white shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Gênero
                  </label>
                  <select
                    value={personalData.genero}
                    onChange={(e) =>
                      handleInputChange("personal", "genero", e.target.value)
                    }
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white shadow-sm"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                    <option value="Prefiro não dizer">Prefiro não dizer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={personalData.telefone}
                    onChange={(e) =>
                      handleInputChange("personal", "telefone", e.target.value)
                    }
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-1 outline-none focus:ring-purple-500 focus:border-purple-500 transition-all bg-white shadow-sm"
                  />
                </div>
              </div>
            </section>

            <section className="">

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Especialidade
                  </label>
                  <select
                    value={professionalData.especialidade}
                    onChange={(e) =>
                      handleInputChange("professional", "especialidade", e.target.value)
                    }
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white shadow-sm"
                  >
                    <option value="Psicólogo(a)">Psicólogo(a)</option>
                    <option value="Psicanalista">Psicanalista</option>
                    <option value="Terapeuta">Terapeuta</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Abordagem
                  </label>
                  <input
                    type="text"
                    value={professionalData.abordagem}
                    onChange={(e) =>
                      handleInputChange(
                        "professional",
                        "abordagem",
                        e.target.value
                      )
                    }
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-1 outline-none focus:ring-purple-500 focus:border-purple-500 transition-all bg-white shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1">
                    Descrição
                  </label>
                  <textarea
                    value={professionalData.descricao}
                    onChange={(e) =>
                      handleInputChange(
                        "professional",
                        "descricao",
                        e.target.value
                      )
                    }
                    rows={4}
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-1 outline-none focus:ring-purple-500 focus:border-purple-500 transition-all bg-white shadow-sm resize-none"
                  />
                </div>
              </div>
            </section>
            <div className=" col-span-2  flex justify-end">
              <button
                onClick={handleSaveAll}
                className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
              >
                <Check />
                Salvar Alterações
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SpecialistAccountEdit;