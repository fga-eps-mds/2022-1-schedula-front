import { useCallback, useState } from "react"
import { toast } from "react-toastify"
import { Box, Button, Flex, HStack, useDisclosure } from "@chakra-ui/react"
import { AxiosResponse } from "axios"

import { CidadeForm } from "@components/Forms/CidadeForm"
import { ListItem } from "@components/ListItem"
import { ListItemSkeleton } from "@components/ListItem/LIstItemSkeleton"
import { Modal } from "@components/Modal/Modal"
import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { ApiData, useRequest } from "@hooks/useRequest"
import { detalhadorApi } from "@services/api"
import {
  createCity,
  deleteCity,
  getCities,
  updateCity
} from "@services/Cidades"
import { request } from "@services/request"

const ListaCidades = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [cidadesToEdit, setCidades] = useState<ICity>()

  const {
    data: cidades,
    isLoading,
    isValidating,
    mutate
  } = useRequest<ICity[]>(getCities(), detalhadorApi, {})

  const handleDelete = useCallback(
    (id: number) => async () => {
      const response = await request(deleteCity(id), detalhadorApi)

      if (response.type === "success") {
        toast.success("Categoria deletada com sucesso!")

        const newCidades = cidades?.data.filter((cidade) => cidade.id !== id)

        mutate(
          {
            data: {
              error: null,
              message: "",
              data: newCidades || ([] as ICity[])
            }
          } as AxiosResponse<ApiData<ICity[]>>,
          { revalidate: false }
        )

        return
      }

      toast.error("Erro ao deletar categoria!")
    },
    [cidades, mutate]
  )

  const handleEdit = useCallback(
    (city: ICity) => () => {
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
    async (data: ICityPayload) => {
      console.log("DATA: ", data)

      const response = await request<{ data: ICity }>(
        cidadesToEdit ? updateCity(cidadesToEdit.id)(data) : createCity(data),
        detalhadorApi
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
          } as AxiosResponse<ApiData<IProblemCategory[]>>,
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

  return (
    <>
      <PageHeader title="Cidades Cadastradas">
        <HStack spacing={2}>
          <RefreshButton refresh={mutate} />
          <Button onClick={onOpen}>Nova Cidade</Button>
        </HStack>
      </PageHeader>

      {isLoading ? (
        <ListItemSkeleton />
      ) : (
        <Flex flexDirection="column" gap={6}>
          {cidades?.data?.map?.((item, key) => (
            <ListItem title={item?.name} key={key} description={""}>
              <ListItem.Actions
                itemName={item?.name}
                onEdit={handleEdit(item)}
                onDelete={handleDelete(item.id)}
              />
            </ListItem>
          ))}
        </Flex>
      )}

      {cidades && isValidating && (
        <Box mt={6}>
          <ListItemSkeleton />
        </Box>
      )}

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
