import { useCallback } from "react"
import { useRouter } from "next/router"
import { Accordion, Button, HStack } from "@chakra-ui/react"

import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { useRequest } from "@hooks/useRequest"
import { detalhadorApi } from "@services/api"
import { getChamados } from "@services/DetalhadorChamado/Chamado"

const ListaChamados = () => {
  const { data: chamados, mutate } = useRequest<Chamado[]>(
    getChamados(),
    detalhadorApi,
    {}
  )

  const router = useRouter()

  const redirect = useCallback(() => {
    router.push("chamados/cadastrar")
  }, [router])

  return (
    <>
      <PageHeader title="Chamados">
        <HStack spacing={2}>
          <RefreshButton refresh={mutate} />
          <Button onClick={redirect}>Registrar Novo Chamado</Button>
        </HStack>
      </PageHeader>

      <Accordion>
        {chamados?.data.map((chamado) => (
          <>chamado de id {chamado.id}</>
        ))}
      </Accordion>
    </>
  )
}

export default ListaChamados
