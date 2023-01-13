import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { api } from '@/config/lib/axios';

type Releases = {
  tag_name: string;
  name: string;
};

export const useReleaseData = () => {
  async function getData(endpoint: string) {
    const response = await api.get(endpoint);
    return response.data;
  }

  // VERSIONS

  const { data: usersVersion, isLoading: isLoadingUsersVersion } =
    useQuery<Releases>(
      'users-service-version',
      () =>
        getData(
          'https://api.github.com/repos/fga-eps-mds/2022-2-schedula-gestor-de-usuarios/releases'
        ),
      {
        enabled: !!import.meta.env.PROD,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
      }
    );

  const { data: ordersVersion, isLoading: isLoadingOrdersVersion } =
    useQuery<Releases>(
      'orders-service-version',
      () =>
        getData(
          'https://api.github.com/repos/fga-eps-mds/2022-2-schedula-detalhador-de-chamados/releases'
        ),
      {
        enabled: !!import.meta.env.PROD,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
      }
    );

  const { data: locationsVersion, isLoading: isLoadingLocationsVersion } =
    useQuery<Releases>(
      'locations-service-version',
      () =>
        getData(
          'https://api.github.com/repos/fga-eps-mds/2022-2-schedula-gerenciador-de-localidades/releases'
        ),
      {
        enabled: !!import.meta.env.PROD,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
      }
    );

  const apiVersions = useMemo(
    () => ({
      usuarios: (usersVersion as unknown as Releases[])?.[0]?.tag_name,
      chamados: (ordersVersion as unknown as Releases[])?.[0]?.tag_name,
      localidades: (locationsVersion as unknown as Releases[])?.[0]?.tag_name,
    }),
    [ordersVersion, locationsVersion, usersVersion]
  );

  return {
    isLoadingUserVersion: isLoadingUsersVersion,
    isLoadingChamadosVersion: isLoadingOrdersVersion,
    isLoadingLocalidadesVersion: isLoadingLocationsVersion,
    apiVersions,
  };
};
