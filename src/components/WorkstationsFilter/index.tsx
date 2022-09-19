import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { HStack } from "@chakra-ui/react"

import { ControlledSelect } from "@components/FormFields"
import { useRequest } from "@hooks/useRequest"
import { getWorkstations } from "@services/Workstation"
import { getSelectOptions } from "@utils/getSelectOptions"

export type Filters = {
  regional: SelectOption | null
  nome: string
}

export const workstationFields: (keyof Filters)[] = ["regional", "nome"]

interface WorkstationsFilterProps {
  onFilter: (filters: Filters) => void
}

export const WorkstationsFilter = ({ onFilter }: WorkstationsFilterProps) => {
  const { control, watch } = useForm<Filters>()

  const { data: regionais, isLoading: isLoadingRegionais } = useRequest<
    Workstation[]
  >(
    getWorkstations({
      params: {
        regional: true
      }
    })
  )

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  useEffect(() => {
    const fields = watch((value) => onFilter(value as Filters))

    return () => fields.unsubscribe()
  }, [onFilter, watch])

  return (
    <HStack spacing={4}>
      <ControlledSelect
        control={control}
        label="Regional"
        name="regional"
        id="regional"
        options={getSelectOptions(regionais?.data, "name", "id")}
        isClearable
        isLoading={isLoadingRegionais}
        placeholder="Filtrar por regional"
      />
    </HStack>
  )
}
