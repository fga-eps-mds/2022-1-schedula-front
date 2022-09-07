import { useForm } from "react-hook-form"
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from "@chakra-ui/react"

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
      <FormControl isInvalid={Boolean(errors?.name)} mb={8}>
        <FormLabel>Nome</FormLabel>
        <Input
          {...register("name", { required: "Campo obrigatório" })}
          placeholder="Nome"
        />
        <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
      </FormControl>

      <Button type="submit" width="100%" isLoading={isSubmitting}>
        Registrar
      </Button>
    </form>
  )
}
