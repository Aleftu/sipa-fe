// // src/hooks/useAuth.ts
// import { useState, useEffect, useCallback } from 'react';
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import { useNavigate } from 'react-router-dom';
// import { apiPost, apiGet } from '../utils/api';
// import { 
//   User, 
//   LoginRequest, 
//   RegisterRequest, 
//   AuthResponse, 
//   AuthError,
//   PasswordResetRequest 
// } from '../types/auth.types';

// /**
//  * Authentication hook for handling user login, registration, logout and auth state
//  */
// export const useAuth = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const [error, setError] = useState<AuthError | null>(null);
  
//   // Check if user is already authenticated on mount
//   useEffect(() => {
//     const token = localStorage.getItem('auth_token');
//     if (token) {
//       // Fetch current user data if token exists
//       fetchCurrentUser();
//     }
//   }, []);
  
//   // Fetch the current authenticated user
//   const { data: currentUser, isLoading: isLoadingUser, refetch: fetchCurrentUser } = useQuery<User, AuthError>(
//     'currentUser',
//     () => apiGet<User>('/auth/me'),
//     {
//       enabled: !!localStorage.getItem('auth_token'),
//       retry: false,
//       onError: (error) => {
//         // If fetching user fails, likely the token is invalid
//         localStorage.removeItem('auth_token');
//         setError(error);
//       }
//     }
//   );
  
//   // Login mutation
//   const loginMutation = useMutation<AuthResponse, AuthError, LoginRequest>(
//     (credentials) => apiPost<AuthResponse>('/auth/login', credentials),
//     {
//       onSuccess: (data) => {
//         localStorage.setItem('auth_token', data.token);
//         queryClient.setQueryData('currentUser', data.user);
//         setError(null);
//         navigate('/dashboard');
//       },
//       onError: (error) => {
//         setError(error);
//       }
//     }
//   );
  
//   // Register mutation
//   const registerMutation = useMutation<AuthResponse, AuthError, RegisterRequest>(
//     (userData) => apiPost<AuthResponse>('/auth/register', userData),
//     {
//       onSuccess: (data) => {
//         localStorage.setItem('auth_token', data.token);
//         queryClient.setQueryData('currentUser', data.user);
//         setError(null);
//         navigate('/dashboard');
//       },
//       onError: (error) => {
//         setError(error);
//       }
//     }
//   );
  
//   // Logout mutation
//   const logoutMutation = useMutation<void, AuthError>(
//     () => apiPost<void>('/auth/logout'),
//     {
//       onSuccess: () => {
//         localStorage.removeItem('auth_token');
//         queryClient.setQueryData('currentUser', null);
//         navigate('/login');
//       },
//       onError: (error) => {
//         // Even if there's an error, we should still clear the local auth state
//         localStorage.removeItem('auth_token');
//         queryClient.setQueryData('currentUser', null);
//         navigate('/login');
//       }
//     }
//   );
  
//   // Password reset request mutation
//   const passwordResetMutation = useMutation<{ message: string }, AuthError, PasswordResetRequest>(
//     (data) => apiPost<{ message: string }>('/auth/password/email', data),
//     {
//       onSuccess: () => {
//         setError(null);
//       },
//       onError: (error) => {
//         setError(error);
//       }
//     }
//   );
  
//   // Check if user is authenticated
//   const isAuthenticated = !!currentUser && !!localStorage.getItem('auth_token');
  
//   // Login function
//   const login = useCallback((credentials: LoginRequest) => {
//     loginMutation.mutate(credentials);
//   }, [loginMutation]);
  
//   // Register function
//   const register = useCallback((userData: RegisterRequest) => {
//     registerMutation.mutate(userData);
//   }, [registerMutation]);
  
//   // Logout function
//   const logout = useCallback(() => {
//     logoutMutation.mutate();
//   }, [logoutMutation]);
  
//   // Request password reset
//   const requestPasswordReset = useCallback((email: string) => {
//     passwordResetMutation.mutate({ email });
//   }, [passwordResetMutation]);
  
//   // Clear any auth errors
//   const clearError = useCallback(() => {
//     setError(null);
//   }, []);
  
//   return {
//     user: currentUser,
//     isAuthenticated,
//     isLoading: isLoadingUser || loginMutation.isLoading || registerMutation.isLoading,
//     error,
//     login,
//     register,
//     logout,
//     requestPasswordReset,
//     clearError
//   };
// };

// export default useAuth;