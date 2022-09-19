import { useCallback, useMemo } from "react"
import { ModalProps } from "@chakra-ui/react"

import { ChamadoFormWrapper } from "@components/Forms/ChamadoForm/ChamadoFormWrapper"
import { formValuesToPayload } from "@components/Forms/ChamadoForm/helpers"
import { Modal } from "@components/Modal"
import { updateChamado } from "@services/Chamados"
import { request } from "@services/request"

interface ChamadoModalProps extends Partial<ModalProps> {
  chamado?: Chamado | undefined
  onSubmit: (result: Result<ApiResponse<Chamado>>) => void
  isOpen: boolean
  onClose: () => void
}

export const ChamadoModal = ({
  chamado,
  onSubmit,
  isOpen,
  onClose,
  ...props
}: ChamadoModalProps) => {
  const isEvent = useMemo(
    () => chamado?.problems?.some((item) => item?.is_event),
    [chamado?.problems]
  )

  const handleSubmit = useCallback(
    async (data: ChamadoFormValues) => {
      if (!chamado?.id) return

      const payload = formValuesToPayload(data)
      console.log("payload", payload)

      const response = await request<Chamado>(
        updateChamado(chamado?.id)(payload)
      )

      onSubmit?.(response)

      if (response.type === "error") {
        // Let hook form know that submit was not successful
        return Promise.reject(response.error?.message)
      } else {
        onClose?.()
      }
    },
    [chamado?.id, onClose, onSubmit]
  )

  return (
    <Modal
      title={`Editar ${isEvent ? "Evento" : "Chamado"}`}
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
      {...props}
    >
      <ChamadoFormWrapper defaultValues={chamado} onSubmit={handleSubmit} />
    </Modal>
  )
}
