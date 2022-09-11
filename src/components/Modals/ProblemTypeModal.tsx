import { useCallback } from "react"
import { ModalProps } from "@chakra-ui/react"

import { CategoriaForm as ProblemTypeForm } from "@components/Forms/CategoriaForm"
import { Modal } from "@components/Modal"
import { createProblemType, updateProblemType } from "@services/Problemas"
import { request } from "@services/request"

interface ProblemModalProps extends Partial<ModalProps> {
  problemType?: TipoProblema | undefined
  categoryId: number
  onSubmit: (result: Result<ApiResponse<TipoProblema>>) => void
  isOpen: boolean
  onClose: () => void
}

export const ProblemTypeModal = ({
  onClose,
  problemType,
  categoryId,
  onSubmit,
  ...props
}: ProblemModalProps) => {
  const handleSubmit = useCallback(
    async (data: ProblemTypePayload) => {
      console.log("DATA: ", data)

      const response = await request<TipoProblema>(
        problemType
          ? updateProblemType(problemType.id)(data)
          : createProblemType({ ...data, category_id: categoryId })
      )

      onSubmit?.(response)

      if (response.type === "error") {
        // Let hook form know that submit was not successful
        return Promise.reject(response.error?.message)
      } else {
        onClose?.()
      }
    },
    [problemType, categoryId, onSubmit, onClose]
  )

  return (
    <Modal
      title={`${problemType ? "Editar" : "Novo"} Tipo de Problema`}
      onClose={onClose}
      {...props}
    >
      <ProblemTypeForm defaultValues={problemType} onSubmit={handleSubmit} />
    </Modal>
  )
}
