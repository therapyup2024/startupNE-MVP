import React from "react";
import { Users, Video, Calendar, CalendarDays, User } from "lucide-react";
import SidebarItem from "../common/SidebarItem";

export default function PatientMenu({ activeItem, onItemClick, isCollapsed }) {
  const patientItems = [
    { id: "specialists", text: "Outros Especialistas", icon: <Users size={20} /> },
    { id: "meet", text: "Meet", icon: <Video size={20} /> },
    { id: "consultation-history", text: "Histórico de Consultas", icon: <Calendar size={20} /> },
    { id: "schedule", text: "Agenda", icon: <CalendarDays size={20} /> },
    { id: "account-edit", text: "Editar Conta", icon: <User size={20} /> },
  ];

  return (
    <>
      {patientItems.map((item) => (
        <SidebarItem
          key={item.id}
          icon={item.icon}
          text={item.text}
          active={activeItem === item.id}
          alert={false}
          onClick={() => onItemClick(item.id)}
          isCollapsed={isCollapsed}
        />
      ))}
    </>
  );
}
