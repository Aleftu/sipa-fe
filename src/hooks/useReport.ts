// // src/hooks/useReport.ts
// import { useCallback } from 'react';
// import { useMutation, useQuery, useQueryClient } from 'react-query';
// import { useNavigate } from 'react-router-dom';
// import { apiGet, apiPost, apiUpload } from '../utils/api';
// import { 
//   ReportRequest, 
//   Report, 
//   ReportSubmissionResponse,
//   ReportTrackingResponse,
//   ReportSummary
// } from '../types/report.types';

// /**
//  * Hook for report-related operations
//  */
// export const useReport = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
  
//   // Submit a new report
//   const submitReportMutation = useMutation<ReportSubmissionResponse, Error, {data: ReportRequest, files?: File[]}>(
//     ({ data, files }) => {
//       if (files && files.length > 0) {
//         return apiUpload<ReportSubmissionResponse>('/reports', files, data, 'attachments');
//       }
//       return apiPost<ReportSubmissionResponse>('/reports', data);
//     },
//     {
//       onSuccess: (data) => {
//         // Invalidate reports cache
//         queryClient.invalidateQueries('reports');
        
//         // Navigate to success page with report number
//         navigate(`/report-success/${data.report_number}`);
//       }
//     }
//   );
  
//   // Get report by ID
//   const getReport = (id: string | number) => {
//     return useQuery<Report, Error>(
//       ['report', id], 
//       () => apiGet<Report>(`/reports/${id}`),
//       {
//         enabled: !!id,
//         staleTime: 5 * 60 * 1000, // 5 minutes
//       }
//     );
//   };
  
//   // Track report status by report number
//   const trackReport = (reportNumber: string) => {
//     return useQuery<ReportTrackingResponse, Error>(
//       ['report-tracking', reportNumber],
//       () => apiGet<ReportTrackingResponse>(`/reports/track/${reportNumber}`),
//       {
//         enabled: !!reportNumber,
//         staleTime: 60 * 1000, // 1 minute
//       }
//     );
//   };
  
//   // Get list of reports (for admin/staff)
//   const getReports = (page = 1, limit = 10, filters?: Record<string, any>) => {
//     return useQuery<{data: ReportSummary[], total: number, page: number, total_pages: number}, Error>(
//       ['reports', page, limit, JSON.stringify(filters)],
//       () => {
//         const queryParams = new URLSearchParams({
//           page: page.toString(),
//           limit: limit.toString(),
//           ...(filters || {})
//         });
        
//         return apiGet<{data: ReportSummary[], total: number, page: number, total_pages: number}>(
//           `/reports?${queryParams.toString()}`
//         );
//       },
//       {
//         keepPreviousData: true,
//       }
//     );
//   };
  
//   // Submit a report
//   const submitReport = useCallback((data: ReportRequest, files?: File[]) => {
//     submitReportMutation.mutate({ data, files });
//   }, [submitReportMutation]);
  
//   return {
//     submitReport,
//     getReport,
//     trackReport,
//     getReports,
//     isSubmitting: submitReportMutation.isLoading,
//     submitError: submitReportMutation.error,
//     isSubmitSuccess: submitReportMutation.isSuccess
//   };
// };

// export default useReport;