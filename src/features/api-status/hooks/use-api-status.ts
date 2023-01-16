import { useGetUsersApiStatus } from '@/features/api-status/api/get-users-api-status';
import { useGetScheduleApiStatus } from '@/features/api-status/api/get-schedule-api-status';
import { useGetLocationsApiStatus } from '@/features/api-status/api/get-location-api-status';

export function useAPIStatus() {
  const {
    isError: userServiceUnavailable,
    isLoading: isLoadingUsuariosStatus,
  } = useGetUsersApiStatus();
  const {
    isError: orderServiceUnavailable,
    isLoading: isLoadingChamadosStatus,
  } = useGetScheduleApiStatus();
  const {
    isError: locationServiceUnavailable,
    isLoading: isLoadingLocalidadesStatus,
  } = useGetLocationsApiStatus();

  return {
    usuariosStatus: userServiceUnavailable,
    isLoadingUsuariosStatus,
    chamadosStatus: orderServiceUnavailable,
    isLoadingChamadosStatus,
    localidadesStatus: locationServiceUnavailable,
    isLoadingLocalidadesStatus,
  };
}
