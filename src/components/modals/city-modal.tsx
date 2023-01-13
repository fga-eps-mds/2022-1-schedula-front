import { useCallback } from 'react';
import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import { CityForm } from '@/components/forms/city-form';

interface CityModalProps extends Partial<ModalProps> {
  city?: City | undefined;
  onSubmit: (result: Result<ApiResponse<City>>) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function CityModal({
  onClose,
  city,
  onSubmit,
  ...props
}: CityModalProps) {
  const handleSubmit = useCallback(async (data: CityPayload) => {
    console.log('DATA: ', data);

    // const response = await request<City>(
    //   city ? updateCity(city.id)(data) : createCity(data)
    // );

    // onSubmit?.(response);

    // if (response.type === 'error') {
    //   // Let hook form know that submit was not successful
    //   return Promise.reject(response.error?.message);
    // }
    // onClose?.();
  }, []);

  return (
    <Modal
      title={`${city ? 'Editar' : 'Nova'} Cidade`}
      onClose={onClose}
      {...props}
    >
      <CityForm defaultValues={city} onSubmit={handleSubmit} />
    </Modal>
  );
}
