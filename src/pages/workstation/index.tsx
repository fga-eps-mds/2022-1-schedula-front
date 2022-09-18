import { useCallback, useState } from "react"
import { toast } from "react-toastify"
import { Box, Button, HStack, useDisclosure, VStack } from "@chakra-ui/react"
import { AxiosResponse } from "axios"

import { RefreshButton } from "@components/ActionButtons/RefreshButton"
import { WorkstationItem } from "@components/Items/WorkstationItem"
import { ListView } from "@components/List"
import { WorkstationModal } from "@components/Modals/WorkstationModal"
import { PageHeader } from "@components/PageHeader"
import {
  Filters,
  workstationFields,
  WorkstationsFilter
} from "@components/WorkstationsFilter"
import { useAuthorization } from "@hooks/useAuthorization"
import { useFilters } from "@hooks/useFilters"
import { useRequest } from "@hooks/useRequest"
import { getWorkstations } from "@services/Workstation"

const Workstation = () => {
  const { isAuthorized: isCreateAuthorized } = useAuthorization(["manager"])

  const { filters, updateField } = useFilters(workstationFields)

  const {
    data: workstations,
    isLoading,
    isValidating,
    mutate
  } = useRequest<Workstation[]>(
    getWorkstations({
      params: {
        regional_id: (filters?.regional as unknown as SelectOption)?.value
      }
    }),
    {
      revalidateIfStale: false
    }
  )

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [workstationToEdit, setWorkstationToEdit] = useState<Workstation>()

  const refresh = useCallback(
    (data?: Workstation[]) =>
      mutate(
        {
          data: {
            error: null,
            message: "",
            data: data ?? []
          }
        } as AxiosResponse<ApiResponse<Workstation[]>>,
        { revalidate: !data }
      ),
    [mutate]
  )

  const onDelete = useCallback(
    (result: Result<ApiResponse<null>>, { id }: Workstation) => {
      if (result.type === "success") {
        toast.success(result.value?.message)

        const newWorkstations = workstations?.data.filter(
          (workstation) => workstation.id !== id
        )
        refresh(newWorkstations)

        return
      }

      toast.error(result.error?.message)
    },
    [refresh, workstations?.data]
  )

  const onEdit = useCallback(
    (workstation: Workstation) => {
      setWorkstationToEdit(workstation)
      onOpen()
    },
    [onOpen]
  )

  const onSubmit = useCallback(
    (result: Result<ApiResponse<Workstation>>) => {
      if (result.type === "error") {
        toast.error(result.error?.message)

        return
      }

      toast.success(result.value?.message)

      const newWorkstations = workstationToEdit
        ? workstations?.data.map((workstation) =>
            workstation.id === workstationToEdit?.id
              ? result.value?.data
              : workstation
          )
        : [...(workstations?.data || []), result.value?.data]

      refresh(newWorkstations)
      setWorkstationToEdit(undefined)
      onClose()
    },
    [onClose, refresh, workstationToEdit, workstations?.data]
  )

  const handleClose = useCallback(() => {
    setWorkstationToEdit(undefined)
    onClose()
  }, [onClose])

  const renderWorkstationItem = useCallback(
    (item: Workstation) => (
      <WorkstationItem workstation={item} onEdit={onEdit} onDelete={onDelete} />
    ),
    [onDelete, onEdit]
  )

  const handleFilterChange = useCallback(
    (values: Filters) =>
      (
        Object.entries(values) as [
          keyof Filters,
          typeof values[keyof Filters]
        ][]
      ).forEach(([field, value]) => {
        updateField(field)(value)
      }),
    [updateField]
  )

  return (
    <>
      <PageHeader title="Gerenciar Postos de Trabalho">
        <HStack spacing={2}>
          <RefreshButton refresh={mutate} />
          {isCreateAuthorized && (
            <Button onClick={onOpen}>Novo Posto de Trabalho</Button>
          )}
        </HStack>
      </PageHeader>

      <VStack align="stretch" spacing={6}>
        <Box width="50%" minWidth="300px">
          <WorkstationsFilter onFilter={handleFilterChange} />
        </Box>

        <ListView<Workstation>
          items={workstations?.data}
          render={renderWorkstationItem}
          isLoading={isLoading || isValidating}
        />
      </VStack>

      <WorkstationModal
        isOpen={isOpen}
        onClose={handleClose}
        workstation={workstationToEdit}
        onSubmit={onSubmit}
      />
    </>
  )
}

export default Workstation
