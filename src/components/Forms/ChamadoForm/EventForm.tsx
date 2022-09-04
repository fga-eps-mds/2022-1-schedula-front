import { useCallback } from "react"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { FaPlus } from "react-icons/fa"
import {
  Button,
  Flex,
  FormLabel,
  IconButton,
  Textarea,
  VStack
} from "@chakra-ui/react"

import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { Datepicker } from "@components/Datepicker"

interface EventFormProps {
  defaultValues?: ChamadoEvent | undefined
  onSubmit: SubmitHandler<ChamadoEvent>
}

export const EventForm = ({ defaultValues, onSubmit }: EventFormProps) => {
  const { register, handleSubmit, control } = useForm<ChamadoEvent>({
    defaultValues: {
      alert_dates: [new Date()],
      ...defaultValues
    },
    shouldUnregister: true
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "alert_dates",
    shouldUnregister: true
  })

  const handleAddDate = useCallback(() => {
    append(new Date())
  }, [append])

  const handleRemoveDate = useCallback(
    (index: number) => () => {
      remove(index)
    },
    [remove]
  )

  return (
    <>
      {/* Self-enclosing form to avoid nested forms submiting the main form */}
      <form id="event-form" onSubmit={handleSubmit(onSubmit)}></form>
      <Flex flexDirection="column" gap={6}>
        <Datepicker
          label="Data e Hora do Evento"
          control={control}
          name="event_date"
          id="event_date"
        />

        <Flex alignItems="flex-end" gap={4}>
          <VStack align="start" spacing={6}>
            {fields?.map?.((field, index) => (
              <Flex gap={4} key={field.id} alignItems="flex-end">
                <Datepicker
                  label="Data do Alerta"
                  control={control}
                  name={`alert_dates.${index}`}
                  id={`alert_dates.${index}`}
                  showTimeInput={false}
                  dateFormat="dd/MM/yyyy"
                />
                {index > 0 && (
                  <DeleteButton
                    label="Data"
                    onClick={handleRemoveDate(index)}
                    variant="ghost"
                    aria-label="Remover Alerta"
                  />
                )}
              </Flex>
            ))}
          </VStack>
          <IconButton
            icon={<FaPlus />}
            onClick={handleAddDate}
            variant="ghost"
            color="primary"
            aria-label="Adicionar Alerta"
          />
        </Flex>

        <Flex w="100%" flexDirection="column">
          <FormLabel htmlFor="description">Descrição</FormLabel>
          <Textarea {...register("description")} height="100%" />
        </Flex>

        <Button type="submit" form="event-form" width="100%">
          Agendar Serviço
        </Button>
      </Flex>
    </>
  )
}
