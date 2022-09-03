import { useCallback, useEffect } from "react"
import { useFormContext } from "react-hook-form"
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
  isEdditing?: boolean
}

export const ChamadoForm = ({
  index,
  onRemove,
  isEdditing
}: ChamadoFormProps) => {
  const {
    setValue,
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
      console.log("EVENT DATA:: ", eventData)
      setValue(`problems.${index}.is_event`, true)
      setValue(`problems.${index}.request_status`, {
        value: "pending",
        label: "Pendente"
      })
      setValue(`problems.${index}.event_date`, eventData.event_date)
      setValue(`problems.${index}.alert_date`, eventData.alert_date)
      setValue(`problems.${index}.description`, eventData.description)
      onClose()
    },
    [index, onClose, setValue]
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

          {/* {isEvent ? (
            <Button
              size="sm"
              onClick={onOpen}
              variant="solid"
              colorScheme="blue"
            >
              <Icon as={FaPen} mr={2} />
              Editar Evento
            </Button>
          ) : (
            <Tooltip label="Realizar o agendamento do serviço" placement="top">
              <Button
                size="sm"
                mb={1}
                onClick={onOpen}
                variant="outline"
                colorScheme="blue"
              >
                <Icon as={FaCalendar} mr={2} />
                Agendar
              </Button>
            </Tooltip>
          )} */}
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

          {/* <ControlledSelect
          control={control}
          name={`problems.${index}.request_status` as const}
          id={`problems.${index}.request_status` as const}
          options={Object.entries(ChamadoStatus).map(([value, label]) => ({
            value,
            label
          }))}
          placeholder="Status"
          label="Status"
          rules={{ required: "Campo obrigatório" }}
        />

        <ControlledSelect
          control={control}
          name={`problems.${index}.priority` as const}
          id={`problems.${index}.priority` as const}
          options={Object.entries(ChamadoPriority).map(([value, label]) => ({
            value,
            label
          }))}
          placeholder="Prioridade"
          label="Prioridade"
          rules={{ required: "Campo obrigatório" }}
        /> */}

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
