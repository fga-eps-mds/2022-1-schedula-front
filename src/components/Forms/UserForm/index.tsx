import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { Button, Grid, GridItem } from "@chakra-ui/react"

import { ControlledSelect, Input } from "@components/FormFields"
import { USER_ACCESS } from "@constants/User"

interface UserFormProps {
  defaultValues?: User | undefined
  onSubmit: (data: UserFormValues) => void
}

export type UserFormValues = Omit<RegisterUserPayload, "acess"> & {
  acess: SelectOption<Access>
}

export const UserForm = ({ defaultValues, onSubmit }: UserFormProps) => {
  const isEditing = useMemo(() => Boolean(defaultValues), [defaultValues])

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<UserFormValues>({
    defaultValues: {
      ...defaultValues,
      acess: defaultValues?.acess && {
        label: USER_ACCESS[defaultValues.acess],
        value: defaultValues.acess
      },
      password: ""
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid templateColumns="1fr 1fr" gap={6}>
        <Input
          label="Nome Completo"
          {...register("name", { required: "Campo obrigatório" })}
          errors={errors?.name}
          placeholder="Nome completo"
        />
        <Input
          label="Nome de Usuário"
          {...register("username", { required: "Campo obrigatório" })}
          errors={errors?.username}
          placeholder="Username"
        />

        <GridItem colSpan={2}>
          <Input
            label="Email"
            {...register("email")}
            errors={errors?.email}
            placeholder="exemplo@email.com"
          />
        </GridItem>

        <Input
          label="Senha"
          type="password"
          {...register("password", {
            required: isEditing ? false : "Campo obrigatório"
          })}
          errors={errors?.password}
          placeholder="Senha"
        />
        <Input
          label="Confirmar senha"
          type="password"
          {...register("confirmPassword", {
            required: isEditing ? false : "Campo obrigatório",
            validate: (value) =>
              value === watch("password") || "Senhas não conferem"
          })}
          errors={errors?.confirmPassword}
          placeholder="Confirmar Senha"
        />

        <ControlledSelect
          label="Acesso"
          control={control}
          name="acess" // NOTE: fix 'acess' typo in backend
          id="acess" // NOTE: fix 'acess' typo in backend
          options={Object.entries(USER_ACCESS).map(([value, label]) => ({
            value,
            label
          }))}
          placeholder="Acesso"
          rules={{ required: "Campo obrigatório" }}
        />
        <Input
          label="Cargo"
          {...register("job_role", { required: "Campo obrigatório" })}
          errors={errors?.job_role}
          placeholder="Cargo"
        />

        <GridItem colSpan={2}>
          <Button type="submit" size="lg" width="100%" isLoading={isSubmitting}>
            Registrar
          </Button>
        </GridItem>
      </Grid>
    </form>
  )
}
