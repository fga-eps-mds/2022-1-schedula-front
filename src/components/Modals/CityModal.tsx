import { useCallback } from "react"
import { ModalProps } from "@chakra-ui/react"

import { CityForm } from "@components/Forms/CityForm"
import { Modal } from "@components/Modal"
import { createCity, updateCity } from "@services/Cidades"
import { request } from "@services/request"

interface CityModalProps extends Partial<ModalProps> {
  city?: City | undefined
  onSubmit: (result: Result<ApiResponse<City>>) => void
  isOpen: boolean
  onClose: () => void
}

export const CityModal = ({
  onClose,
  city,
  onSubmit,
  ...props
}: CityModalProps) => {
  const handleSubmit = useCallback(
    async (data: CityPayload) => {
      console.log("DATA: ", data)

      const response = await request<City>(
        city ? updateCity(city.id)(data) : createCity(data)
      )

      onSubmit?.(response)

      if (response.type === "error") {
        // Let hook form know that submit was not successful
        return Promise.reject(response.error?.message)
      } else {
        onClose?.()
      }
    },
    [city, onClose, onSubmit]
  )

  return (
    <Modal
      title={`${city ? "Editar" : "Nova"} Cidade`}
      onClose={onClose}
      {...props}
    >
      <CityForm defaultValues={city} onSubmit={handleSubmit} />
    </Modal>
  )
}
