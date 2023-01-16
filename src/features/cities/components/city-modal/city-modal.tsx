import { useCallback } from 'react';
import { ModalProps } from '@chakra-ui/react';
import { usePostCreateCity } from '@/features/cities/api/post-create-city';
import { usePutUpdateCity } from '@/features/cities/api/put-update-city';
import { PostCreateCityParams } from '@/features/cities/api/types';
import { Modal } from '@/components/modal';
import { CityForm } from '@/features/cities/components/city-form';

interface CityModalProps extends Partial<ModalProps> {
  city?: City | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export function CityModal({ onClose, city, ...props }: CityModalProps) {
  const { mutate: createCity, isLoading: isCreatingCity } = usePostCreateCity({
    onSuccessCallBack: onClose,
  });

  const { mutate: updateCity, isLoading: isUpdatingCity } = usePutUpdateCity({
    onSuccessCallBack: onClose,
  });

  const handleSubmit = useCallback(
    async ({ name, state }: CityPayload) => {
      const payload: PostCreateCityParams = {
        name,
        state,
      };

      if (city?.id) {
        updateCity({
          cityId: city.id,
          data: payload,
        });
      } else {
        createCity(payload);
      }
    },
    [createCity, updateCity, city?.id]
  );

  return (
    <Modal
      title={`${city ? 'Editar' : 'Nova'} Cidade`}
      onClose={onClose}
      {...props}
    >
      <CityForm
        defaultValues={city}
        onSubmit={handleSubmit}
        isSubmitting={isCreatingCity || isUpdatingCity}
      />
    </Modal>
  );
}
