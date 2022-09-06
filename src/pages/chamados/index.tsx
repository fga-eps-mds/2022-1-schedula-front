import { useCallback, useState } from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { Button, HStack, useDisclosure } from "@chakra-ui/react"

import { ChamadoItem } from "@components/ChamadoItem"
import { ListView } from "@components/List"
import { ChamadoModal } from "@components/Modals/ChamadoModal"
import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { useRequest } from "@hooks/useRequest"
import { getChamados } from "@services/Chamados"
import { RedirectUnauthenticated } from "@utils/redirectUnautheticated"

const Chamados = () => {
  const router = useRouter()

  RedirectUnauthenticated(router)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [chamadoToEdit, setChamadoToEdit] = useState<Chamado>()

  const showEvents = router.query?.is_event
  console.log("router", router.query, showEvents)

  const {
    data: chamados,
    isLoading,
    isValidating,
    mutate
  } = useRequest<Chamado[]>(getChamados)

  const onEdit = useCallback(
    (result: Result<ApiResponse<Chamado>>) => {
      if (result.type === "error") {
        toast.error(result.error.message)

        return
      }

      toast.success(result.value.message)
      mutate()
    },
    [mutate]
  )

  const handleEdit = useCallback(
    (chamado: Chamado) => {
      setChamadoToEdit(chamado)
      onOpen()
    },
    [onOpen]
  )

  const renderChamadoItem = useCallback(
    (chamado: Chamado) => (
      <ChamadoItem chamado={chamado} handleEdit={handleEdit} />
    ),
    [handleEdit]
  )

  return (
    <>
      <PageHeader title={showEvents ? "Eventos" : "Chamados"}>
        <HStack spacing={2}>
          <RefreshButton refresh={mutate} />
          <NextLink href="/chamados/registrar" passHref>
            <Button variant="primary">Novo Chamado</Button>
          </NextLink>
        </HStack>
      </PageHeader>

      <ListView<Chamado>
        items={chamados?.data}
        render={renderChamadoItem}
        isLoading={isLoading || isValidating}
      />

      <ChamadoModal
        isOpen={isOpen}
        onClose={onClose}
        chamado={chamadoToEdit}
        onEdit={onEdit}
      />
    </>
  )
}

export default Chamados
