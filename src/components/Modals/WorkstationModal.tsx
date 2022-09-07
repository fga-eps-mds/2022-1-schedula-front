import { useCallback } from "react"
import { ModalProps } from "@chakra-ui/react"

import { WorkstationForm } from "@components/Forms/WorkstationForm"
import { Modal } from "@components/Modal"
import { request } from "@services/request"
import { createWorkstation, updateWorkstation } from "@services/Workstation"

interface WorkstationModalProps extends Partial<ModalProps> {
  workstation?: Workstation | undefined
  onSubmit: (result: Result<ApiResponse<Workstation>>) => void
  isOpen: boolean
  onClose: () => void
}

export const WorkstationModal = ({
  workstation,
  onSubmit,
  onClose,
  ...props
}: WorkstationModalProps) => {
  const handleSubmit = useCallback(
    async (data: CreateWorkstationPayload) => {
      const payload = {
        ...data,
        phones: (data.phones as unknown as { number: string }[])?.map(
          (phone) => phone?.number
        )
      }

      const response = await request<Workstation>(
        workstation
          ? updateWorkstation(workstation.id)(payload)
          : createWorkstation(payload)
      )

      onSubmit?.(response)
      onClose?.()

      if (response.type === "error") {
        // Let hook form know that submit was not successful
        return Promise.reject(response.error?.message)
      }
    },
    [onClose, onSubmit, workstation]
  )

  return (
    <Modal
      title={`${workstation ? "Editar" : "Novo"} Posto de Trabalho`}
      size="2xl"
      onClose={onClose}
      {...props}
    >
      <WorkstationForm defaultValues={workstation} onSubmit={handleSubmit} />
    </Modal>
  )
}
