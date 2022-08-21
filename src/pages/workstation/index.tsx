// eslint-disable-next-line eslint-comments/disable-enable-pair -- fixing lint
/* eslint-disable prettier/prettier  -- fail in word limit*/
import { useCallback, useState } from "react"
import { toast } from "react-toastify"
import { Box, Button, Flex, HStack, useDisclosure } from "@chakra-ui/react"
import { AxiosResponse } from "axios"

import { WorkstationForm } from "@components/Forms/WorkstationForm"
import { ListItem } from "@components/ListItem"
import { ListItemSkeleton } from "@components/ListItem/LIstItemSkeleton"
import { Modal } from "@components/Modal/Modal"
import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { ApiData, useRequest } from "@hooks/useRequest"
import { workstationApi } from "@services/api"
import { request } from "@services/request"
import {
  createWorkstation,
  deleteWorkstation,
  getWorkstation,
  updateWorkstation
} from "@services/Workstation"

const Workstation = () => {
  const {
    data: workstation,
    isLoading,
    isValidating,
    mutate
  } = useRequest<Workstation[]>(getWorkstation(), workstationApi)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [workstationToEdit, setWorkstationToEdit] = useState<Workstation>()

  const handleDelete = useCallback(
    (id: number) => async () => {
      const response = await request(deleteWorkstation(id), workstationApi)

      if (response.type === "success") {
        toast.success("Posto de trabalho removido com sucesso!")

        const newWorkstation = workstation?.data.filter(
          (workstation) => workstation.id !== id
        )

        mutate(
          {
            data: {
              error: null,
              message: "",
              data: newWorkstation || ([] as Workstation[])
            }
          } as AxiosResponse<ApiData<Workstation[]>>,
          { revalidate: false }
        )

        return
      }

      toast.error("Erro ao deletar posto de trabalho!")
    },
    [workstation?.data, mutate]
  )

  const handleEdit = useCallback(
    (workstation: Workstation) => () => {
      setWorkstationToEdit(workstation)
      onOpen()
    },
    [onOpen]
  )

  const onSubmit = useCallback(
    async (data: CreateWorkstationPayload) => {
      console.log("DATA: ", data)

      const response = await request<{ data: Workstation }>(
        workstationToEdit
          ? updateWorkstation(workstationToEdit.id)(data)
          : createWorkstation(data),
        workstationApi
      )

      if (response.type === "success") {
        toast.success(
          `Posto de Trabalho ${
            workstationToEdit ? "editado" : "criado"
          } com sucesso!`
        )

        const newUsers = workstationToEdit
          ? workstation?.data.map((workstation) =>
              workstation.name === workstationToEdit?.name
                ? response.value.data
                : workstation
            )
          : [...(workstation?.data || []), response.value.data]

        mutate(
          {
            data: {
              error: null,
              message: "",
              data: newUsers
            }
          } as AxiosResponse<ApiData<Workstation[]>>,
          { revalidate: false }
        )

        setWorkstationToEdit(undefined)
        onClose()

        return
      }

      toast.error(response.error?.message)
    },
    [workstationToEdit, workstation?.data, mutate, onClose]
  )

  const handleClose = useCallback(() => {
    setWorkstationToEdit(undefined)
    onClose()
  }, [onClose])

  return (
    <>
      <PageHeader title="Gerenciar Postos de Trabalho">
        <HStack spacing={2}>
          <RefreshButton refresh={mutate} />
          <Button onClick={onOpen}>Novo Posto de Trabalho</Button>
        </HStack>
      </PageHeader>

      {isLoading ? (
        <ListItemSkeleton />
      ) : (
        <Flex flexDirection="column" gap={6}>
          {workstation?.data?.map?.((item, key) => (
            <ListItem
              title={`${item?.name} [${item?.ip}]`}
              description={<HStack spacing={2} mt={2.5}></HStack>}
              key={key}
            >
              <ListItem.Actions
                itemName={item?.name}
                onEdit={handleEdit(item)}
                onDelete={handleDelete(item.id)}
              />
            </ListItem>
          ))}
        </Flex>
      )}

      {workstation && isValidating && (
        <Box mt={6}>
          <ListItemSkeleton />
        </Box>
      )}

      <Modal
        title={
          workstationToEdit
            ? "Editar Posto de Trabalho"
            : "Novo Posto de Trabalho"
        }
        isOpen={isOpen}
        onClose={handleClose}
        size="2xl"
      >
        <WorkstationForm
          defaultValues={workstationToEdit}
          onSubmit={onSubmit}
        />
      </Modal>
    </>
  )
}

export default Workstation
