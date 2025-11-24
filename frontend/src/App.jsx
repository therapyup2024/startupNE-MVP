import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import RoleSelection from "./components/RoleSelection";
import ClientLogin from "./components/ClientLogin";
import SingUpClient from "./components/SingUpClient";
import SignUpPsychologist from "./components/SingUpPsychologist";
import PsychologistLogin from "./components/PsychologistLogin";
import MeetHub from "./components/shared/Meet/Patient/meetHub";
import SpecialistMeetHub from "./components/shared/Meet/specialist/SpecialistMeetHub";
import SpecialistMeet from "./components/shared/Meet/specialist/SpecialistMeet";
import PatientMeet from "./components/shared/Meet/Patient/PatientMeet";
import CalendarSchedule from "./components/CalendarSchedule";
import LeadingPage from "./components/LeadingPage";
import SpecialistAccountEdit from "./components/SpecialistAccountEdit";
import ClientAccountEdit from "./components/ClientAccountEdit";
import ClHistorico from "./components/ClHistorico";
import PsHistorico from "./components/PsHistorico";
import PSlist from "./components/PSlist";
import VLibras from "./components/shared/VLibras/baseVLibras";
import PatientRecordList from "./components/ProntuarioComponents/PatientRecordList";
import PatientRecordEditor from "./components/ProntuarioComponents/PatientRecordEditor";
import RecordTemplateManager from "./components/ProntuarioComponents/RecordTemplateManager";
import RecordTemplateEditor from "./components/ProntuarioComponents/RecordTemplateEditor";
import PatientAgenda from "./components/PatientAgenda";
import SupportTherapy from "./components/SupportTherapy";
import SpecialistsSearch from "./components/SpecialistsSearch";
import SpecialistLayout from "./components/shared/SpecialistLayout";
import PatientLayout from "./components/shared/PatientLayout";
import { ToastContainer } from "react-toastify";
import ActivateUserEmail from "./components/ActivateUserEmail";

// COMPONENTE PLACEHOLDER (apenas para páginas que realmente não existem)
const PlaceholderPage = ({ title }) => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">{title}</h1>
    <p>Página em desenvolvimento</p>
  </div>
);

function App() {
  return (
    <>
      <VLibras />
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<LeadingPage />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/leading-page" element={<LeadingPage />} />
        <Route path="/login-cliente" element={<ClientLogin />} />
        <Route path="/login-profissional" element={<PsychologistLogin />} />
        <Route path="/cadastro-cliente" element={<SingUpClient />} />
        <Route path="/cadastro-psicologo" element={<SignUpPsychologist />} />
        <Route path="/validar-cadastro" element={<ActivateUserEmail />} />

        {/* ROTAS DO ESPECIALISTA COM SIDEBAR */}
        <Route path="/specialist" element={<SpecialistLayout />}>
          <Route path="meet" element={<SpecialistMeetHub />} />
          <Route path="meet/:roomId" element={<SpecialistMeet />} />
          <Route path="calendar" element={<CalendarSchedule />} />
          <Route path="history" element={<PsHistorico />} />
          <Route path="patients" element={<PSlist />} />
          <Route path="record-management" element={<PatientRecordList />} />
          <Route path="record-management/editar/:id" element={<PatientRecordEditor />} />
          <Route path="record-management/modelos" element={<RecordTemplateManager />} />
          <Route path="record-management/modelos/novo" element={<RecordTemplateEditor />} />
          <Route path="record-management/modelos/editar/:id" element={<RecordTemplateEditor />} />
          <Route index element={<PsHistorico />} />
        </Route>

        {/* ROTAS DO PACIENTE COM SIDEBAR */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route path="meet" element={<MeetHub />} />
          <Route path="meet/:roomId" element={<PatientMeet />} />
          <Route path="history" element={<ClHistorico />} />
          <Route path="specialists" element={<SpecialistsSearch />} /> {/* CORRIGIDO: Agora usa o componente real */}
          <Route path="schedule" element={<PatientAgenda />} />
          <Route path="settings" element={<PlaceholderPage title="Configurações do Paciente" />} />
          <Route index element={<ClHistorico />} />
        </Route>

        {/* ROTAS DIRETAS DE MEET (para compatibilidade) */}
        <Route path="/meet-paciente" element={<MeetHub />} />
        <Route path="/meet-paciente/:roomId" element={<PatientMeet />} />
        <Route path="/meet-especialista" element={<SpecialistMeetHub />} />
        <Route path="/meet-especialista/:roomId" element={<SpecialistMeet />} />

        {/* Rotas antigas (mantidas para compatibilidade) */}
        <Route path="/calendario-de-consultas" element={<CalendarSchedule />} />
        <Route path="/editar-conta-especialista" element={<SpecialistAccountEdit />} />
        <Route path="/editar-conta-cliente" element={<ClientAccountEdit />} />
        <Route path="/ClHistorico" element={<ClHistorico />} />
        <Route path="/PsHistorico" element={<PsHistorico />} />
        <Route path="/PSlist" element={<PSlist />} />
        <Route path="/buscar-especialista" element={<SpecialistsSearch />} />
        <Route path="/agenda-paciente" element={<PatientAgenda />} />

        {/* ROTAS DE GESTÃO */}
        <Route path="/gestao-prontuarios" element={<PatientRecordList />} />
        <Route path="/gestao-prontuarios/editar/:id" element={<PatientRecordEditor />} />
        <Route path="/gestao-prontuarios/modelos" element={<RecordTemplateManager />} />
        <Route path="/gestao-prontuarios/modelos/novo" element={<RecordTemplateEditor />} />
        <Route path="/gestao-prontuarios/modelos/editar/:id" element={<RecordTemplateEditor />} />

        {/* REMOVIDAS: Rotas de chat (não temos os componentes) */}
        {/* <Route path="/chat-profissional" element={<ChatProfessional />} /> */}
        {/* <Route path="/chat-paciente" element={<ChatPatient />} /> */}

        {/* REMOVIDAS: Rotas aninhadas redundantes de meet */}
        {/* <Route path="/meet-especialista">
          <Route index element={<SpecialistMeetHub />} />
          <Route path=":roomId" element={<SpecialistMeet />} />
        </Route>

        <Route path="/meet-paciente">
          <Route index element={<MeetHub />} />
          <Route path=":roomId" element={<PatientMeet />} />
        </Route> */}

        <Route path="/SupportTherapy" element={<SupportTherapy />} />
          {/* teste */}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
