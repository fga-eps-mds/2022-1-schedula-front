import { useCallback } from "react"
import NextLink from "next/link"
import { toast } from "react-toastify"
import { Button } from "@chakra-ui/react"

import { ChamadoFormWrapper as ChamadoForm } from "@components/Forms/ChamadoForm/ChamadoFormWrapper"
import { formValuesToPayload } from "@components/Forms/ChamadoForm/helpers"
import { PageHeader } from "@components/PageHeader"
import { createChamado } from "@services/Chamados"
import { request } from "@services/request"

const RegistrarChamado = () => {
  const onSubmit = useCallback(async (data: ChamadoFormValues) => {
    const payload = formValuesToPayload(data)
    console.log("payload", payload)

    const response = await request<Chamado>(createChamado(payload))

    if (response.type === "error") {
      toast.error(response.error.message)

      return Promise.reject(response.error.message)
    }

    toast.success(response.value.message)
  }, [])

  return (
    <>
      <PageHeader title="Novo Chamado">
        <NextLink href="/chamados" passHref>
          <Button variant="tertiary">Ver Chamados</Button>
        </NextLink>
      </PageHeader>

      <ChamadoForm onSubmit={onSubmit} />
    </>
  )
}

export default RegistrarChamado
