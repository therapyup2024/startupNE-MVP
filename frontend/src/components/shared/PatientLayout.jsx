// src/components/shared/PatientLayout.jsx
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PatientSidebar from "./Sidebar/PatientSidebar";
import { apiServer } from "../../api/server";
import { mappers } from "../../lib/utils";

export default function PatientLayout() {
  const [userData, setUserData] = useState({
    name: null,
    email: null,
    imagem: null
  });

  const navigate = useNavigate();

  const loadUserData = async () => {
    const profileData = await apiServer(navigate).customer.profile();
    setUserData({...mappers.costumer_to_cliente(profileData)});
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <div className="flex h-screen">
      <PatientSidebar userData={userData} />
      <div className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}