// import { useMutation, useQuery, UseMutationResult, UseQueryResult } from 'react-query';
// import { CreatePengaduanDto, PengaduanResponse } from '../Types/ReportTypes';
// import pengaduanService from '../services/pengaduanServices';
// import { useQueryClient } from 'react-query';

// // Keys for React Query cache
// export const QUERY_KEYS = {
//   ALL_PENGADUAN: 'pengaduan',
//   PENGADUAN_DETAIL: 'pengaduanDetail',
// };

// // Hook for creating a new pengaduan
// export const useCreatePengaduan = (): UseMutationResult<
//   PengaduanResponse, 
//   Error, 
//   CreatePengaduanDto
// > => {
//   const queryClient = useQueryClient();

//   return useMutation(
//     (data: CreatePengaduanDto) => pengaduanService.createPengaduan(data),
//     {
//       onSuccess: () => {
//         // Invalidate the query cache to refetch pengaduan list after creation
//         queryClient.invalidateQueries(QUERY_KEYS.ALL_PENGADUAN);
//       },
//     }
//   );
// };

// // Hook for getting a pengaduan by kode
// export const usePengaduanByKode = (
//   kode: string
// ): UseQueryResult<PengaduanResponse, Error> => {
//   return useQuery(
//     [QUERY_KEYS.PENGADUAN_DETAIL, kode],
//     () => pengaduanService.getPengaduanByKode(kode),
//     {
//       enabled: !!kode, // Only run query if kode is provided
//       retry: 1,
//     }
//   );
// };

// // Hook for getting all pengaduan
// export const useAllPengaduan = (): UseQueryResult<
//   PengaduanResponse[], 
//   Error
// > => {
//   return useQuery(
//     QUERY_KEYS.ALL_PENGADUAN,
//     () => pengaduanService.getAllPengaduan(),
//     {
//       retry: 1,
//     }
//   );
// };

// // Hook for updating pengaduan status
// export const useUpdatePengaduanStatus = (): UseMutationResult<
//   PengaduanResponse,
//   Error,
//   { id: number; status: string; keterangan: string }
// > => {
//   const queryClient = useQueryClient();

//   return useMutation(
//     ({ id, status, keterangan }) => 
//       pengaduanService.updateStatusPengaduan(id, status, keterangan),
//     {
//       onSuccess: (data) => {
//         // Update both lists and the detail view after status update
//         queryClient.invalidateQueries(QUERY_KEYS.ALL_PENGADUAN);
//         queryClient.invalidateQueries([
//           QUERY_KEYS.PENGADUAN_DETAIL, 
//           data.pengaduan.kode
//         ]);
//       },
//     }
//   );
// };