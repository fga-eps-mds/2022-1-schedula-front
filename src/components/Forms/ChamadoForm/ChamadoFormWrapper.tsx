import { useCallback, useEffect } from "react"
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm
} from "react-hook-form"
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
  VStack
} from "@chakra-ui/react"

import { ControlledSelect } from "@components/ControlledSelect"
import { ChamadoForm } from "@components/Forms/ChamadoForm"
import { getSelectOptions } from "@hooks/useCreateSelectOptions"
import { useRequest } from "@hooks/useRequest"
import { getCities } from "@services/Cidades"
import { getWorkstations } from "@services/Workstation"

interface ChamadoFormProps {
  onSubmit: SubmitHandler<ChamadoFormValues>
  defaultValues?: ChamadoFormValues
}

const chamadosDefaultValues: ChamadoFormValues = {
  attendant_name: "",
  applicant_name: "",
  applicant_phone: "",
  city_id: null,
  workstation_id: null,
  problems: [
    {
      request_status: {
        value: "solved" as const,
        label: "Resolvido"
      },
      priority: {
        value: "normal" as const,
        label: "Normal"
      },
      is_event: false,
      category_id: null,
      problem_id: null
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
      ...chamadosDefaultValues,
      ...defaultValues,
      attendant_name: /*user?.name*/ "Teste"
    },
    mode: "onChange"
  })

  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty }
  } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: "problems"
  })

  useEffect(() => {
    // Register with validation, otherwise its possible to send form without 'problems' field
    register("problems", { required: "Adicione um Chamado" })
  }, [register])

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ignore reset
  }, [isSubmitSuccessful])

  const {
    data: cities,
    isLoading: isLoadingCities,
    error: errorCities
  } = useRequest<City[]>(getCities)

  const {
    data: workstations,
    isLoading: isLoadingWorkstations,
    error: errorWorkstations
  } = useRequest<Workstation[]>(getWorkstations)

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
      {/* Self-enclosing form to avoid nested forms submiting the main form */}
      <form id="chamado-form-wrapper" onSubmit={handleSubmit(onSubmit)} />
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
          <FormErrorMessage>{errors?.applicant_name?.message}</FormErrorMessage>
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

        <ControlledSelect
          control={control}
          name="city_id"
          id="city_id"
          options={getSelectOptions(cities?.data, "name", "id")}
          isLoading={isLoadingCities}
          placeholder="Cidade"
          label="Cidade"
          rules={{ required: "Campo obrigatório" }}
        />

        <ControlledSelect
          control={control}
          name="workstation_id"
          id="workstation_id"
          options={getSelectOptions(workstations?.data, "name", "id")}
          isLoading={isLoadingCities}
          placeholder="Posto de Trabalho"
          label="Posto de Trabalho"
          rules={{ required: "Campo obrigatório" }}
        />

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
        form="chamado-form-wrapper"
        width="100%"
        size="lg"
        isDisabled={isSubmitting || !isDirty}
        isLoading={isSubmitting}
        mt={8}
        boxShadow="xl"
      >
        Finalizar {isEdditing ? "Edição" : "Atendimento"}
      </Button>
    </FormProvider>
  )
}
