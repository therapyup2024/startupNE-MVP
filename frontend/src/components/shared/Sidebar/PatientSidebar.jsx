import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BaseSidebar from "./BaseSidebar";
import PatientMenu from "./patient/PatientMenu";

export default function PatientSidebar({ userData, activeItem: initialActiveItem }) {
  const [activeItem, setActiveItem] = useState(initialActiveItem || "consultation-history");
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Atualiza o activeItem quando a rota muda
  useEffect(() => {
    const getActiveItemFromPath = () => {
      const pathMap = {
        "/patient": "consultation-history",
        "/patient/meet": "meet",
        "/patient/history": "consultation-history",
        "/patient/specialists": "specialists",
        "/patient/schedule": "schedule",
        "/patient/settings": "settings",
        "/editar-conta-cliente": "account-edit"
      };
      return pathMap[location.pathname] || "consultation-history";
    };
    
    setActiveItem(getActiveItemFromPath());
  }, [location.pathname]);

  const handleItemClick = (itemId) => {
    const routeMap = {
      "specialists": "/patient/specialists",
      "meet": "/patient/meet",
      "consultation-history": "/patient/history",
      "schedule": "/patient/schedule",
      "settings": "/patient/settings",
      "account-edit": "/editar-conta-cliente"
    };

    if (routeMap[itemId]) {
      navigate(routeMap[itemId]);
    }
  };

  const handleLogout = () => {
    console.log("Paciente solicitou logout");
    navigate('/login-cliente');
  };

  const user = {
    name: userData?.nome || "Paciente",
    email: userData?.email || "paciente@email.com",
    avatar: userData?.imagem,
  };

  return (
    <BaseSidebar 
      user={user} 
      isCollapsed={isCollapsed}
      onToggle={() => setIsCollapsed(!isCollapsed)}
      onLogout={handleLogout}
    >
      <PatientMenu 
        activeItem={activeItem}
        onItemClick={handleItemClick}
        isCollapsed={isCollapsed}
      />
    </BaseSidebar>
  );
}