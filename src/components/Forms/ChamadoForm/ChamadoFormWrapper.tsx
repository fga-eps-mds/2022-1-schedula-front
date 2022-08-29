import { useCallback, useEffect } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import { FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
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
import { createChamado } from "@services/Chamados"
import { request } from "@services/request"
import { getWorkstations } from "@services/Workstation"

const chamadosDefaultValues: ChamadoProblem = {
  category_id: "" as unknown as number,
  problem_id: "" as unknown as number,
  is_event: false,
  priority: "normal",
  request_status: "pending"
}

export const ChamadoFormWrapper = () => {
  const methods = useForm<ChamadoPayload>({
    defaultValues: {
      attendant_name: /*user?.name*/ "Teste",
      workstation_id: "" as unknown as number,
      problems: [chamadosDefaultValues]
    },
    mode: "onChange"
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = methods

  useEffect(() => {
    register("problems", { required: true })
  }, [register])

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

  console.log("Workstations", workstations)

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)

    const response = await request<Chamado>(createChamado(data))

    if (response.type === "error") {
      toast.error(response.error.message)

      return
    }

    toast.success(response.value.message)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "problems"
  })

  const handleAdd = useCallback(() => {
    append(chamadosDefaultValues)
  }, [append])

  const handleRemove = useCallback(
    (field: number) => () => {
      remove(field)
    },
    [remove]
  )

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          <FormControl isInvalid={Boolean(errors?.applicant_name)}>
            <FormLabel>Nome Solicitando</FormLabel>
            <Input
              {...register("applicant_name", {
                required: true
              })}
            />
            <FormErrorMessage>
              {errors?.applicant_name?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors?.applicant_phone)}>
            <FormLabel>Contato Solicitando</FormLabel>
            <Input {...register("applicant_phone", { required: true })} />
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
                <Input {...register("place", { required: true })} />
                <FormErrorMessage>{errors?.place?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors?.workstation_id)}>
                <FormLabel>Posto de Trabalho</FormLabel>
                <Select {...register("workstation_id", { required: true })}>
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
              <Textarea
                {...register("description")}
                height="-webkit-fill-available"
              />
            </Flex>
          </GridItem>

          <GridItem colSpan={2}>
            <VStack align="stretch" spacing={8}>
              {(!fields || !fields.length) && 0}
              {fields?.map((field, index) => (
                <fieldset key={field.id} disabled={isSubmitting}>
                  <ChamadoForm index={index} onRemove={handleRemove(index)} />
                </fieldset>
              ))}
            </VStack>

            <Flex justifyContent="end" mt={8}>
              <Button onClick={handleAdd} variant="secondary">
                <Icon as={FaPlus} mr={2} /> Chamado
              </Button>
            </Flex>
          </GridItem>
        </Grid>

        <Button
          type="submit"
          width="100%"
          size="lg"
          isDisabled={isSubmitting || !isValid}
          isLoading={isSubmitting}
          mt={8}
          boxShadow="xl"
        >
          Finalizar Atendimento
        </Button>
      </form>
    </FormProvider>
  )
}
