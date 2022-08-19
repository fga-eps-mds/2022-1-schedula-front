import { Button, HStack, useDisclosure } from "@chakra-ui/react"

import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { useRequest } from "@hooks/useRequest"
import { detalhadorApi } from "@services/api"
import { getProblemCategories } from "@services/DetalhadorChamados"

const ListaCidades = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    data: cidades,
    isLoading,
    isValidating,
    mutate
  } = useRequest<IProblemCategory[]>(getProblemCategories(), detalhadorApi, {})

  return (
    <PageHeader title="Cidades Cadastradas">
      <HStack spacing={2}>
        <RefreshButton refresh={mutate} />
        <Button onClick={onOpen}>Nova Cidade</Button>
      </HStack>
    </PageHeader>
  )
}

export default ListaCidades
