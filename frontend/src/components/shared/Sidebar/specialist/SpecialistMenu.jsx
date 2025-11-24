import React, { useState } from "react";
import {
  Video,
  History,
  Folder,
  FileText,
  Calendar,
  CalendarDays,
  Users,
  User,
  FileBox
} from "lucide-react";
import SidebarItem from "../common/SidebarItem";

export default function SpecialistMenu({ activeItem, onItemClick, isCollapsed }) {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const menuItems = [
    {
      id: "meet",
      text: "Meet",
      icon: <Video size={20} />,
      type: "parent",
      subitems: [
        {
          id: "meet-history",
          text: "Histórico de meets",
          icon: <History size={20} />,
        }
      ]
    },
    {
      id: "consultation-history",
      text: "Histórico de Consultas",
      icon: <Calendar size={20} />,
      type: "single"
    },
    {
      id: "agenda",
      text: "Agenda",
      icon: <Calendar size={20} />,
      type: "parent",
      subitems: [
        {
          id: "calendar",
          text: "Calendário",
          icon: <CalendarDays size={20} />,
        }
      ]
    },
    {
      id: "patient-list",
      text: "Lista de Pacientes",
      icon: <Users size={20} />,
      type: "single"
    },
    {
      id: "management",
      text: "Gestão de Documentos",
      icon: <Folder size={20} />,
      type: "parent",
      subitems: [
        {
          id: "record-management",
          text: "Gestão de Prontuários",
          icon: <FileText size={20} />,
        },
        {
          id: "templates",
          text: "Modelos de Documentos",
          icon: <FileBox size={20} />,
        }
      ]
    },
    {
      id: "account-edit",
      text: "Editar Conta",
      icon: <User size={20} />,
      type: "single"
    }
  ];

  const handleItemClick = (itemId, itemType) => {
    if (itemType === "parent") {
      toggleExpanded(itemId);
    } else {
      onItemClick?.(itemId);
    }
  };

  return (
    <>
      {menuItems.map((item) => (
        <div key={item.id}>
          <SidebarItem
            icon={item.icon}
            text={item.text}
            active={activeItem === item.id}
            hasSubitems={item.type === "parent"}
            isExpanded={expandedItems[item.id]}
            isCollapsed={isCollapsed}
            onClick={() => handleItemClick(item.id, item.type)}
          />

          {item.type === "parent" && expandedItems[item.id] && !isCollapsed && (
            <div className="ml-6 border-l-2 border-gray-200 dark:border-gray-700">
              {item.subitems.map((subitem) => (
                <SidebarItem
                  key={subitem.id}
                  icon={subitem.icon}
                  text={subitem.text}
                  active={activeItem === subitem.id}
                  isSubitem={true}
                  isCollapsed={isCollapsed}
                  onClick={() => onItemClick?.(subitem.id)}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}