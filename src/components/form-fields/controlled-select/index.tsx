import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { Props, Select } from 'chakra-react-select';

import { handleEmptyOptions } from '@/components/form-fields/controlled-select/handle-empty-options';
import {
  chakraStyles,
  customComponents,
} from '@/components/form-fields/controlled-select/styles';

type ControlledSelectProps<FormValues extends FieldValues> =
  UseControllerProps<FormValues> &
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Props<any> & {
      label: string;
    };

export function ControlledSelect<FormValues extends FieldValues>({
  control,
  name,
  id,
  label,
  rules,
  ...props
}: ControlledSelectProps<FormValues>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
    rules,
  });

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
  );
}
