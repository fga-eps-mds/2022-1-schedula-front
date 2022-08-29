import { useForm } from "react-hook-form"
import { Button } from "@chakra-ui/react"

import { ChamadoFormWrapper as ChamadoForm } from "@components/Forms/ChamadoForm/ChamadoFormWrapper"
import { PageHeader } from "@components/PageHeader"

const RegistrarChamado = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ChamadoPayload>()

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
  })

  return (
    <>
      <PageHeader title="Registrar Chamado">
        <Button variant="outline">Ver chamados</Button>
      </PageHeader>
      <ChamadoForm />
    </>
  )
}

export default RegistrarChamado
