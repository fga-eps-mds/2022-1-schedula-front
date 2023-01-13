export function Chamados() {
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
    // <>
    //   <PageHeader title={showEvents ? "Eventos" : "Chamados"}>
    //     <HStack spacing={2}>
    //       <RefreshButton refresh={mutate} />
    //       <NextLink href="/chamados/registrar" passHref>
    //         <Button variant="primary">Novo Chamado</Button>
    //       </NextLink>
    //     </HStack>
    //   </PageHeader>

    //   <ListView<Chamado>
    //     items={chamados?.data}
    //     render={renderChamadoItem}
    //     isLoading={isLoading || isValidating}
    //   />

    //   <ChamadoModal
    //     isOpen={isOpen}
    //     onClose={handleClose}
    //     chamado={chamadoToEdit}
    //     onSubmit={onSubmit}
    //   />
    // </>
    <h1>Chamados</h1>
  );
}
