import { useCallback } from "react"
import { ModalProps } from "@chakra-ui/react"

import { CategoriaForm } from "@components/Forms/CategoriaForm"
import { Modal } from "@components/Modal"
import { createCategory, updateCategory } from "@services/Categorias"
import { request } from "@services/request"

interface CategoryModalProps extends Partial<ModalProps> {
  category?: Category | undefined
  onSubmit: (result: Result<ApiResponse<Category>>) => void
  isOpen: boolean
  onClose: () => void
}

export const CategoryModal = ({
  onClose,
  category,
  onSubmit,
  ...props
}: CategoryModalProps) => {
  const handleSubmit = useCallback(
    async (data: CategoryPayload) => {
      console.log("DATA: ", data)

      const response = await request<Category>(
        category ? updateCategory(category.id)(data) : createCategory(data)
      )

      onSubmit?.(response)

      if (response.type === "error") {
        // Let hook form know that submit was not successful
        return Promise.reject(response.error?.message)
      } else {
        onClose?.()
      }
    },
    [category, onClose, onSubmit]
  )

  return (
    <Modal
      title={`${category ? "Editar" : "Nova"} Categoria`}
      onClose={onClose}
      {...props}
    >
      <CategoriaForm defaultValues={category} onSubmit={handleSubmit} />
    </Modal>
  )
}
