import { Button, HStack, useDisclosure } from "@chakra-ui/react"
import { AxiosResponse } from "axios"
import { mutate } from "swr"

import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { ApiData } from "@hooks/useRequest"

const ListaCidades = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
