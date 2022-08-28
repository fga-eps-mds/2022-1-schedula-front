import { useCallback, useState } from "react"
import { toast } from "react-toastify"
import { Button, HStack, useDisclosure } from "@chakra-ui/react"
import { AxiosResponse } from "axios"

import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { EditButton } from "@components/ActionButtons/EditButton"
import { WorkstationForm } from "@components/Forms/WorkstationForm"
import { Item } from "@components/ListItem"
import { Modal } from "@components/Modal/Modal"
import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { useRequest } from "@hooks/useRequest"
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
  // const { data: cidade } = useRequest<ICity[]>(getCities(), localidadesApi)
  const { data: cidades } = useRequest<ICity[]>(getCities(), localidadesApi)

  function GetCidades(id: number) {
    // const city?: ICity =
    // cidade?.data.find((loc) => loc.id === id)
    //   // cidade?.data?.find((loc) => loc.id === id) === undefined
    //   //   ? []
    //   //   : cidade?.data?.find((loc) => loc.id === id)
    cidades?.data?.find((loc) => loc.id === id)

    return cidades?.data?.find((loc) => loc.id === id)?.name
  }

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
          `Posto de Trabalho ${workstationToEdit ? "editado" : "criado"
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
      <Item title={`${item?.name} [${item?.ip}]`} description="">
        <Item.Actions item={item}>
          <EditButton onClick={handleEdit} label={item.name} />
          <DeleteButton onClick={handleDelete} label={item.name} />
        </Item.Actions>
      </Item>
    ),
    [handleDelete, handleEdit]
  )

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
              title={
                <>
                  <Flex>
                    {item?.name}
                    <HStack spacing={2} ml={4}>
                      {item?.regional ? (
                        <Badge colorScheme="yellow" variant="solid">
                          Regional
                        </Badge>
                      ) : (
                        <></>
                      )}
                      <Badge colorScheme="linkedin" variant="solid">
                        {
                          /* {cidades?.data.filter(
                          (cidade) => cidade.id === item.city_id
                        ) != undefined
                          ? GetCidades(item.city_id)
                          : "tchau"} */
                          cidades?.data?.find((loc) => loc.id === item.city_id)
                            ?.name
                        }
                      </Badge>
                    </HStack>
                  </Flex>
                </>
              }
              description={`[${item?.link
                  ? "Link: " + item.link + " // Faixa: " + item.ip
                  : "ADSL_VPN"
                }]`}
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
