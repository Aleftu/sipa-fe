import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

interface SidebarProps {
  onMenuClick: (menu: string) => void; // Callback untuk mengubah konten di Dashboard
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuClick }) => {
  const [activeMenu, setActiveMenu] = useState<string>("laporan");

  const handleClick = (menu: string) => {
    setActiveMenu(menu);
    onMenuClick(menu); // Mengubah state di Dashboard
  };

  return (
    <div className="w-64 bg-purple-700 text-white h-screen p-3 mx-0">
      <div className="flex justify-center">
        <FaUserCircle size={58} color="purple" />
      </div>
      <h2 className="text-sm font-semibold text-center">Admin</h2>
      <p className="text-gray-400 text-xs text-center">sipasopia@gmail.com</p>
      <ul className="mt-6">
        {[
          { key: "laporan", label: "Laporan Korban" },
          { key: "tingkat", label: "Laporan Tingkat Kekerasan" },
        ].map((item) => (
          <li key={item.key}>
            <button
              className={`block w-full text-left px-2 py-1 m-1 rounded ${
                activeMenu === item.key
                  ? "bg-purple-500"
                  : "hover:bg-purple-400"
              }`}
              onClick={() => handleClick(item.key)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;