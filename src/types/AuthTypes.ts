// src/types/auth.types.ts

/**
 * User model representing an authenticated user
 */
export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    created_at: string;
    updated_at: string;
  }
  
  /**
   * User roles for permission control
   */
  export enum UserRole {
    ADMIN = 'admin',
    STAFF = 'staff',
    USER = 'user',
  }
  
  /**
   * Login request payload
   */
  export interface LoginRequest {
    username: string;
    password: string;
  }
  
  /**
   * Registration request payload
   */
  export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
  
  /**
   * Authentication response after successful login or registration
   */
  export interface AuthResponse {
    user: User;
    token: string;
    token_type: string;
    expires_at?: string;
  }
  
  /**
   * Password reset request payload
   */
  export interface PasswordResetRequest {
    email: string;
  }
  
  /**
   * Password update request payload
   */
  export interface PasswordUpdateRequest {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
  
  /**
   * Authentication error structure
   */
  export interface AuthError {
    message: string;
    errors?: Record<string, string[]>;
    status?: number;
  }
  
  /**
   * Auth state for context/redux store
   */
  export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: AuthError | null;
  }