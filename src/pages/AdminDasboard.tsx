import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import Sidebar from "../components/Ui/D.Admin"; 
import StatusLaporan from "../components/Ui/StatusLaporan";
import TingkatKekerasan from "../components/Ui/TingkatKekerasan";

const Dashboard: React.FC = () => {
    const navigate = useNavigate(); 
    const [selectedMenu, setSelectedMenu] = useState<string>("laporan"); // State untuk menyimpan menu aktif

    // useEffect(() => {
    //     const role = localStorage.getItem("role");
    //     if (role === "admin") {
    //         navigate("/dashboard");
    //     }
    // }, [navigate]);

    // Fungsi untuk kembali ke beranda
    const handleBackHome = () => {
        navigate("/"); 
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar dengan onMenuClick untuk mengubah konten */}
            <Sidebar onMenuClick={setSelectedMenu} />

            {/* Konten utama */}
            <div className="flex-1 p-4 relative bg-purple-200">
                {/* Tombol kembali di kanan atas */}
                <div className="flex justify-end">
                    <button 
                        onClick={handleBackHome}
                        className="flex items-center text-[#8B5CF6] hover:text-[#7C3AED] transition-colors font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Beranda
                    </button>
                </div>
                
                {/* Header Dashboard */}
                <div className="mt-6"> 
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <hr className="w-36 border-black mt-2 border-t-2" />
                </div>

                {/* Konten dinamis berdasarkan menu yang dipilih */}
                <div className="mt-6">
                    {selectedMenu === "laporan" && (
                        <>
                        <button className="mb-1 mx-3 px-4 py-2 mt-7 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Status Laporan
                        </button>
                        <StatusLaporan />
                    </> 
                     )}
                    {selectedMenu === "tingkat" && <TingkatKekerasan />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
