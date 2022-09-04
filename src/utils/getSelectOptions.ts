import get from "lodash/get"

export const getSelectOptions = <T extends Record<string, any>>(
  data: T[] | undefined,
  labelKey: string,
  valueKey: string
) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return undefined
  }

  return data.map((option) => ({
    label: get(option, labelKey),
    value: get(option, valueKey)
  })) as SelectOption[]
}
