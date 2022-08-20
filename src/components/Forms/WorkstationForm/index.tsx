import { useForm } from "react-hook-form"
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack
} from "@chakra-ui/react"


interface WorkstationFormProps {
  defaultValues?: Workstation | undefined;
  onSubmit: (data: CreateWorkstationPayload) => void;
}

export const WorkstationForm = ({
  defaultValues,
  onSubmit
}: WorkstationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm< CreateWorkstationPayload>({
    defaultValues
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Object.keys(errors).length > 0} mb={8}>
        <Stack spacing={8}>
          <Box>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input
              {...register("name", { required: "Campo obrigatório" })}
              placeholder="Nome do posto"
              variant="flushed"
            />
            {errors?.name && (
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            )}
          </Box>

          <Box>
            <FormLabel htmlFor="ip">Endereço de IP</FormLabel>
            <Input
              {...register("ip", { required: "Campo obrigatório" })}
              placeholder="IP"
              variant="flushed"
            />
            {errors?.description && (
              <FormErrorMessage>
                {errors?.description?.message}
              </FormErrorMessage>
            )}
          </Box>
        </Stack>
      </FormControl>

      <Button type="submit" width="100%" isLoading={isSubmitting}>
        Registrar
      </Button>
    </form>
  )
}
