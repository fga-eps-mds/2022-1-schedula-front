import { Button, HStack, Skeleton, Tag, Text } from '@chakra-ui/react';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { PageHeader } from '@/components/page-header';

export function ListaProblemas() {
  // const isCreateAuthorized = true
  // const router = useRouter()

  // const category_id = Number(router.query?.id)

  // const { data: categoria, isLoading: isLoadingCategory } =
  //   useRequest<Category>(category_id ? getCategoryById(category_id) : null)

  // const {
  //   data: problemTypes,
  //   isLoading,
  //   isValidating,
  //   mutate
  // } = useRequest<TipoProblema[]>(getProblemTypes(category_id))

  // const refresh = useCallback(
  //   (data?: TipoProblema[]) =>
  //     mutate(
  //       {
  //         data: {
  //           error: null,
  //           message: "",
  //           data: data ?? []
  //         }
  //       } as AxiosResponse<ApiResponse<TipoProblema[]>>,
  //       { revalidate: !data }
  //     ),
  //   [mutate]
  // )

  // const { isOpen, onOpen, onClose } = useDisclosure()

  // const [problemToEdit, setProblemToEdit] = useState<TipoProblema>()

  // const onDelete = useCallback(
  //   (result: Result<ApiResponse<null>>, { id }: TipoProblema) => {
  //     if (result.type === "success") {
  //       toast.success(result.value?.message)

  //       const newProblemTypes = problemTypes?.data.filter(
  //         (problem) => problem.id !== id
  //       )
  //       refresh(newProblemTypes)

  //       return
  //     }

  //     toast.error(result.error?.message)
  //   },
  //   [problemTypes?.data, refresh]
  // )

  // const onEdit = useCallback(
  //   (problemType: TipoProblema) => {
  //     setProblemToEdit(problemType)
  //     onOpen()
  //   },
  //   [onOpen]
  // )

  // const onSubmit = useCallback(
  //   (result: Result<ApiResponse<TipoProblema>>) => {
  //     if (result.type === "error") {
  //       toast.error(result.error?.message)

  //       return
  //     }

  //     toast.success(result.value?.message)

  //     const newProblemTypes = problemToEdit
  //       ? problemTypes?.data.map((problem) =>
  //           problem.id === problemToEdit?.id ? result.value.data : problem
  //         )
  //       : [...(problemTypes?.data || []), result.value?.data]

  //     refresh(newProblemTypes)
  //     setProblemToEdit(undefined)
  //     onClose()
  //   },
  //   [onClose, problemToEdit, problemTypes?.data, refresh]
  // )

  // const handleClose = useCallback(() => {
  //   setProblemToEdit(undefined)
  //   onClose()
  // }, [onClose])

  // const renderProblemTypeItem = useCallback(
  //   (problemType: TipoProblema) => (
  //     <ProblemTypeItem
  //       problemType={problemType}
  //       onEdit={onEdit}
  //       onDelete={onDelete}
  //     />
  //   ),
  //   [onDelete, onEdit]
  // )

  return (
    // <>
    <PageHeader
      title="Gerenciar Tipos de Problema"
      subtitle={
        <Skeleton
          h="16px"
          isLoaded
          // isLoaded={Boolean(!isLoadingCategory && category_id)}
        >
          <Text color="GrayText">
            Da Categoria{' '}
            <Tag colorScheme="yellow" fontWeight="semibold" fontSize="md">
              Segurança
              {/* {categoria?.data?.name} */}
            </Tag>
          </Text>
        </Skeleton>
      }
    >
      <HStack spacing={2}>
        <RefreshButton
          refresh={() =>
            new Promise((resolve) => {
              resolve(5);
            })
          }
        />
        <Button onClick={() => console.log('onOpen')}>
          Novo Tipo de Problema
        </Button>
      </HStack>
    </PageHeader>

    //   <ListView<TipoProblema>
    //     items={problemTypes?.data}
    //     render={renderProblemTypeItem}
    //     isLoading={isLoading || isValidating}
    //   />

    //   <ProblemTypeModal
    //     isOpen={isOpen}
    //     onClose={handleClose}
    //     problemType={problemToEdit}
    //     categoryId={category_id}
    //     onSubmit={onSubmit}
    //   />
    // </>
  );
}
