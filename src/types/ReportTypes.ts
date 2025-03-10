// src/types/report.types.ts

/**
 * Type of incidents/violence that can be reported
 */
export enum IncidentType {
    PHYSICAL = 'physical',
    VERBAL = 'verbal',
    PSYCHOLOGICAL = 'psychological',
    SEXUAL = 'sexual',
    NEGLECT = 'neglect',
    ECONOMIC = 'economic',
    OTHER = 'other',
  }
  
  /**
   * Status of a submitted report
   */
  export enum ReportStatus {
    SUBMITTED = 'submitted',
    UNDER_REVIEW = 'under_review',
    INVESTIGATING = 'investigating',
    RESOLVED = 'resolved',
    CLOSED = 'closed',
    REJECTED = 'rejected',
  }
  
  /**
   * Victim information in a report
   */
  export interface VictimInfo {
    name?: string;
    age?: number;
    gender?: 'male' | 'female' | 'other';
    relationship?: string;
  }
  
  /**
   * Report submission request payload
   */
  export interface ReportRequest {
    incident_type: IncidentType | string;
    incident_date: string;
    incident_location: string;
    description: string;
    is_anonymous: boolean;
    victim_info?: VictimInfo;
    reporter_contact?: string; // Optional contact info if not anonymous
    reporter_name?: string; // Optional name if not anonymous
  }
  
  /**
   * File attachment for report
   */
  export interface ReportAttachment {
    id: number;
    file_name: string;
    file_size: number;
    file_type: string;
    file_url: string;
    created_at: string;
  }
  
  /**
   * Complete report model with all details
   */
  export interface Report {
    id: number;
    report_number: string;
    incident_type: IncidentType;
    incident_date: string;
    incident_location: string;
    description: string;
    is_anonymous: boolean;
    status: ReportStatus;
    victim_info?: VictimInfo;
    reporter_contact?: string;
    reporter_name?: string;
    attachments?: ReportAttachment[];
    case_notes?: string[];
    created_at: string;
    updated_at: string;
  }
  
  /**
   * Report summary for listing view
   */
  export interface ReportSummary {
    id: number;
    report_number: string;
    incident_type: IncidentType;
    incident_date: string;
    status: ReportStatus;
    created_at: string;
  }
  
  /**
   * Response after successfully submitting a report
   */
  export interface ReportSubmissionResponse {
    success: boolean;
    report_id: number;
    report_number: string;
    message: string;
  }
  
  /**
   * Report tracking response when checking status
   */
  export interface ReportTrackingResponse {
    report_number: string;
    status: ReportStatus;
    status_updated_at: string;
    estimated_completion?: string;
    next_steps?: string;
  }