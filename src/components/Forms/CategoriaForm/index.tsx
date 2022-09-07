import { SubmitHandler, useForm } from "react-hook-form"
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack
} from "@chakra-ui/react"

interface CategoriaFormProps {
  defaultValues?: Category | undefined
  onSubmit: SubmitHandler<CategoryPayload> | SubmitHandler<ProblemTypePayload>
}

export const CategoriaForm = ({
  defaultValues,
  onSubmit
}: CategoriaFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProblemTypePayload>({
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
            />
            {errors?.name && (
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            )}
          </Box>

          <Box>
            <FormLabel htmlFor="description">Descrição</FormLabel>
            <Input
              {...register("description", { required: "Campo obrigatório" })}
              placeholder="Descrição"
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
