import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BaseSidebar from "./BaseSidebar";
import SpecialistMenu from "./specialist/SpecialistMenu";

export default function SpecialistSidebar({ userData, activeItem: initialActiveItem }) {
  const [activeItem, setActiveItem] = useState(initialActiveItem || "consultation-history");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Atualiza o activeItem quando a rota muda
  useEffect(() => {
    const getActiveItemFromPath = () => {
      const pathMap = {
        "/specialist": "consultation-history",
        "/specialist/meet": "meet",
        "/specialist/calendar": "calendar",
        "/specialist/history": "consultation-history",
        "/specialist/patients": "patient-list",
        "/specialist/record-management": "record-management",
        "/specialist/record-management/modelos": "templates",
        "/editar-conta-especialista": "account-edit"
      };
      return pathMap[location.pathname] || "consultation-history";
    };
    
    setActiveItem(getActiveItemFromPath());
  }, [location.pathname]);

  const handleItemClick = (itemId) => {
    const routeMap = {
      "meet": "/specialist/meet",
      "meet-history": "/specialist/meet",
      "consultation-history": "/specialist/history",
      "calendar": "/specialist/calendar", 
      "patient-list": "/specialist/patients",
      "record-management": "/specialist/record-management",
      "templates": "/specialist/record-management/modelos",
      "account-edit": "/editar-conta-especialista"
    };

    if (routeMap[itemId]) {
      navigate(routeMap[itemId]);
    }
  };

  const handleLogout = () => {
    navigate('/login-profissional');
  };

  const user = {
    name: userData?.nome || "Especialista",
    email: userData?.email || "especialista@email.com",
    avatar: userData?.imagem,
  };

  return (
    <BaseSidebar 
      user={user} 
      isCollapsed={isCollapsed}
      onToggle={() => setIsCollapsed(!isCollapsed)}
      onLogout={handleLogout}
    >
      <SpecialistMenu 
        activeItem={activeItem}
        onItemClick={handleItemClick}
        isCollapsed={isCollapsed}
      />
    </BaseSidebar>
  );
}