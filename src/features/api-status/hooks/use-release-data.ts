import { useMemo } from 'react';
import { useGetLocationsServiceReleaseVersion } from '@/features/api-status/api/get-location-release-version';
import { useGetScheduleServiceReleaseVersion } from '@/features/api-status/api/get-schedule-release-version';
import { useGetUsersServiceReleaseVersion } from '@/features/api-status/api/get-users-release-version';

type Releases = {
  tag_name: string;
  name: string;
};

export const useReleaseData = () => {
  const { data: locationsVersion, isLoading: isLoadingLocationsVersion } =
    useGetLocationsServiceReleaseVersion();
  const { data: schedulesVersion, isLoading: isLoadingSchedulesVersion } =
    useGetScheduleServiceReleaseVersion();
  const { data: usersVersion, isLoading: isLoadingUsersVersion } =
    useGetUsersServiceReleaseVersion();

  const apiVersions = useMemo(
    () => ({
      usuarios: (usersVersion as unknown as Releases[])?.[0]?.tag_name,
      chamados: (schedulesVersion as unknown as Releases[])?.[0]?.tag_name,
      localidades: (locationsVersion as unknown as Releases[])?.[0]?.tag_name,
    }),
    [schedulesVersion, locationsVersion, usersVersion]
  );

  return {
    isLoadingUserVersion: isLoadingUsersVersion,
    isLoadingChamadosVersion: isLoadingSchedulesVersion,
    isLoadingLocalidadesVersion: isLoadingLocationsVersion,
    apiVersions,
  };
};
