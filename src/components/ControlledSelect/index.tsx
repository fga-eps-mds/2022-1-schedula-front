import React from "react"
import { useController, UseControllerProps } from "react-hook-form"
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react"
import { ChakraStylesConfig, Props, Select } from "chakra-react-select"

import { handleEmptyOptions } from "@components/ControlledSelect/handleEmptyOptions"

type ControlledSelectProps<FormValues> = UseControllerProps<FormValues> &
  Props & {
    label: string
  }

const chakraStyles: ChakraStylesConfig = {
  loadingIndicator: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? "gray.300" : "primary"
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "white" : "gray.800",
    paddingInlineStart: 3,
    paddingInlineEnd: 3,
    background: state.isFocused ? "blackAlpha.600" : "blackAlpha.50"
  }),
  downChevron: (provided, state) => ({
    ...provided,
    transform: state?.isFocused ? "rotate(-180deg)" : "rotate(0deg)",
    fontSize: "1.4rem",
    transition: "transform 0.2s ease"
  }),
  menu: (provided) => ({
    ...provided,
    border: 0,
    boxShadow: "xl",
    backdropFilter: "blur(8px)"
  }),
  menuList: (provided) => ({
    ...provided,
    background: "blackAlpha.600",
    border: 0
  }),
  option: (provided, state) => ({
    ...provided,
    color: "white",
    fontWeight: "medium",
    background: state.isSelected ? "primary" : "transparent",

    _hover: {
      background: "blackAlpha.500"
    }
  })
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
        selectedOptionColor="orange"
        openMenuOnFocus
        noOptionsMessage={handleEmptyOptions}
        {...props}
      />

      <FormErrorMessage>{error && error?.message}</FormErrorMessage>
    </FormControl>
  )
}
