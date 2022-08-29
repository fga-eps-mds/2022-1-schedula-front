import { useCallback } from "react"
import NextLink from "next/link"
import { toast } from "react-toastify"
import { Button } from "@chakra-ui/react"

import { ChamadoFormWrapper as ChamadoForm } from "@components/Forms/ChamadoForm/ChamadoFormWrapper"
import { PageHeader } from "@components/PageHeader"
import { createChamado } from "@services/Chamados"
import { request } from "@services/request"

const RegistrarChamado = () => {
  const onSubmit = useCallback(async (data: ChamadoPayload) => {
    console.log(data)

    const response = await request<Chamado>(createChamado(data))

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
          <Button variant="outline">Ver Chamados</Button>
        </NextLink>
      </PageHeader>

      <ChamadoForm onSubmit={onSubmit} />
    </>
  )
}

export default RegistrarChamado
