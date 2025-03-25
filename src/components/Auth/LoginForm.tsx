// import { createContext, useState, useEffect, ReactNode } from "react";
// import { useNavigate } from "react-router-dom";

// // Interface untuk data pengguna
// interface User {
//   email: string;
//   role: "admin" | "user";
//   token: string;
// }

// // Interface untuk AuthContext
// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// // Buat Context
// export const AuthContext = createContext<AuthContextType | null>(null);

// // Provider untuk AuthContext
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Cek apakah ada user di localStorage
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // Fungsi login
//   const login = async (email: string, password: string) => {
//     try {
//       const response = await fetch("https://api-sipa-capstone-production.up.railway.app/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Login gagal!");

//       const userData = { email, role: data.role, token: data.token };
//       setUser(userData);
//       localStorage.setItem("user", JSON.stringify(userData));

//       // Redirect berdasarkan role
//       if (data.role === "admin") navigate("/dashboard");
//       else navigate("/user-dashboard");

//     } catch (error) {
//       alert(error instanceof Error ? error.message : "Terjadi kesalahan.");
//     }
//   };

//   // Fungsi logout
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
