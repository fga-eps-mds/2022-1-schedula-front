import { useMemo } from "react"
import get from "lodash/get"

export type SelectOption = {
  label: string
  value: string | number
}

interface useCreateSelectOptionsProps {
  isLoading: boolean
  options: ReturnType<typeof getSelectOptions>
  errorMessage?: string
}

export const getSelectOptions = <T extends Record<string, any>>(
  data: T[] | undefined,
  labelKey: string,
  valueKey: string
) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [
      {
        label: "Nenhuma opção encontrada",
        value: ""
      }
    ]
  }

  return data.map((option) => ({
    label: get(option, labelKey),
    value: get(option, valueKey)
  })) as SelectOption[]
}

export const useCreateSelectOptions = ({
  isLoading,
  options,
  errorMessage
}: useCreateSelectOptionsProps) => {
  const selectOptions = useMemo(() => {
    if (isLoading)
      return (
        <option value="" disabled>
          Carregando...
        </option>
      )

    if (errorMessage)
      return (
        <option value="" disabled>
          {errorMessage}
        </option>
      )

    return options.map(({ label, value }) => (
      <option value={value} key={value} disabled={!value}>
        {label}
      </option>
    ))
  }, [errorMessage, isLoading, options])

  return selectOptions
}
