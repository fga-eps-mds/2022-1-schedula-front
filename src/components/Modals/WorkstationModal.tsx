import {
  WorkstationForm,
  WorkstationFormProps
} from "@components/Forms/WorkstationForm"
import { Modal } from "@components/Modal/Modal"

interface WorkstationModalProps extends WorkstationFormProps {
  isOpen: boolean
  onClose: () => void
}

export const WorkstationModal = ({
  isOpen,
  onClose,
  defaultValues,
  onSubmit
}: WorkstationModalProps) => {
  return (
    <Modal
      title={
        defaultValues ? "Editar Posto de Trabalho" : "Novo Posto de Trabalho"
      }
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
    >
      <WorkstationForm defaultValues={defaultValues} onSubmit={onSubmit} />
    </Modal>
  )
}
