import { useCallback, useState } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import {
  Button,
  HStack,
  Skeleton,
  Tag,
  Text,
  useDisclosure
} from "@chakra-ui/react"
import { AxiosResponse } from "axios"

import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { EditButton } from "@components/ActionButtons/EditButton"
import { CategoriaForm as ProblemTypeForm } from "@components/Forms/CategoriaForm"
import { ListView } from "@components/List"
import { Item } from "@components/ListItem"
import { Modal } from "@components/Modal/Modal"
import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { useRequest } from "@hooks/useRequest"
import { getCategoryById } from "@services/Categorias"
import {
  createProblemType,
  deleteProblemType,
  getProblemTypes,
  updateProblemType
} from "@services/Problemas"
import { request } from "@services/request"
import { RedirectUnauthenticated } from "@utils/redirectUnautheticated"

const ListaProblemas = () => {
  const router = useRouter()
  RedirectUnauthenticated(router)
  const category_id = Number(router.query?.id)

  const { data: categoria, isLoading: isLoadingCategory } =
    useRequest<Category>(category_id ? getCategoryById(category_id) : null)

  const {
    data: problemas,
    isLoading,
    isValidating,
    mutate
  } = useRequest<TipoProblema[]>(getProblemTypes(category_id))

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [problemToEdit, setProblemToEdit] = useState<TipoProblema>()

  const handleDelete = useCallback(
    async ({ id }: TipoProblema) => {
      const response = await request(deleteProblemType(id))

      if (response.type === "success") {
        toast.success("Tipo de problema deletado com sucesso!")

        const newProblemas = problemas?.data.filter(
          (problema) => problema.id !== id
        )

        mutate(
          {
            data: {
              error: null,
              message: "",
              data: newProblemas || ([] as TipoProblema[])
            }
          } as AxiosResponse<ApiResponse<TipoProblema[]>>,
          { revalidate: false }
        )

        return
      }

      toast.error("Erro ao deletar Tipo de Problema!")
    },
    [problemas?.data, mutate]
  )

  const handleEdit = useCallback(
    (categoria: TipoProblema) => {
      setProblemToEdit(categoria)
      onOpen()
    },
    [onOpen]
  )

  const onSubmit = useCallback(
    async (data: ProblemTypePayload) => {
      console.log("DATA: ", data)

      const response = await request<TipoProblema>(
        problemToEdit
          ? updateProblemType(problemToEdit.id)(data)
          : createProblemType({ ...data, category_id })
      )

      if (response.type === "success") {
        toast.success(
          `Tipo de Problema ${
            problemToEdit ? "editado" : "criado"
          } com sucesso!`
        )

        const newProblemas = problemToEdit
          ? problemas?.data.map((problema) =>
              problema.id === problemToEdit?.id ? response.value.data : problema
            )
          : [...(problemas?.data || []), response.value?.data]

        mutate(
          {
            data: {
              error: null,
              message: "",
              data: newProblemas
            }
          } as AxiosResponse<ApiResponse<TipoProblema[]>>,
          { revalidate: false }
        )

        setProblemToEdit(undefined)
        onClose()

        return
      }

      toast.error("Erro ao criar Tipo de Problema!")
    },
    [problemToEdit, category_id, problemas?.data, mutate, onClose]
  )

  const handleClose = useCallback(() => {
    setProblemToEdit(undefined)
    onClose()
  }, [onClose])

  const renderProblemaItem = useCallback(
    (item: Category) => (
      <Item title={item?.name} description={item?.description}>
        <Item.Actions item={item}>
          <EditButton onClick={handleEdit} label={item.name} />
          <DeleteButton
            onClick={handleDelete}
            label={item.name}
            aria-label={`Apagar ${item.name}`}
          />
        </Item.Actions>
      </Item>
    ),
    [handleDelete, handleEdit]
  )

  return (
    <>
      <PageHeader
        title="Gerenciar Tipos de Problema"
        subtitle={
          <Skeleton
            h="16px"
            isLoaded={Boolean(!isLoadingCategory && category_id)}
          >
            <Text color="GrayText">
              Da Categoria{" "}
              <Tag colorScheme="yellow" fontWeight="semibold" fontSize="md">
                {categoria?.data?.name}
              </Tag>
            </Text>
          </Skeleton>
        }
      >
        <HStack spacing={2}>
          <RefreshButton refresh={mutate} />
          <Button onClick={onOpen}>Novo Tipo de Problema</Button>
        </HStack>
      </PageHeader>

      <ListView<TipoProblema>
        items={problemas?.data}
        render={renderProblemaItem}
        isLoading={isLoading || isValidating}
      />

      <Modal
        title={
          problemToEdit ? "Editar Tipo de Problema" : "Novo Tipo de Problema"
        }
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ProblemTypeForm
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- ignore
          defaultValues={{ ...problemToEdit, category_id } as TipoProblema}
          onSubmit={onSubmit}
        />
      </Modal>
    </>
  )
}

export default ListaProblemas
