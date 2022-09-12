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
import { RedirectUnauthenticated } from "@utils/redirectUnautheticated"

const ListaCidades = () => {
  const router = useRouter()
  RedirectUnauthenticated(router)
  const { data: session } = useSession()

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
      if (session?.user.access === "admin") {
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
      } else {
        toast.error("Acesso Negado!")
      }
    },
    [cidades?.data, mutate, session?.user.access]
  )

  const handleEdit = useCallback(
    (city: City) => {
      if (session?.user.access !== "basic") {
        setCidades(city)
        onOpen()
      } else {
        toast.error("Acesso Negado!")
      }
    },
    [onOpen, session?.user.access]
  )

  const handleClose = useCallback(() => {
    setCidades(undefined)
    onClose()
  }, [onClose])

  const onSubmit = useCallback(
    async (data: CityPayload) => {
      if (session?.user.access !== "basic") {
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
      } else {
        toast.error("Acesso Negado!")
      }
    },
    [session?.user.access, cidadesToEdit, cidades?.data, mutate, onClose]
  )

  const renderCidadeItem = useCallback(
    (item: City) => (
      <Item title={item?.name} description="">
        <Item.Actions item={item}>
          {session?.user.access === "basic" ? (
            <></>
          ) : (
            <EditButton onClick={handleEdit} label={item.name} />
          )}
          {session?.user.access === "admin" ? (
            <DeleteButton onClick={handleDelete} label={item.name} />
          ) : (
            <></>
          )}
        </Item.Actions>
      </Item>
    ),
    [handleDelete, handleEdit, session?.user.access]
  )

  return (
    <>
      <PageHeader title="Cidades Cadastradas">
        <HStack spacing={2}>
          <RefreshButton refresh={mutate} />
          {session?.user.access === "basic" || !session ? (
            <></>
          ) : (
            <Button onClick={onOpen}>Nova Cidade</Button>
          )}
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
