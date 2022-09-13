import { ReactElement, useCallback } from "react"
import { useRouter } from "next/router"

import { AddButton } from "@components/ActionButtons/AddButton"
import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { EditButton } from "@components/ActionButtons/EditButton"
import { Item } from "@components/ListItem"
import { useAuthorization } from "@hooks/useAuthorization"
import { deleteCategory } from "@services/Categorias"
import { request } from "@services/request"

interface CategoryItemProps {
  category: Category
  onEdit: (chamado: Category) => void
  onDelete: (result: Result<ApiResponse<null>>, category: Category) => void
}

export const CategoryItem = ({
  category,
  onEdit,
  onDelete
}: CategoryItemProps) => {
  const { isAuthorized: isEditAuthorized } = useAuthorization(["manager"])
  const { isAuthorized: isDeleteAuthorized } = useAuthorization()

  const router = useRouter()

  const handleAddProblem = useCallback(
    ({ id }: Category) => {
      router.push(`/categorias/${id}/problemas`)
    },
    [router]
  )

  const handleDelete = useCallback(
    async ({ id }: Category) => {
      const response = await request<null>(deleteCategory(id))

      onDelete?.(response, category)
    },
    [category, onDelete]
  )

  return (
    <Item<Category> title={category?.name} description={category?.description}>
      <Item.Actions item={category}>
        <AddButton
          onClick={handleAddProblem}
          label="Tipos de Problema"
          aria-label="Add"
        />
        {
          (isEditAuthorized && (
            <EditButton onClick={onEdit} label={category?.name} />
          )) as ReactElement
        }
        {
          (isDeleteAuthorized && (
            <DeleteButton onClick={handleDelete} label={category?.name} />
          )) as ReactElement
        }
      </Item.Actions>
    </Item>
  )
}
