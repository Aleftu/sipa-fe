// src/utils/helpers.ts
import { REPORT_STATUS_OPTIONS, INCIDENT_TYPE_OPTIONS } from './constants';

/**
 * Format date to locale string
 */
export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('id-ID', options || defaultOptions);
};

/**
 * Get status color based on report status
 */
export const getStatusColor = (status: string): string => {
  const statusOption = REPORT_STATUS_OPTIONS.find(option => option.value === status);
  return statusOption?.color || 'gray';
};

/**
 * Get status label based on report status
 */
export const getStatusLabel = (status: string): string => {
  const statusOption = REPORT_STATUS_OPTIONS.find(option => option.value === status);
  return statusOption?.label || status;
};

/**
 * Get incident type label
 */
export const getIncidentTypeLabel = (type: string): string => {
  const incidentOption = INCIDENT_TYPE_OPTIONS.find(option => option.value === type);
  return incidentOption?.label || type;
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Validate file type and size
 */
export const validateFile = (
  file: File, 
  allowedTypes: string[], 
  maxSizeMB: number
): { valid: boolean; error?: string } => {
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not supported. Allowed types: ${allowedTypes.join(', ')}`
    };
  }
  
  if (file.size > maxSizeMB * 1024 * 1024) {
    return {
      valid: false,
      error: `File size exceeds the limit of ${maxSizeMB}MB`
    };
  }
  
  return { valid: true };
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate a random report number for testing
 */
export const generateReportNumber = (): string => {
  const prefix = 'SIPA';
  const timestamp = new Date().getTime().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `${prefix}-${timestamp}-${random}`;
};

/**
 * Calculate time difference in human readable format
 */
export const timeAgo = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  
  const seconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  
  if (years > 0) return `${years} tahun yang lalu`;
  if (months > 0) return `${months} bulan yang lalu`;
  if (days > 0) return `${days} hari yang lalu`;
  if (hours > 0) return `${hours} jam yang lalu`;
  if (minutes > 0) return `${minutes} menit yang lalu`;
  
  return 'Baru saja';
};