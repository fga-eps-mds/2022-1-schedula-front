import { useCallback } from 'react';
import { ModalProps } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import { CategoriaForm } from '@/components/forms/categoria-form';

interface ProblemModalProps extends Partial<ModalProps> {
  problemType?: TipoProblema | undefined;
  categoryId: number;
  onSubmit: (result: Result<ApiResponse<TipoProblema>>) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ProblemTypeModal({
  onClose,
  problemType,
  categoryId,
  onSubmit,
  ...props
}: ProblemModalProps) {
  const handleSubmit = useCallback(async (data: ProblemTypePayload) => {
    console.log('DATA: ', data);

    // const response = await request<TipoProblema>(
    //   problemType
    //     ? updateProblemType(problemType.id)(data)
    //     : createProblemType({ ...data, category_id: categoryId })
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
      title={`${problemType ? 'Editar' : 'Novo'} Tipo de Problema`}
      onClose={onClose}
      {...props}
    >
      <CategoriaForm defaultValues={problemType} onSubmit={handleSubmit} />
    </Modal>
  );
}
