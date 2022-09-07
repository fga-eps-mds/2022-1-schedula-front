import { SubmitHandler, useForm } from "react-hook-form"
import { Button, VStack } from "@chakra-ui/react"

import { Input } from "@components/FormFields/Input"

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
      <VStack align="stretch" spacing={8}>
        <Input
          label="Nome"
          {...register("name", {
            required: "Campo obrigatório"
          })}
          errors={errors?.name}
        />
        <Input
          label="Descrição"
          {...register("description")}
          errors={errors?.description}
        />
      </VStack>

      <Button type="submit" width="100%" isLoading={isSubmitting}>
        Registrar
      </Button>
    </form>
  )
}
