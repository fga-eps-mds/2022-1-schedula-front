import { useCallback, useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import { Button, HStack, useDisclosure } from "@chakra-ui/react"
import { AxiosResponse } from "axios"

import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { EditButton } from "@components/ActionButtons/EditButton"
import { CidadeForm } from "@components/Forms/CidadeForm"
import { ListView } from "@components/List"
import { Item } from "@components/ListItem"
import { Modal } from "@components/Modal/Modal"
import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { useRequest } from "@hooks/useRequest"
import {
  createCity,
  deleteCity,
  getCities,
  updateCity
} from "@services/Cidades"
import { request } from "@services/request"

const ListaCidades = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const controlAccess = () => {
    if (!session) router.push("/login")
  }

  controlAccess()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [cidadesToEdit, setCidades] = useState<City>()

  const {
    data: cidades,
    isLoading,
    isValidating,
    mutate
  } = useRequest<City[]>(getCities)

  const handleDelete = useCallback(
    async ({ id }: City) => {
      const response = await request(deleteCity(id))

      if (response.type === "success") {
        toast.success("Cidade deletada com sucesso!")

        const newCidades = cidades?.data.filter((cidade) => cidade.id !== id)

        mutate(
          {
            data: {
              error: null,
              message: "",
              data: newCidades || ([] as City[])
            }
          } as AxiosResponse<ApiResponse<City[]>>,
          { revalidate: false }
        )

        return
      }

      toast.error("Erro ao deletar cidade!")
    },
    [cidades, mutate]
  )

  const handleEdit = useCallback(
    (city: City) => {
      setCidades(city)
      onOpen()
    },
    [onOpen]
  )

  const handleClose = useCallback(() => {
    setCidades(undefined)
    onClose()
  }, [onClose])

  const onSubmit = useCallback(
    async (data: CityPayload) => {
      console.log("DATA: ", data)

      const response = await request<{ data: City }>(
        cidadesToEdit ? updateCity(cidadesToEdit.id)(data) : createCity(data)
      )

      if (response.type === "success") {
        toast.success(
          `Cidade ${cidadesToEdit ? "editada" : "criada"} com sucesso!`
        )

        const newCidades = cidadesToEdit
          ? cidades?.data.map((cidade) =>
              cidade.id === cidadesToEdit?.id ? response.value.data : cidade
            )
          : [...(cidades?.data || []), response.value.data]

        mutate(
          {
            data: {
              error: null,
              message: "",
              data: newCidades
            }
          } as AxiosResponse<ApiResponse<Category[]>>,
          { revalidate: false }
        )

        setCidades(undefined)
        onClose()

        return
      }

      toast.error("Erro ao criar cidade!")
    },
    [cidadesToEdit, cidades?.data, mutate, onClose]
  )

  const renderCidadeItem = useCallback(
    (item: City) => (
      <Item title={item?.name} description="">
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
      <PageHeader title="Cidades Cadastradas">
        <HStack spacing={2}>
          <RefreshButton refresh={mutate} />
          <Button onClick={onOpen}>Nova Cidade</Button>
        </HStack>
      </PageHeader>

      <ListView<City>
        items={cidades?.data}
        render={renderCidadeItem}
        isLoading={isLoading || isValidating}
      />

      <Modal
        title={cidadesToEdit ? "Editar Cidade" : "Nova Cidade"}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <CidadeForm defaultValues={cidadesToEdit} onSubmit={onSubmit} />
      </Modal>
    </>
  )
}

export default ListaCidades
