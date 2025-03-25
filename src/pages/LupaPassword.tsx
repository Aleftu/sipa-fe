import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch ("https://api-sipa-capstone-production.up.railway.app/forgot-password", {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, newPassword, confirmPassword}),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Password Anda berhasil di perbarui !");
        navigate("/login");
      }else {
        alert(data.message || "Terjadi kesalahan.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-purple-200 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Lupa Password
        </h2>
        <p className="text-gray-500 text-sm mb-4 text-center">
          Masukkan email yang terdaftar untuk reset password
        </p>

        <form onSubmit={handleSubmit}>
          <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:ring-purple-500 focus:border-purple-500"
            required
          />
          </div>
          <label
            htmlFor="nePasword"
            className="block text-gray-700 font-medium mb-2"
          >
            Password baru
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setnewPassword(e.target.value)}
            className="w-full p-2 border rounded focus:ring-purple-500 focus:border-purple-500"
            required
          />
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-medium mb-2"
          >
            Konfirmasi password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            className="w-full p-2 border rounded focus:ring-purple-500 focus:border-purple-500"
            required
          />
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Simpan
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
