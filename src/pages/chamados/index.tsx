import { useCallback, useState } from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import { Button, HStack, useDisclosure } from "@chakra-ui/react"

import { ChamadoItem } from "@components/Items/ChamadoItem"
import { ListView } from "@components/List"
import { ChamadoModal } from "@components/Modals/ChamadoModal"
import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { useRequest } from "@hooks/useRequest"
import { getChamados } from "@services/Chamados"

const Chamados = () => {
  const { data: session, status } = useSession()
  console.log("session", session, status)
  const router = useRouter()

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

  const onSubmit = useCallback(
    (result: Result<ApiResponse<Chamado>>) => {
      if (result.type === "error") {
        toast.error(result.error.message)

        return
      }

      toast.success(result.value.message)
      mutate()
      setChamadoToEdit(undefined)
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

  const handleClose = useCallback(() => {
    setChamadoToEdit(undefined)
    onClose()
  }, [onClose])

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
        onClose={handleClose}
        chamado={chamadoToEdit}
        onSubmit={onSubmit}
      />
    </>
  )
}

export default Chamados
