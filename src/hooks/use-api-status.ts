import { createStandaloneToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { api } from '@/config/lib/axios';

const { toast } = createStandaloneToast();

export function useAPIStatus() {
  async function getData(endpoint: string) {
    const response = await api.get(endpoint);
    return response.data;
  }

  function onError(service: string) {
    return toast({
      title: 'Indisponível!',
      description: `O Serviço de ${service} está fora do ar`,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }

  // STATUS

  const {
    isError: userServiceUnavailable,
    isLoading: isLoadingUsuariosStatus,
  } = useQuery(
    'users-service-status',
    () => getData(import.meta.env.VITE_PUBLIC_GESTOR_DE_USUARIOS_URL),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  const {
    isError: orderServiceUnavailable,
    isLoading: isLoadingChamadosStatus,
  } = useQuery(
    'orders-service-status',
    () => getData(import.meta.env.VITE_PUBLIC_DETALHADOR_CHAMADOS_URL),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  const {
    isError: locationServiceUnavailable,
    isLoading: isLoadingLocalidadesStatus,
  } = useQuery(
    'locations-service-status',
    () => getData(import.meta.env.VITE_PUBLIC_GERENCIADOR_DE_LOCALIDADES_URL),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  useEffect(() => {
    if (userServiceUnavailable) {
      onError('Usuários');
    }
  }, [userServiceUnavailable]);

  useEffect(() => {
    if (orderServiceUnavailable) {
      onError('Chamados');
    }
  }, [orderServiceUnavailable]);

  useEffect(() => {
    if (locationServiceUnavailable) {
      onError('Localidades');
    }
  }, [locationServiceUnavailable]);

  return {
    usuariosStatus: userServiceUnavailable,
    isLoadingUsuariosStatus,
    chamadosStatus: orderServiceUnavailable,
    isLoadingChamadosStatus,
    localidadesStatus: locationServiceUnavailable,
    isLoadingLocalidadesStatus,
  };
}
