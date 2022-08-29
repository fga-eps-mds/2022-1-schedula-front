import { useCallback } from "react"
import NextLink from "next/link"
import { toast } from "react-toastify"
import { Button } from "@chakra-ui/react"

import {
  ChamadoFormValues,
  ChamadoFormWrapper as ChamadoForm
} from "@components/Forms/ChamadoForm/ChamadoFormWrapper"
import { PageHeader } from "@components/PageHeader"
import { createChamado } from "@services/Chamados"
import { request } from "@services/request"

const RegistrarChamado = () => {
  const onSubmit = useCallback(async (data: ChamadoFormValues) => {
    const payload: ChamadoPayload = {
      ...data,
      workstation_id: Number(data.workstation_id.value),
      problems: data.problems.map((problem) => ({
        ...problem,
        category_id: Number(problem.category_id.value),
        problem_id: Number(problem.problem_id.value),
        request_status: problem.request_status.value,
        priority: problem.priority.value
      }))
    }
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
