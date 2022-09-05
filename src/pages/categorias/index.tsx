import { useCallback, useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import { Button, HStack, useDisclosure } from "@chakra-ui/react"
import { AxiosResponse } from "axios"

import { AddButton } from "@components/ActionButtons/AddButton"
import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { EditButton } from "@components/ActionButtons/EditButton"
import { CategoriaForm } from "@components/Forms/CategoriaForm"
import { ListView } from "@components/List"
import { Item } from "@components/ListItem"
import { Modal } from "@components/Modal/Modal"
import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { useRequest } from "@hooks/useRequest"
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory
} from "@services/Categorias"
import { request } from "@services/request"

const ListaCategoria = () => {
  const { data: session } = useSession()
  const router = useRouter()

  async function controlAccess() {
    if (!session) router.push("/login")
  }

  controlAccess()

  const {
    data: categorias,
    isLoading,
    isValidating,
    mutate
  } = useRequest<Category[]>(getCategories())

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [categoriaToEdit, setCategoria] = useState<Category>()

  const handleDelete = useCallback(
    async ({ id }: Category) => {
      const response = await request(deleteCategory(id))

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
              data: newCategorias || ([] as Category[])
            }
          } as AxiosResponse<ApiResponse<Category[]>>,
          { revalidate: false }
        )

        return
      }

      toast.error("Erro ao deletar categoria!")
    },
    [categorias, mutate]
  )

  const handleEdit = useCallback(
    (categoria: Category) => {
      setCategoria(categoria)
      onOpen()
    },
    [onOpen]
  )

  const handleAddProblem = useCallback(
    ({ id }: Category) => {
      router.push(`/categorias/${id}/problemas`)
    },
    [router]
  )

  const onSubmit = useCallback(
    async (data: CategoryPayload) => {
      console.log("DATA: ", data)

      const response = await request<Category>(
        categoriaToEdit
          ? updateCategory(categoriaToEdit.id)(data)
          : createCategory(data)
      )

      if (response.type === "success") {
        toast.success(
          `Categoria ${categoriaToEdit ? "editada" : "criada"} com sucesso!`
        )

        const newCategorias = categoriaToEdit
          ? categorias?.data.map((categoria) =>
              categoria.id === categoriaToEdit?.id
                ? response.value?.data
                : categoria
            )
          : [...(categorias?.data || []), response.value?.data]

        mutate(
          {
            data: {
              error: null,
              message: "",
              data: newCategorias
            }
          } as AxiosResponse<ApiResponse<Category[]>>,
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

  const renderCategoriaItem = useCallback(
    (item: Category) => (
      <Item title={item?.name} description={item?.description}>
        <Item.Actions item={item}>
          <AddButton
            onClick={handleAddProblem}
            label="Tipos de Problema"
            aria-label="Add"
          />
          <EditButton onClick={handleEdit} label={item.name} />
          <DeleteButton onClick={handleDelete} label={item.name} />
        </Item.Actions>
      </Item>
    ),
    [handleAddProblem, handleDelete, handleEdit]
  )

  return (
    <>
      <PageHeader title="Categorias de Problemas">
        <HStack spacing={2}>
          <RefreshButton refresh={mutate} />
          <Button onClick={onOpen}>Nova Categoria</Button>
        </HStack>
      </PageHeader>

      <ListView<Category>
        items={categorias?.data}
        render={renderCategoriaItem}
        isLoading={isLoading || isValidating}
      />

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
