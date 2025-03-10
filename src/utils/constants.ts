// src/utils/constants.ts

/**
 * Authentication-related constants
 */
export const AUTH_CONSTANTS = {
    TOKEN_KEY: 'auth_token',
    USER_KEY: 'auth_user',
    EXPIRES_KEY: 'auth_expires',
    REFRESH_KEY: 'auth_refresh_token',
  }
  
  /**
   * API endpoints for authentication
   */
  export const AUTH_ENDPOINTS = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    PASSWORD_RESET: '/auth/password/email',
    PASSWORD_UPDATE: '/auth/password/reset',
  }
  
  /**
   * API endpoints for reports
   */
  export const REPORT_ENDPOINTS = {
    CREATE: '/reports',
    LIST: '/reports',
    DETAIL: (id: number | string) => `/reports/${id}`,
    TRACK: (reportNumber: string) => `/reports/track/${reportNumber}`,
    STATUS_UPDATE: (id: number | string) => `/reports/${id}/status`,
  }
  
  /**
   * Incident type options for report form
   */
  export const INCIDENT_TYPE_OPTIONS = [
    { value: 'physical', label: 'Kekerasan Fisik' },
    { value: 'verbal', label: 'Kekerasan Verbal' },
    { value: 'psychological', label: 'Kekerasan Psikologis' },
    { value: 'sexual', label: 'Kekerasan Seksual' },
    { value: 'neglect', label: 'Penelantaran' },
    { value: 'economic', label: 'Kekerasan Ekonomi' },
    { value: 'other', label: 'Lainnya' },
  ]
  
  /**
   * Report status options
   */
  export const REPORT_STATUS_OPTIONS = [
    { value: 'submitted', label: 'Terkirim', color: 'blue' },
    { value: 'under_review', label: 'Sedang Ditinjau', color: 'yellow' },
    { value: 'investigating', label: 'Dalam Investigasi', color: 'orange' },
    { value: 'resolved', label: 'Terselesaikan', color: 'green' },
    { value: 'closed', label: 'Ditutup', color: 'gray' },
    { value: 'rejected', label: 'Ditolak', color: 'red' },
  ]
  
  /**
   * Feature constants for the application
   */
  export const FEATURES = {
    ENABLE_ANONYMOUS_REPORTING: true,
    ENABLE_FILE_ATTACHMENTS: true,
    MAX_FILE_SIZE_MB: 10,
    MAX_FILES_PER_REPORT: 5,
    ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf', 'video/mp4'],
  }
  
  /**
   * Application routes 
   */
  export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    DASHBOARD: '/dashboard',
    REPORT_NEW: '/report/new',
    REPORT_SUCCESS: '/report/success/:reportNumber',
    REPORT_TRACK: '/report/track',
    REPORT_DETAIL: '/report/:id',
    PROFILE: '/profile',
    ARTICLES: '/articles',
    ARTICLE_DETAIL: '/articles/:id',
  }