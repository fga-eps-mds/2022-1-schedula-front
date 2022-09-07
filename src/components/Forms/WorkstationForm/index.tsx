import { SubmitHandler } from "react-hook-form"

import { useRequest } from "@hooks/useRequest"
import { getCities } from "@services/Cidades"
import { getWorkstations } from "@services/Workstation"

import { WorkstationPageForm } from "./WorkstationPageForm"

export interface WorkstationFormProps {
  defaultValues?: Workstation | undefined
  onSubmit: SubmitHandler<CreateWorkstationPayload>
}

export const WorkstationForm = ({
  defaultValues,
  onSubmit
}: WorkstationFormProps) => {
  const { data: cidades, isLoading: isLoadingCidades } =
    useRequest<City[]>(getCities)

  const { data: regionais, isLoading: isLoadingRegionais } = useRequest<
    Workstation[]
  >(
    getWorkstations({
      params: {
        regional: true
      }
    })
  )

  return (
    <>
      <WorkstationPageForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        cidades={cidades}
        isLoadingCidades={isLoadingCidades}
        isLoadingRegionais={isLoadingRegionais}
        regionais={regionais}
      />
    </>
  )
}
