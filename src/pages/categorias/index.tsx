import { useCallback, useState } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { Box, Button, Flex, HStack, useDisclosure } from "@chakra-ui/react"
import { AxiosResponse } from "axios"

import { CategoriaForm } from "@components/Forms/CategoriaForm"
import { ListItem } from "@components/ListItem"
import { ListItemSkeleton } from "@components/ListItem/LIstItemSkeleton"
import { Modal } from "@components/Modal/Modal"
import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { ApiData, useRequest } from "@hooks/useRequest"
import { detalhadorApi } from "@services/api"
import {
  createProblemCategory,
  deleteProblemCategory,
  getProblemCategories,
  updateProblemCategory
} from "@services/DetalhadorChamados"
import { request } from "@services/request"

const ListaCategoria = () => {
  const router = useRouter()

  const {
    data: categorias,
    isLoading,
    isValidating,
    mutate
  } = useRequest<IProblemCategory[]>(getProblemCategories(), detalhadorApi, {})

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [categoriaToEdit, setCategoria] = useState<IProblemCategory>()

  const handleDelete = useCallback(
    (id: number) => async () => {
      const response = await request(deleteProblemCategory(id), detalhadorApi)

      if (response.type === "success") {
        toast.success("Categoria deletada com sucesso!")

        const newCategorias = categorias?.data.filter(
          (categoria) => categoria.id !== id
        )

        mutate(
          {
            data: {
              error: null,
              message: "",
              data: newCategorias || ([] as IProblemCategory[])
            }
          } as AxiosResponse<ApiData<IProblemCategory[]>>,
          { revalidate: false }
        )

        return
      }

      toast.error("Erro ao deletar categoria!")
    },
    [categorias, mutate]
  )

  const handleEdit = useCallback(
    (categoria: IProblemCategory) => () => {
      setCategoria(categoria)
      onOpen()
    },
    [onOpen]
  )

  const handleAddProblem = useCallback(
    (id: number) => () => {
      router.push(`/categorias/${id}/problemas`)
    },
    [router]
  )

  const onSubmit = useCallback(
    async (data: IProblemCategoryPayload) => {
      console.log("DATA: ", data)

      const response = await request<{ data: IProblemCategory }>(
        categoriaToEdit
          ? updateProblemCategory(categoriaToEdit.id)(data)
          : createProblemCategory(data),
        detalhadorApi
      )

      if (response.type === "success") {
        toast.success(
          `Categoria ${categoriaToEdit ? "editada" : "criada"} com sucesso!`
        )

        const newCategorias = categoriaToEdit
          ? categorias?.data.map((categoria) =>
              categoria.id === categoriaToEdit?.id
                ? response.value.data
                : categoria
            )
          : [...(categorias?.data || []), response.value.data]

        mutate(
          {
            data: {
              error: null,
              message: "",
              data: newCategorias
            }
          } as AxiosResponse<ApiData<IProblemCategory[]>>,
          { revalidate: false }
        )

        setCategoria(undefined)
        onClose()

        return
      }

      toast.error("Erro ao criar categoria!")
    },
    [categoriaToEdit, categorias?.data, mutate, onClose]
  )

  const handleClose = useCallback(() => {
    setCategoria(undefined)
    onClose()
  }, [onClose])

  return (
    <>
      <PageHeader title="Categorias de Problemas">
        <HStack spacing={2}>
          <RefreshButton refresh={mutate} />
          <Button onClick={onOpen}>Nova Categoria</Button>
        </HStack>
      </PageHeader>

      {isLoading ? (
        <ListItemSkeleton />
      ) : (
        <Flex flexDirection="column" gap={6}>
          {categorias?.data?.map?.((item, key) => (
            <ListItem
              title={item?.name}
              description={item?.description}
              key={key}
            >
              <ListItem.Actions
                itemName={item?.name}
                onEdit={handleEdit(item)}
                onDelete={handleDelete(item.id)}
                onAdd={handleAddProblem(item?.id)}
              />
            </ListItem>
          ))}
        </Flex>
      )}

      {categorias && isValidating && (
        <Box mt={6}>
          <ListItemSkeleton />
        </Box>
      )}

      <Modal
        title={categoriaToEdit ? "Editar Categoria" : "Nova Categoria"}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <CategoriaForm defaultValues={categoriaToEdit} onSubmit={onSubmit} />
      </Modal>
    </>
  )
}

export default ListaCategoria
