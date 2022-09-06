import { useCallback, useMemo } from "react"

import { ChamadoFormWrapper } from "@components/Forms/ChamadoForm/ChamadoFormWrapper"
import {
  chamadoToFormValues,
  formValuesToPayload
} from "@components/Forms/ChamadoForm/helpers"
import { Modal } from "@components/Modal/Modal"
import { updateChamado } from "@services/Chamados"
import { request } from "@services/request"

interface ChamadoModalProps {
  chamado?: Chamado | undefined
  onEdit: (result: Result<ApiResponse<Chamado>>) => void
  isOpen: boolean
  onClose: () => void
}

export const ChamadoModal = ({
  chamado,
  onEdit,
  isOpen,
  onClose
}: ChamadoModalProps) => {
  const isEvent = useMemo(
    () => chamado?.problems?.some((item) => item?.is_event),
    [chamado?.problems]
  )

  const onSubmit = useCallback(
    async (data: ChamadoFormValues) => {
      if (!chamado?.id) return

      const payload = formValuesToPayload(data)
      console.log("payload", payload)

      const response = await request<Chamado>(
        updateChamado(chamado?.id)(payload)
      )

      onEdit?.(response)
      onClose()

      if (response.type === "error") {
        // Let hook form know that submit was not successful
        return Promise.reject(response.error.message)
      }
    },
    [chamado?.id, onClose, onEdit]
  )

  return (
    <Modal
      title={`Editar ${isEvent ? "Evento" : "Chamado"}`}
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
    >
      <ChamadoFormWrapper
        defaultValues={chamado && chamadoToFormValues(chamado)}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}
