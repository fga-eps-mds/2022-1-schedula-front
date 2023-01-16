import { HStack } from '@chakra-ui/react';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { PageHeader } from '@/components/page-header';

export function Agendamentos() {
  // const router = useRouter()

  // const { isOpen, onOpen, onClose } = useDisclosure()

  // const [chamadoToEdit, setChamadoToEdit] = useState<Chamado>()

  // const showEvents = router.query?.is_event

  // const {
  //   data: chamados,
  //   isLoading,
  //   isValidating,
  //   mutate
  // } = useRequest<Chamado[]>(
  //   getChamados({
  //     params: {
  //       is_event: showEvents
  //     }
  //   })
  // )

  // const onSubmit = useCallback(
  //   (result: Result<ApiResponse<Chamado>>) => {
  //     if (result.type === "error") {
  //       toast.error(result.error.message)

  //       return
  //     }

  //     toast.success(result.value.message)
  //     mutate()
  //     setChamadoToEdit(undefined)
  //   },
  //   [mutate]
  // )

  // const handleEdit = useCallback(
  //   (chamado: Chamado) => {
  //     setChamadoToEdit(chamado)
  //     onOpen()
  //   },
  //   [onOpen]
  // )

  // const handleClose = useCallback(() => {
  //   setChamadoToEdit(undefined)
  //   onClose()
  // }, [onClose])

  // const renderChamadoItem = useCallback(
  //   (chamado: Chamado) => (
  //     <ChamadoItem chamado={chamado} handleEdit={handleEdit} />
  //   ),
  //   [handleEdit]
  // )

  return (
    <>
      {/* <PageHeader title={showEvents ? 'Eventos' : 'Chamados'}> */}
      <PageHeader title="Agendamentos">
        <HStack spacing={2}>
          <RefreshButton
            refresh={() =>
              new Promise((resolve) => {
                resolve(5);
              })
            }
          />
        </HStack>
      </PageHeader>

      {/* <ListView<Chamado>
        items={chamados?.data}
        render={renderChamadoItem}
        isLoading={isLoading || isValidating}
      /> */}
      <p>Em progresso! Será entregue nas próximas interações..</p>

      {/* <ChamadoModal
        isOpen={isOpen}
        onClose={handleClose}
        chamado={chamadoToEdit}
        onSubmit={onSubmit}
      /> */}
    </>
  );
}
