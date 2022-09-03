import { useCallback, useState } from "react"
import NextLink from "next/link"
import { toast } from "react-toastify"
import { Box, Button, HStack, Tag, Text, useDisclosure } from "@chakra-ui/react"

import { EditButton } from "@components/ActionButtons/EditButton"
import { ChamadoFormWrapper as ChamadoForm } from "@components/Forms/ChamadoForm/ChamadoFormWrapper"
import {
  chamadoToFormValues,
  formValuesToPayload
} from "@components/Forms/ChamadoForm/helpers"
import { ListView } from "@components/List"
import { Item } from "@components/ListItem"
import { Modal } from "@components/Modal/Modal"
import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { useRequest } from "@hooks/useRequest"
import { getChamados, updateChamado } from "@services/Chamados"
import { request } from "@services/request"
import { formatDate } from "@utils/formatDate"

const Chamados = () => {
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
      setChamadoToEdit(chamadoToFormValues(chamado))
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

export default Chamados
