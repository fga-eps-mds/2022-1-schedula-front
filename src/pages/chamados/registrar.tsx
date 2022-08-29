import NextLink from "next/link"
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
        <NextLink href="/chamados" passHref>
          <Button variant="outline">Ver Chamados</Button>
        </NextLink>
      </PageHeader>
      <ChamadoForm />
    </>
  )
}

export default RegistrarChamado
