import { useForm } from "react-hook-form"
import { Button } from "@chakra-ui/react"

import { Input } from "@components/FormFields"

interface CityFormProps {
  defaultValues?: City | undefined
  onSubmit: (data: CityPayload) => void
}

export const CityForm = ({ defaultValues, onSubmit }: CityFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CityPayload>({
    defaultValues
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nome"
        {...register("name", { required: "Campo obrigatório" })}
        errors={errors?.name}
        placeholder="Nome"
      />

      <Button
        type="submit"
        size="lg"
        width="100%"
        mt={8}
        isLoading={isSubmitting}
      >
        Registrar
      </Button>
    </form>
  )
}
