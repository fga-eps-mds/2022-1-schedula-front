import { useCallback, useState } from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { Button, useDisclosure } from "@chakra-ui/react"
import { AxiosResponse } from "axios"

import { AddButton } from "@components/ActionButtons/AddButton"
import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { EditButton } from "@components/ActionButtons/EditButton"
import { CategoriaForm } from "@components/Forms/CategoriaForm"
import { ListView } from "@components/List"
import { Item } from "@components/ListItem"
import { Modal } from "@components/Modal/Modal"
import { PageHeader } from "@components/PageHeader"
import { useRequest } from "@hooks/useRequest"
import {
  createProblemCategory,
  deleteProblemCategory,
  getProblemCategories,
  updateProblemCategory
} from "@services/Chamados"
import { request } from "@services/request"

const ListaCategoria = () => {
  const router = useRouter()

  const {
    data: categorias,
    isLoading,
    isValidating,
    mutate
  } = useRequest<CategoriaProblema[]>(getProblemCategories)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [categoriaToEdit, setCategoria] = useState<CategoriaProblema>()

  const handleDelete = useCallback(
    async ({ id }: CategoriaProblema) => {
      const response = await request(deleteProblemCategory(id))

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
              data: newCategorias || ([] as CategoriaProblema[])
            }
          } as AxiosResponse<ApiResponse<CategoriaProblema[]>>,
          { revalidate: false }
        )

        return
      }

      toast.error("Erro ao deletar categoria!")
    },
    [categorias, mutate]
  )

  const handleEdit = useCallback(
    (categoria: CategoriaProblema) => {
      setCategoria(categoria)
      onOpen()
    },
    [onOpen]
  )

  const handleAddProblem = useCallback(
    ({ id }: CategoriaProblema) => {
      router.push(`/categorias/${id}/problemas`)
    },
    [router]
  )

  const onSubmit = useCallback(
    async (data: CategoriaProblemaPayload) => {
      console.log("DATA: ", data)

      const response = await request<CategoriaProblema>(
        categoriaToEdit
          ? updateProblemCategory(categoriaToEdit.id)(data)
          : createProblemCategory(data)
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
          } as AxiosResponse<ApiResponse<CategoriaProblema[]>>,
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
    (item: CategoriaProblema) => (
      <Item title={item?.name} description={item?.description}>
        <Item.Actions item={item}>
          <AddButton
            onClick={handleAddProblem}
            label="Tipos de Problema"
            aria-label="Ver tipos de problema"
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
      <PageHeader title="Chamados">
        <NextLink href="/chamados/registrar" passHref>
          <Button as="a" variant="outline">
            Registrar Chamado
          </Button>
        </NextLink>
      </PageHeader>

      <ListView<CategoriaProblema>
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
