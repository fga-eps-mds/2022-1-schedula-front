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
  Select,
  Textarea,
  VStack
} from "@chakra-ui/react"

import { ChamadoForm } from "@components/Forms/ChamadoForm"
import {
  getSelectOptions,
  useCreateSelectOptions
} from "@hooks/useCreateSelectOptions"
import { useRequest } from "@hooks/useRequest"
import { getWorkstations } from "@services/Workstation"

interface ChamadoFormProps {
  onSubmit: (data: ChamadoPayload) => Promise<void>
  defaultValues?: ChamadoPayload
}

const chamadosDefaultValues: ChamadoProblem = {
  category_id: "" as unknown as number,
  problem_id: "" as unknown as number,
  is_event: false,
  priority: "normal",
  request_status: "pending"
}

export const ChamadoFormWrapper = ({
  onSubmit,
  defaultValues
}: ChamadoFormProps) => {
  const isEdditing = Boolean(defaultValues)

  const methods = useForm<ChamadoPayload>({
    defaultValues: {
      attendant_name: /*user?.name*/ "Teste",
      workstation_id: "" as unknown as number,
      problems: [chamadosDefaultValues],
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

  const workstationsOptions = useCreateSelectOptions({
    options: getSelectOptions(workstations?.data, "name", "id"),
    isLoading: isLoadingWorkstations,
    errorMessage: errorWorkstations?.message
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "problems"
  })

  const handleAdd = useCallback(() => {
    append(chamadosDefaultValues)
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
          <FormControl isInvalid={Boolean(errors?.applicant_name)}>
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
            <FormLabel>Contato Solicitando</FormLabel>
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

              <FormControl isInvalid={Boolean(errors?.workstation_id)}>
                <FormLabel>Posto de Trabalho</FormLabel>
                <Select
                  {...register("workstation_id", {
                    required: "Campo obrigatório"
                  })}
                >
                  <option value="" disabled>
                    Selecione um posto de trabalho
                  </option>
                  {workstationsOptions}
                </Select>
                <FormErrorMessage>
                  {errors?.workstation_id?.message}
                </FormErrorMessage>
              </FormControl>
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
                  <Button onClick={handleAdd} variant="secondary">
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
