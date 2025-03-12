// // src/components/auth/LoginForm.tsx
// import React, { useState } from 'react';
// import { useMutation } from 'react-query';
// import { login } from '../../../utils/Api';
// import { useNavigate } from 'react-router-dom';

// interface LoginFormData {
//   username: string;
//   password: string;
// }

// const LoginForm: React.FC = () => {
//   const [formData, setFormData] = useState<LoginFormData>({
//     username: '',
//     password: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
  
//   const loginMutation = useMutation(login, {
//     onSuccess: (data) => {
//       // Save token to localStorage or context
//       localStorage.setItem('token', data.token);
//       navigate('/dashboard');
//     },
//     onError: (error) => {
//       console.error('Login failed', error);
//       // Handle error state here
//     }
//   });
  
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };
  
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     loginMutation.mutate(formData);
//   };
  
//   return (
//     <form className="space-y-6" onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//           Enter your username or email address
//         </label>
//         <input
//           id="username"
//           name="username"
//           type="text"
//           required
//           className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
//           placeholder="Username or email address"
//           value={formData.username}
//           onChange={handleChange}
//         />
//       </div>
      
//       <div>
//         <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//           Enter your Password
//         </label>
//         <div className="relative">
//           <input
//             id="password"
//             name="password"
//             type={showPassword ? "text" : "password"}
//             required
//             className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <button 
//             type="button"
//             className="absolute inset-y-0 right-0 pr-3 flex items-center"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? 
//                 "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" : 
//                 "M15 12a3 3 0 11-6 0 3 3 0 016 0z"} />
//               {!showPassword && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />}
//             </svg>
//           </button>
//         </div>
//       </div>
      
//       <div className="flex items-center justify-end">
//         <div className="text-sm">
//           <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
//             Forgot Password
//           </a>
//         </div>
//       </div>
      
//       <div>
//         <button
//           type="submit"
//           className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//           disabled={loginMutation.isLoading}
//         >
//           {loginMutation.isLoading ? 'Loading...' : 'Login'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default LoginForm;