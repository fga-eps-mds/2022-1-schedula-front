import { useCallback, useEffect } from "react"
import { UseFieldArrayUpdate, useFormContext } from "react-hook-form"
import { BsCalendar3 } from "react-icons/bs"
import {
  Box,
  Divider,
  Flex,
  Grid,
  HStack,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react"

import { ActionButton } from "@components/ActionButtons"
import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { ControlledSelect } from "@components/ControlledSelect"
import { EventForm } from "@components/Forms/ChamadoForm/EventForm"
import { EventInfo } from "@components/Forms/ChamadoForm/EventInfo"
import { useDropdownData } from "@components/Forms/ChamadoForm/useDropdowData"
import { Modal } from "@components/Modal/Modal"
import { statusColor } from "@constants/Chamados"
import { getSelectOptions } from "@hooks/useCreateSelectOptions"
import { formatDate } from "@utils/formatDate"

interface ChamadoFormProps {
  index: number
  onRemove?: () => void
  onUpdate?: UseFieldArrayUpdate<ChamadoFormValues, "problems">
  isEdditing?: boolean
}

export const ChamadoForm = ({
  index,
  onRemove,
  onUpdate,
  isEdditing
}: ChamadoFormProps) => {
  const {
    watch,
    control,
    getValues,
    reset,
    formState: { isSubmitSuccessful }
  } = useFormContext<ChamadoFormValues>()

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    categorias,
    isLoadingCategories,
    errorCategorias,
    tiposProblemas,
    isLoadingProblems,
    errorProblemas
  } = useDropdownData(
    Number(watch(`problems.${index}.category_id` as const)?.value)
  )

  const handleCreateEvent = useCallback(
    (eventData: ChamadoEvent) => {
      onUpdate?.(index, {
        ...getValues(`problems.${index}` as const),
        is_event: true,
        request_status: {
          value: "pending",
          label: "Pendente"
        },
        event_date: eventData.event_date,
        alert_dates: eventData.alert_dates,
        description: eventData.description
      })

      //   trigger()
      onClose()
    },
    [getValues, index, onClose, onUpdate]
  )

  const isEvent = watch(`problems.${index}.is_event` as const)

  return (
    <>
      <Box>
        <Flex justifyContent="space-between" alignItems="flex-end">
          <Text color="gray.500">{`// ${
            isEvent
              ? "Evento Agendado " +
                formatDate(getValues(`problems.${index}.event_date`) || "")
              : "Problema"
          }`}</Text>
        </Flex>

        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={8}
          p={6}
          position="relative"
          borderTop="2px solid"
          borderColor={statusColor(
            watch(`problems.${index}.request_status`)?.value
          )}
          bg="whiteAlpha.300"
          boxShadow="soft"
        >
          <HStack bottom="100%" right={0} position="absolute" tabIndex={-1}>
            <ActionButton
              label={isEvent ? "Editar Evento" : "Agendar Evento"}
              color="blue.500"
              fontSize={22}
              icon={<BsCalendar3 />}
              onClick={onOpen}
              aria-label="Agendar Evento"
              variant="ghost"
              tabIndex={-1}
            />

            {!isEdditing && onRemove && (
              <DeleteButton
                onClick={onRemove}
                label="Chamado"
                aria-label="Apagar Chamado"
                // variant="ghost"
                variant="ghost"
                fontSize={20}
              />
            )}
          </HStack>

          <ControlledSelect
            control={control}
            name={`problems.${index}.category_id` as const}
            id={`problems.${index}.category_id` as const}
            options={getSelectOptions(categorias?.data, "name", "id")}
            isLoading={isLoadingCategories}
            placeholder="Categoria do Problema"
            label="Categoria do Problema"
            rules={{ required: "Campo obrigatório" }}
          />

          <ControlledSelect
            control={control}
            name={`problems.${index}.problem_id` as const}
            id={`problems.${index}.problem_id` as const}
            options={getSelectOptions(tiposProblemas?.data, "name", "id")}
            isLoading={isLoadingProblems}
            placeholder="Tipo de Problema"
            label="Tipo de Problema"
            rules={{ required: "Campo obrigatório" }}
            isDisabled={!watch(`problems.${index}.category_id`)?.value}
          />
        </Grid>
      </Box>

      <Modal
        size="xl"
        title="Agendar Serviço"
        isOpen={isOpen}
        onClose={onClose}
      >
        <VStack align="stretch" spacing={2} divider={<Divider />}>
          <EventInfo
            applicant_name={getValues("applicant_name")}
            applicant_phone={getValues("applicant_phone")}
            city={getValues("city_id")?.label as string}
            workstation={getValues("workstation_id")?.label as string}
            category={
              getValues(`problems.${index}.category_id`)?.label as string
            }
            problem={getValues(`problems.${index}.problem_id`)?.label as string}
          />

          <EventForm
            onSubmit={handleCreateEvent}
            defaultValues={getValues(`problems.${index}`)}
          />
        </VStack>
      </Modal>
    </>
  )
}
