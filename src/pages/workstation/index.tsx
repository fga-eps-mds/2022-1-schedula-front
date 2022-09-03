import { useCallback, useState } from "react"
import { toast } from "react-toastify"
import { Badge, Button, Flex, HStack, useDisclosure } from "@chakra-ui/react"
import { AxiosResponse } from "axios"

import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { EditButton } from "@components/ActionButtons/EditButton"
import { WorkstationForm } from "@components/Forms/WorkstationForm"
import { ListView } from "@components/List"
import { Item } from "@components/ListItem"
import { Modal } from "@components/Modal/Modal"
import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { useRequest } from "@hooks/useRequest"
import { getCities } from "@services/Cidades"
import { request } from "@services/request"
import {
  createWorkstation,
  deleteWorkstation,
  getWorkstations,
  updateWorkstation
} from "@services/Workstation"

const Workstation = () => {
  const {
    data: workstation,
    isLoading,
    isValidating,
    mutate
  } = useRequest<Workstation[]>(getWorkstations)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [workstationToEdit, setWorkstationToEdit] = useState<Workstation>()
  const { data: cidades } = useRequest<City[]>(getCities)

  const handleDelete = useCallback(
    async ({ id }: Workstation) => {
      const response = await request(deleteWorkstation(id))

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
          } as AxiosResponse<ApiResponse<Workstation[]>>,
          { revalidate: false }
        )

        return
      }

      toast.error("Erro ao deletar posto de trabalho!")
    },
    [workstation?.data, mutate]
  )

  const handleEdit = useCallback(
    (workstation: Workstation) => {
      setWorkstationToEdit(workstation)
      onOpen()
    },
    [onOpen]
  )

  const onSubmit = useCallback(
    async (data: CreateWorkstationPayload) => {
      if (!data.phones) {
        data.phones = []
      }

      console.log("DATA: ", data)

      const response = await request<{ data: Workstation }>(
        workstationToEdit
          ? updateWorkstation(workstationToEdit.id)(data)
          : createWorkstation(data)
      )

      if (response.type === "success") {
        toast.success(
          `Posto de Trabalho ${
            workstationToEdit ? "editado" : "criado"
          } com sucesso!`
        )

        const newWorkstation = workstationToEdit
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
              data: newWorkstation
            }
          } as AxiosResponse<ApiResponse<Workstation[]>>,
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

  const renderWorkstationItem = useCallback(
    (item: Workstation) => (
      <Item
        title={
          <Flex>
            {item?.name}
            <HStack spacing={2} ml={4}>
              {item?.regional && (
                <Badge colorScheme="purple" variant="solid">
                  Regional
                </Badge>
              )}
              <Badge
                colorScheme="linkedin"
                variant={item?.link ? "outline  " : "subtle"}
              >
                {item?.link
                  ? "Link: " + item.link + " // Faixa: " + item.ip
                  : "ADSL_VPN"}
              </Badge>
            </HStack>
          </Flex>
        }
        description={
          cidades?.data?.find((loc) => loc.id === item.city_id)?.name || ""
        }
      >
        <Item.Actions item={item}>
          <EditButton onClick={handleEdit} label={item.name} />
          <DeleteButton onClick={handleDelete} label={item.name} />
        </Item.Actions>
      </Item>
    ),
    [cidades?.data, handleDelete, handleEdit]
  )

  return (
    <>
      <PageHeader title="Gerenciar Postos de Trabalho">
        <HStack spacing={2}>
          <RefreshButton refresh={mutate} />
          <Button onClick={onOpen}>Novo Posto de Trabalho</Button>
        </HStack>
      </PageHeader>

      <ListView<Workstation>
        items={workstation?.data}
        render={renderWorkstationItem}
        isLoading={isLoading || isValidating}
      />

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
