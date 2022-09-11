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
  const router = useRouter()
  const { data: session } = useSession()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [chamadoToEdit, setChamadoToEdit] = useState<Chamado>()

  const showEvents = router.query?.is_event
  console.log("router query: ", router.query, showEvents)

  const {
    data: chamados,
    isLoading,
    isValidating,
    mutate
  } = useRequest<Chamado[]>(
    getChamados({
      params: {
        is_event: showEvents
      }
    })
  )

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


  const onSubmit = useCallback(
    async (data: ChamadoFormValues) => {
      if (!chamadoToEdit?.id) return
      if (session?.user.access == "basic") return

      const payload = formValuesToPayload(data)
      console.log("payload", payload)

      const response = await request<Chamado>(
        updateChamado(chamadoToEdit?.id)(payload)
      )

      if (response.type === "error") {
        toast.error(response.error.message)

        return Promise.reject(response.error.message)
      }

      toast.success(response.value.message)
      mutate()
      handleClose()
    },
    [chamadoToEdit?.id, handleClose, mutate]
  )

  const renderChamadoItem = useCallback(
    (item: Chamado) => (
      <Item
        title={
          <HStack spacing={6}>
            <Box>
              <Text fontSize="sm" fontWeight="light" color="GrayText">
                Solicitante
              </Text>
              <Text noOfLines={1}>{item?.applicant_name}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="light" color="GrayText">
                Atendente
              </Text>
              <Text noOfLines={1}>{item?.attendant_name}</Text>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="light" color="GrayText">
                Data / Hora
              </Text>
              <Box textAlign="center" fontWeight="medium">
                <Text>
                  {formatDate(item?.created_at, "date")}{" "}
                  {formatDate(item?.created_at, "time")}
                </Text>
              </Box>
            </Box>
          </HStack>
        }
        description={
          <Box>
            <HStack gap={4} mt={2} flexWrap="wrap">
              {item?.problems.map((problem) => (
                <HStack align="start" spacing={1} key={problem?.problem_id}>
                  <Tag variant="subtle" colorScheme="gray">
                    {problem?.category?.name}
                  </Tag>
                  <Tag variant="subtle" colorScheme="purple">
                    {problem?.problem?.name}
                  </Tag>
                </HStack>
              ))}
            </HStack>
          </Box>
        }
      >
        <Item.Actions item={item}>
          {session?.user.access === "basic" ? (
            <></>
          ) : (
            <EditButton onClick={handleEdit} label="Chamado" />
          )}
        </Item.Actions>
      </Item>

  const renderChamadoItem = useCallback(
    (chamado: Chamado) => (
      <ChamadoItem chamado={chamado} handleEdit={handleEdit} />

    ),
    [handleEdit, session?.user.access]
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
