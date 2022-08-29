import { useCallback, useEffect } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import { FaPlus } from "react-icons/fa"
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  Input,
  Textarea,
  VStack
} from "@chakra-ui/react"

import { ControlledSelect } from "@components/ControlledSelect"
import { ChamadoForm } from "@components/Forms/ChamadoForm"
import type { ChamadoFormValues } from "@components/Forms/ChamadoForm/ChamadoForm"
import { ChamadoStatus } from "@constants/Chamados"
import { getSelectOptions } from "@hooks/useCreateSelectOptions"
import { useRequest } from "@hooks/useRequest"
import { getWorkstations } from "@services/Workstation"

interface ChamadoFormProps {
  onSubmit: (data: ChamadoFormValues) => Promise<void>
  defaultValues?: ChamadoFormValues
}

const chamadosDefaultValues = {
  workstation_id: undefined,
  problems: [
    {
      category_id: undefined,
      problem_id: undefined,
      priority: {
        value: "normal" as Priority,
        label: "Normal"
      },
      request_status: {
        value: "pending" as keyof typeof ChamadoStatus,
        label: "Pendente"
      },
      is_event: false
    }
  ]
}

export const ChamadoFormWrapper = ({
  onSubmit,
  defaultValues
}: ChamadoFormProps) => {
  const isEdditing = Boolean(defaultValues)

  const methods = useForm<ChamadoFormValues>({
    defaultValues: {
      attendant_name: /*user?.name*/ "Teste",
      ...chamadosDefaultValues,
      ...defaultValues
    },
    mode: "onChange"
  })

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = methods

  useEffect(() => {
    // Register with validation, otherwise its possible to send form without 'problems' field
    register("problems", { required: "Adicione um Chamado" })
  }, [register])

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  const {
    data: workstations,
    isLoading: isLoadingWorkstations,
    error: errorWorkstations
  } = useRequest<Workstation[]>(getWorkstations)

  const { fields, append, remove } = useFieldArray({
    control,
    name: "problems"
  })

  const handleAdd = useCallback(() => {
    append(chamadosDefaultValues.problems[0])
  }, [append])

  const handleRemove = useCallback(
    (field: number) => {
      // if there is only one field, show the remove button
      if (fields.length > 1)
        return () => {
          remove(field)
        }
    },
    [fields.length, remove]
  )

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          <FormControl
            isInvalid={Boolean(errors?.applicant_name)}
            position="relative"
          >
            <FormLabel>Nome Solicitando</FormLabel>
            <Input
              {...register("applicant_name", {
                required: "Campo obrigatório"
              })}
            />
            <FormErrorMessage>
              {errors?.applicant_name?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors?.applicant_phone)}>
            <FormLabel>Contato</FormLabel>
            <Input
              {...register("applicant_phone", {
                required: "Campo obrigatório"
              })}
            />
            <FormErrorMessage>
              {errors?.applicant_phone?.message}
            </FormErrorMessage>
          </FormControl>

          <GridItem
            rowSpan={2}
            colSpan={2}
            gap={8}
            display="flex"
            justifyContent="space-between"
          >
            <VStack spacing={8} w="100%">
              <FormControl isInvalid={Boolean(errors?.place)}>
                <FormLabel>Local</FormLabel>
                <Input
                  {...register("place", { required: "Campo obrigatório" })}
                />
                <FormErrorMessage>{errors?.place?.message}</FormErrorMessage>
              </FormControl>

              <ControlledSelect
                control={control}
                name="workstation_id"
                id="workstation_id"
                options={getSelectOptions(workstations?.data, "name", "id")}
                isLoading={isLoadingWorkstations}
                placeholder="Posto de Trabalho"
                label="Posto de Trabalho"
                rules={{ required: "Campo obrigatório" }}
              />
            </VStack>

            <Flex w="100%" flexDirection="column">
              <FormLabel htmlFor="description">Descrição</FormLabel>
              <Textarea {...register("description")} height="100%" />
            </Flex>
          </GridItem>

          <GridItem colSpan={2}>
            <VStack align="stretch" spacing={8}>
              {(!fields || !fields.length) && (
                <>
                  <Heading
                    as="h4"
                    textAlign="center"
                    fontWeight="semibold"
                    fontSize={errors?.problems ? "3xl" : "2xl"}
                    color={errors?.problems ? "red" : "gray.500"}
                  >
                    Adicione um Chamado
                  </Heading>
                </>
              )}

              {fields?.map((field, index) => (
                <fieldset key={field.id} disabled={isSubmitting}>
                  <ChamadoForm
                    index={index}
                    onRemove={handleRemove(index)}
                    isEdditing={isEdditing}
                  />
                </fieldset>
              ))}

              {!isEdditing && (
                <Flex justifyContent="end" mt={8}>
                  <Button onClick={handleAdd} variant="tertiary">
                    <Icon as={FaPlus} mr={2} /> Chamado
                  </Button>
                </Flex>
              )}
            </VStack>
          </GridItem>
        </Grid>

        <Button
          type="submit"
          width="100%"
          size="lg"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          mt={8}
          boxShadow="xl"
        >
          Finalizar {isEdditing ? "Edição" : "Atendimento"}
        </Button>
      </form>
    </FormProvider>
  )
}
