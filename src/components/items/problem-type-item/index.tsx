import { ReactElement, useCallback } from 'react';

interface ProblemTypeItemProps {
  problemType: TipoProblema;
  onEdit: (problemType: TipoProblema) => void;
  onDelete: (
    result: Result<ApiResponse<null>>,
    problemType: TipoProblema
  ) => void;
}

export function ProblemTypeItem({
  problemType,
  onEdit,
  onDelete,
}: ProblemTypeItemProps) {
  const isEditAuthorized = true;
  const isDeleteAuthorized = true;
  // const handleDelete = useCallback(
  //   async ({ id }: TipoProblema) => {
  //     const response = await request<null>(deleteProblemType(id));

  //     onDelete?.(response, problemType);
  //   },
  //   [problemType, onDelete]
  // );

  return (
    // <Item<TipoProblema>
    //   title={problemType?.name}
    //   description={problemType?.description}
    // >
    //   <Item.Actions item={problemType}>
    //     {
    //       (isEditAuthorized && (
    //         <EditButton onClick={onEdit} label={problemType.name} />
    //       )) as ReactElement
    //     }
    //     {
    //       (isDeleteAuthorized && (
    //         <DeleteButton onClick={handleDelete} label={problemType.name} />
    //       )) as ReactElement
    //     }
    //   </Item.Actions>
    // </Item>
    <p>CORRIGIR</p>
  );
}
