import { useCallback, useEffect } from "react"
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm
} from "react-hook-form"
import { FaPlus } from "react-icons/fa"
import InputMask from "react-input-mask"
import { toast } from "react-toastify"
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
  useDisclosure,
  VStack
} from "@chakra-ui/react"

import { EditButton } from "@components/ActionButtons/EditButton"
import { ControlledSelect } from "@components/ControlledSelect"
import { ChamadoForm } from "@components/Forms/ChamadoForm"
import { chamadosDefaultValues } from "@components/Forms/ChamadoForm/helpers"
import { WorkstationModal } from "@components/Modals/WorkstationModal"
import { useRequest } from "@hooks/useRequest"
import { getCities } from "@services/Cidades"
import { request } from "@services/request"
import { getWorkstations, updateWorkstation } from "@services/Workstation"
import { getSelectOptions } from "@utils/getSelectOptions"

interface ChamadoFormProps {
  onSubmit: SubmitHandler<ChamadoFormValues>
  defaultValues?: ChamadoFormValues
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
    getValues,
    watch,
    control,
    handleSubmit,
    reset,
    resetField,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty }
  } = methods

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "problems"
  })

  const {
    onOpen: openWorkstationModal,
    isOpen: isWorkstationModalOpen,
    onClose: closeWorkstationModal
  } = useDisclosure()

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
    isValidating: isValidatingWorkstations,
    error: errorWorkstations,
    mutate: mutateWorkstations
  } = useRequest<Workstation[]>(getWorkstations())

  useEffect(() => {
    // THIS A HACKY SOLUTION UNTIL BACKEND SENDS THE NAME OF THE CITY/WORKSTATION
    // Get workstation label from defaultValues and set it on the select
    if (defaultValues?.workstation_id && workstations) {
      const label = workstations?.data.find(
        (workstation) =>
          workstation?.id === defaultValues?.workstation_id?.value
      )?.name

      if (label)
        resetField("workstation_id", {
          defaultValue: {
            value: defaultValues?.workstation_id?.value,
            label
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- HACKY CODE
  }, [defaultValues, workstations])

  useEffect(() => {
    // THIS A HACKY SOLUTION UNTIL BACKEND SENDS THE NAME OF THE CITY/WORKSTATION
    // Get workstation label from defaultValues and set it on the select
    if (defaultValues?.city_id && cities) {
      const label = cities?.data.find(
        (city) => city?.id === defaultValues?.city_id?.value
      )?.name

      if (label)
        resetField("city_id", {
          defaultValue: {
            value: defaultValues?.city_id?.value,
            label
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- HACKY CODE
  }, [cities, defaultValues])

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

  const handleWorkstationEdit = useCallback(
    async (data: CreateWorkstationPayload) => {
      const payload = {
        ...data,
        phones: (data.phones as unknown as { number: string }[])?.map(
          (phone) => phone?.number
        )
      }

      const response = await request<Workstation>(
        updateWorkstation(getValues("workstation_id.value"))(payload)
      )

      if (response.type === "success") {
        toast.success(response.value?.message)
        mutateWorkstations()
      } else {
        toast.error(response.error?.message)
      }

      closeWorkstationModal()
    },
    [getValues, closeWorkstationModal, mutateWorkstations]
  )

  return (
    <>
      <FormProvider {...methods}>
        {/* Self-enclosing form to avoid nested forms submiting the main form */}
        <form id="chamado-form-wrapper" onSubmit={handleSubmit(onSubmit)} />
        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          <FormControl
            isInvalid={Boolean(errors?.applicant_name)}
            position="relative"
          >
            <FormLabel>Solicitante</FormLabel>
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
            <FormLabel>Telefone</FormLabel>
            <Input
              as={InputMask}
              mask="9999-9999"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- maskChar is not in the lib types
              // @ts-ignore
              maskChar={null}
              placeholder="0000-0000"
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

          <GridItem position="relative">
            <EditButton
              label="Posto de Trabalho"
              onClick={openWorkstationModal}
              disabled={!watch("workstation_id")}
              size="sm"
              variant="ghost"
              position="absolute"
              top={0}
              right={0}
              aria-label="Editar Posto de Trabalho"
              zIndex={5}
              tabIndex={-1}
            />
            <ControlledSelect
              control={control}
              name="workstation_id"
              id="workstation_id"
              options={getSelectOptions(workstations?.data, "name", "id")}
              isLoading={isLoadingWorkstations || isValidatingWorkstations}
              placeholder="Posto de Trabalho"
              label="Posto de Trabalho"
              rules={{ required: "Campo obrigatório" }}
            />
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
                    onUpdate={update}
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

      <WorkstationModal
        defaultValues={workstations?.data?.find(
          (station) => station.id === getValues("workstation_id.value")
        )}
        isOpen={isWorkstationModalOpen}
        onClose={closeWorkstationModal}
        onSubmit={handleWorkstationEdit}
      />
    </>
  )
}
