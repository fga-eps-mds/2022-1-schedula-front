import React from "react"
import { useController, UseControllerProps } from "react-hook-form"
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react"
import { Props, Select } from "chakra-react-select"

import { handleEmptyOptions } from "@components/ControlledSelect/handleEmptyOptions"
import {
  chakraStyles,
  customComponents
} from "@components/ControlledSelect/styles"

type ControlledSelectProps<FormValues> = UseControllerProps<FormValues> &
  Props<any> & {
    label: string
  }

export const ControlledSelect = <FormValues,>({
  control,
  name,
  id,
  label,
  rules,
  ...props
}: ControlledSelectProps<FormValues>) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error }
  } = useController<FormValues>({
    name,
    control,
    rules
  })

  return (
    <FormControl isInvalid={!!error} id={id} cursor="pointer" userSelect="none">
      <FormLabel cursor="pointer">{label}</FormLabel>

      <Select
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        chakraStyles={chakraStyles}
        openMenuOnFocus
        noOptionsMessage={handleEmptyOptions}
        hideSelectedOptions={false}
        tabSelectsValue={false}
        components={customComponents}
        {...props}
      />

      <FormErrorMessage>{error && error?.message}</FormErrorMessage>
    </FormControl>
  )
}
