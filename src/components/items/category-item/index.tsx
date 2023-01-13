import { ReactElement, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddButton } from '@/components/action-buttons/add-button';
import { DeleteButton } from '@/components/action-buttons/delete-button';
import { EditButton } from '@/components/action-buttons/edit-button';
import { Item } from '@/components/list-item';

interface CategoryItemProps {
  category: Category;
  onEdit: (chamado: Category) => void;
  onDelete: (result: Result<ApiResponse<null>>, category: Category) => void;
}

export function CategoryItem({
  category,
  onEdit,
  onDelete,
}: CategoryItemProps) {
  const isEditAuthorized = true;
  const isDeleteAuthorized = true;

  const navigate = useNavigate();

  const handleAddProblem = useCallback(
    ({ id }: Category) => {
      navigate(`/categorias/${id}/problemas`);
    },
    [navigate]
  );

  // const handleDelete = useCallback(
  //   async ({ id }: Category) => {
  //     const response = await request<null>(deleteCategory(id));

  //     onDelete?.(response, category);
  //   },
  //   [category, onDelete]
  // );

  return (
    // <Item<Category> title={category?.name} description={category?.description}>
    //   <Item.Actions item={category}>
    //     <AddButton
    //       onClick={handleAddProblem}
    //       label="Tipos de Problema"
    //       aria-label="Add"
    //     />
    //     {
    //       (isEditAuthorized && (
    //         <EditButton onClick={onEdit} label={category?.name} />
    //       )) as ReactElement
    //     }
    //     {
    //       (isDeleteAuthorized && (
    //         <DeleteButton onClick={handleDelete} label={category?.name} />
    //       )) as ReactElement
    //     }
    //   </Item.Actions>
    // </Item>
    <p>Corrigir</p>
  );
}
