import { useCallback, useState } from "react"
import NextLink from "next/link"
import { toast } from "react-toastify"
import {
  Box,
  Button,
  HStack,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react"

import { EditButton } from "@components/ActionButtons/EditButton"
import { ChamadoFormWrapper as ChamadoForm } from "@components/Forms/ChamadoForm/ChamadoFormWrapper"
import { ListView } from "@components/List"
import { Item } from "@components/ListItem"
import { Modal } from "@components/Modal/Modal"
import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { useRequest } from "@hooks/useRequest"
import { getChamados, updateChamado } from "@services/Chamados"
import { request } from "@services/request"

const ListaCategoria = () => {
  const {
    data: chamados,
    isLoading,
    isValidating,
    mutate
  } = useRequest<Chamado[]>(getChamados)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [chamadoToEdit, setChamadoToEdit] = useState<Chamado>()

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
    async (data: ChamadoPayload) => {
      if (!chamadoToEdit?.id) return

      delete data?.attendant_name

      const response = await request<Chamado>(
        updateChamado(chamadoToEdit?.id)(data)
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
          </HStack>
        }
        description={
          <VStack align="stretch">
            <Text noOfLines={1}>{item?.description || "Sem descrição"}</Text>
            {/* <HStack>
              {item?.problems.map((problem) => (
                <Badge key={problem.problem_id} colorScheme="red">
                  {problem.problem_id}
                </Badge>
              ))}
            </HStack> */}
          </VStack>
        }
      >
        <Item.Actions item={item}>
          <EditButton onClick={handleEdit} label="Chamado" />
        </Item.Actions>
      </Item>
    ),
    [handleEdit]
  )

  return (
    <>
      <PageHeader title="Chamados">
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

      <Modal
        blockScrollOnMount={false}
        title="Editar Chamado"
        isOpen={isOpen}
        onClose={handleClose}
        size="6xl"
      >
        <ChamadoForm defaultValues={chamadoToEdit} onSubmit={onSubmit} />
      </Modal>
    </>
  )
}

export default ListaCategoria
