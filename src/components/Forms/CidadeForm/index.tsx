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

interface CidadeFormProps {
  defaultValues?: City | undefined
  onSubmit: (data: CityPayload) => void
}

export const CidadeForm = ({ defaultValues, onSubmit }: CidadeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CityPayload>({
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
              placeholder="Nome"
              variant="flushed"
            />
            {errors?.name && (
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
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
