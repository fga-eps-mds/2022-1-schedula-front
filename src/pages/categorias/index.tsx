import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Button, Flex, Spinner, useDisclosure } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';

import { CategoriaForm } from '@components/Forms/CategoriaForm';
import { ListItem } from '@components/ListItem';
import { Modal } from '@components/Modal/Modal';
import { PageHeader } from '@components/PageHeader';
import { ApiData, useRequest } from '@hooks/useRequest';
import {
  createProblemCategory,
  deleteProblemCategory,
  detalhadorApi,
  getProblemCategories,
  updateProblemCategory,
} from '@services/DetalhadorChamados';
import { request } from '@services/request';

const ListaCategoria = () => {
  const router = useRouter();

  const {
    data: categorias,
    isLoading,
    mutate,
  } = useRequest<IProblemCategory[]>(getProblemCategories(), detalhadorApi, {});

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [categoriaToEdit, setCategoria] = useState<IProblemCategory>();

  const handleDelete = useCallback(
    (id: number) => async () => {
      const response = await request(deleteProblemCategory(id), detalhadorApi);

      if (response.type === 'success') {
        toast.success('Categoria deletada com sucesso!');

        const newCategorias = categorias?.data.filter(
          (categoria) => categoria.id !== id
        );

        mutate({
          data: {
            error: null,
            message: '',
            data: newCategorias || ([] as IProblemCategory[]),
          },
        } as AxiosResponse<ApiData<IProblemCategory[]>>);

        return;
      }

      toast.error('Erro ao deletar categoria!');
    },
    [categorias, mutate]
  );

  const handleEdit = useCallback(
    (categoria: IProblemCategory) => () => {
      setCategoria(categoria);
      onOpen();
    },
    [onOpen]
  );

  const handleAddProblem = useCallback(
    (id: string) => () => {
      router.push(`/categorias/${id}/problemas`);
    },
    [router]
  );

  const onSubmit = useCallback(
    async (data: IProblemCategoryPayload) => {
      console.log('DATA: ', data);

      const response = await request<{ data: IProblemCategory }>(
        categoriaToEdit
          ? updateProblemCategory(categoriaToEdit.id)(data)
          : createProblemCategory(data),
        detalhadorApi
      );

      if (response.type === 'success') {
        toast.success('Categoria criada com sucesso!');

        const newCategorias = categorias?.data.filter(
          (categoria) => categoria.id !== categoriaToEdit?.id
        );

        mutate({
          data: {
            error: null,
            message: '',
            data: [...(newCategorias || []), response.value.data],
          },
        } as AxiosResponse<ApiData<IProblemCategory[]>>);

        setCategoria(undefined);
        onClose();

        return;
      }

      toast.error('Erro ao criar categoria!');
    },
    [categoriaToEdit, categorias?.data, mutate, onClose]
  );

  const handleClose = useCallback(() => {
    setCategoria(undefined);
    onClose();
  }, [onClose]);

  return (
    <>
      <PageHeader title='Categorias de Problemas'>
        <Button onClick={onOpen}>Nova Categoria</Button>
      </PageHeader>

      {isLoading ? (
        <Spinner />
      ) : (
        <Flex flexDirection='column' gap={8}>
          {categorias?.data?.map?.((item, key) => (
            <ListItem
              title={item?.name}
              description={item?.description}
              key={key}
            >
              <ListItem.Actions
                itemName={item?.name}
                onEdit={handleEdit(item)}
                onDelete={handleDelete(item.id)}
                onAdd={handleAddProblem(item?.name)}
              />
            </ListItem>
          ))}
        </Flex>
      )}

      <Modal
        title='Nova Categoria de Problema'
        isOpen={isOpen}
        onClose={handleClose}
      >
        <CategoriaForm defaultValues={categoriaToEdit} onSubmit={onSubmit} />
      </Modal>
    </>
  );
};

export default ListaCategoria;
