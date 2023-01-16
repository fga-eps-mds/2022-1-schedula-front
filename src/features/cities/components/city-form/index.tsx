import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@chakra-ui/react';
import { Input } from '@/components/form-fields';
import { City } from '@/features/cities/api/types';

interface CityFormProps {
  defaultValues?: City | undefined;
  onSubmit: (data: CityPayload) => void;
  isSubmitting: boolean;
}

export function CityForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: CityFormProps) {
  const isEditing = useMemo(() => Boolean(defaultValues), [defaultValues]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CityPayload>({
    defaultValues: {
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nome"
        {...register('name', { required: 'Campo obrigatório' })}
        errors={errors?.name}
        placeholder="Nome"
      />

      <Input
        label="Estado"
        {...register('state', { required: 'Campo obrigatórtio' })}
        errors={errors?.name}
        placeholder="Estado"
      />

      <Button
        type="submit"
        size="lg"
        width="100%"
        mt={8}
        isLoading={isSubmitting}
      >
        {isEditing ? 'Salvar' : 'Criar cidade'}
      </Button>
    </form>
  );
}
