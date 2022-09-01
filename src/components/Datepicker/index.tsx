import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker"
import { useController, UseControllerProps } from "react-hook-form"
import { FaCalendar } from "react-icons/fa"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react"

import "react-datepicker/dist/react-datepicker.css"

type Props<FormValues> = Omit<ReactDatePickerProps, "onChange"> &
  UseControllerProps<FormValues> & {
    label: string
  }

export const Datepicker = <FormValues,>({
  control,
  name,
  id,
  label,
  rules,
  ...props
}: Props<FormValues>) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control,
    rules
  })

  return (
    <FormControl isInvalid={!!error} id={id} cursor="pointer" userSelect="none">
      <FormLabel cursor="pointer">{label}</FormLabel>

      <InputGroup display="block">
        <ReactDatePicker
          selected={value as Date}
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          value={value as string}
          locale="pt-BR"
          dateFormat="dd/MM/yyyy h:mm aa"
          showTimeInput
          timeInputLabel="Hora"
          customInput={<Input />}
          // customTimeInput={<Input />}
          {...props}
        />
        <InputRightElement color="gray.500" pointerEvents="none">
          {/* <Icon as={FaBackspace} fontSize="lg" color="red" /> */}
          <Icon as={FaCalendar} fontSize="lg" />
        </InputRightElement>
      </InputGroup>

      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  )
}
