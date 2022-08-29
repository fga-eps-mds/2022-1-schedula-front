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
import {
  ChamadoFormValues,
  ChamadoFormWrapper as ChamadoForm
} from "@components/Forms/ChamadoForm/ChamadoFormWrapper"
import { ListView } from "@components/List"
import { Item } from "@components/ListItem"
import { Modal } from "@components/Modal/Modal"
import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { ChamadoPriority, ChamadoStatus } from "@constants/Chamados"
import { useRequest } from "@hooks/useRequest"
import { getChamados, updateChamado } from "@services/Chamados"
import { request } from "@services/request"
import { formatDate } from "@utils/formatDate"

const ListaCategoria = () => {
  const {
    data: chamados,
    isLoading,
    isValidating,
    mutate
  } = useRequest<Chamado[]>(getChamados)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [chamadoToEdit, setChamadoToEdit] = useState<
    ChamadoFormValues & { id: number }
  >()

  const handleEdit = useCallback(
    (chamado: Chamado) => {
      setChamadoToEdit({
        ...chamado,
        workstation_id: {
          value: chamado.workstation_id,
          label: ""
        },
        problems: chamado.problems.map((problem) => ({
          ...problem,
          category_id: {
            value: problem.category_id,
            label: ""
          },
          problem_id: {
            value: problem.problem_id,
            label: ""
          },
          request_status: {
            value: problem.request_status,
            label: ChamadoStatus[problem.request_status]
          },
          priority: {
            value: problem.priority,
            label: ChamadoPriority[problem.priority]
          }
        }))
      })
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

      delete data?.attendant_name

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
          <Box textAlign="center" fontWeight="medium">
            <Text>{formatDate(item.created_at, "date")}</Text>
            <Text>{formatDate(item.created_at, "time")}</Text>
          </Box>
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
