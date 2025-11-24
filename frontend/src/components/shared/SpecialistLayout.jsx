// src/components/shared/SpecialistLayout.jsx
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SpecialistSidebar from "./Sidebar/SpecialisSidebar";
import { apiServer } from "../../api/server";
import { mappers } from "../../lib/utils";

export default function SpecialistLayout() {
  const [userData, setUserData] = useState({
    name: null,
    email: null,
    imagem: null
  });

  const navigate = useNavigate();

  const loadUserData = async () => {
    const profileData = await apiServer(navigate).professional.profile();
    setUserData({...mappers.professional_to_especialista(profileData)});
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <div className="flex h-screen">
      <SpecialistSidebar userData={userData} />
      <div className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}