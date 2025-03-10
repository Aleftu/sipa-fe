// // src/utils/api.ts
// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// // Base API configuration
// const API_URL = process.env.REACT_APP_API_URL || 'https://api.sipa.example.com/v1';
// const API_TIMEOUT = 30000; // 30 seconds

// /**
//  * Creates and configures an Axios instance for API requests
//  */
// export const createApiClient = (): AxiosInstance => {
//   const client = axios.create({
//     baseURL: API_URL,
//     timeout: API_TIMEOUT,
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//   });

//   // Request interceptor - adds auth token
//   client.interceptors.request.use(
//     (config: AxiosRequestConfig) => {
//       const token = localStorage.getItem('auth_token');
      
//       if (token && config.headers) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
      
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   // Response interceptor - handles common errors
//   client.interceptors.response.use(
//     (response: AxiosResponse) => response,
//     (error) => {
//       // Handle specific error codes
//       if (error.response) {
//         const { status } = error.response;
        
//         // Auth errors
//         if (status === 401) {
//           localStorage.removeItem('auth_token');
//           // You could also trigger a logout action here
//         }
        
//         // Add logging or analytics for errors
//         console.error(`API Error (${status}):`, error.response.data);
//       } else if (error.request) {
//         // Network errors (no response received)
//         console.error('Network Error:', error.request);
//       } else {
//         // Other errors
//         console.error('API Request Error:', error.message);
//       }
      
//       return Promise.reject(error);
//     }
//   );

//   return client;
// };

// // Create a default API client instance
// const apiClient = createApiClient();

// export default apiClient;

// // Helper methods for common API operations
// export const apiGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
//   const response = await apiClient.get<T>(url, config);
//   return response.data;
// };

// export const apiPost = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
//   const response = await apiClient.post<T>(url, data, config);
//   return response.data;
// };

// export const apiPut = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
//   const response = await apiClient.put<T>(url, data, config);
//   return response.data;
// };

// export const apiDelete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
//   const response = await apiClient.delete<T>(url, config);
//   return response.data;
// };

// // Upload files with FormData
// export const apiUpload = async <T>(
//   url: string, 
//   files: File[], 
//   data?: Record<string, any>, 
//   fileFieldName: string = 'files'
// ): Promise<T> => {
//   const formData = new FormData();
  
//   // Append additional data if provided
//   if (data) {
//     Object.entries(data).forEach(([key, value]) => {
//       if (typeof value === 'object' && value !== null) {
//         formData.append(key, JSON.stringify(value));
//       } else {
//         formData.append(key, value as string);
//       }
//     });
//   }
  
//   // Append files
//   files.forEach((file, index) => {
//     formData.append(`${fileFieldName}[${index}]`, file);
//   });
  
//   const response = await apiClient.post<T>(url, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
  
//   return response.data;
// };