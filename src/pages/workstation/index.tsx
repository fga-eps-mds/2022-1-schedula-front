import { useCallback, useState } from "react"
import { toast } from "react-toastify"
import {
  Badge,
  Button,
  Flex,
  HStack,
  Tooltip,
  useDisclosure
} from "@chakra-ui/react"
import { AxiosResponse } from "axios"

import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { EditButton } from "@components/ActionButtons/EditButton"
import { WorkstationPageForm } from "@components/Forms/WorkstationForm/WorkstationPageForm"
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
  } = useRequest<Workstation[]>(getWorkstations())

  const { data: regionais, isLoading: isLoadingRegionais } = useRequest<
    Workstation[]
  >(
    getWorkstations({
      params: {
        regional: true
      }
    })
  )

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [workstationToEdit, setWorkstationToEdit] = useState<Workstation>()
  const { data: cidades, isLoading: isLoadingCidades } =
    useRequest<City[]>(getCities)

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

      const payload = {
        ...data,
        phones: (data.phones as unknown as { number: string }[])?.map(
          (phone) => phone?.number
        )
      }

      const response = await request<Workstation>(
        workstationToEdit
          ? updateWorkstation(workstationToEdit.id)(payload)
          : createWorkstation(payload)
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
              {
                {
                  true: (
                    <Badge colorScheme="cyan" variant="subtle">
                      ADSL_VPN
                    </Badge>
                  ),
                  false: (
                    <>
                      <Tooltip
                        colorScheme="blackAlpha"
                        label="IP"
                        placement="top"
                        openDelay={350}
                      >
                        <Badge colorScheme="orange" variant="outline">
                          {item.ip}
                        </Badge>
                      </Tooltip>
                      <Badge colorScheme="orange" variant="subtle">
                        {item.link}
                      </Badge>
                    </>
                  )
                }[item?.adsl_vpn?.toString()]
              }
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
          {session?.user.access !== "basic" ? (
            <></>
          ) : (
            <Button onClick={onOpen}>Novo Posto de Trabalho</Button>
          )}
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
        <WorkstationPageForm
          defaultValues={workstationToEdit}
          onSubmit={onSubmit}
          cidades={cidades}
          isLoadingCidades={isLoadingCidades}
          isLoadingRegionais={isLoadingRegionais}
          regionais={regionais}
        />
      </Modal>
    </>
  )
}

export default Workstation
