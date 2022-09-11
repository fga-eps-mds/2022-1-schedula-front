import { useCallback, useEffect, useMemo } from "react"
import { useSession } from "next-auth/react"
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm
} from "react-hook-form"
import { BsPersonCircle, BsTelephoneFill } from "react-icons/bs"
import { FaPlus } from "react-icons/fa"
import InputMask from "react-input-mask"
import { toast } from "react-toastify"
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  InputLeftElement,
  useDisclosure,
  VStack
} from "@chakra-ui/react"

import { EditButton } from "@components/ActionButtons/EditButton"
import { ControlledSelect } from "@components/FormFields/ControlledSelect"
import { Input } from "@components/FormFields/Input"
import { ChamadoForm } from "@components/Forms/ChamadoForm"
import { chamadosDefaultValues } from "@components/Forms/ChamadoForm/helpers"
import { WorkstationModal } from "@components/Modals/WorkstationModal"
import { useRequest } from "@hooks/useRequest"
import { getCities } from "@services/Cidades"
import { getWorkstations } from "@services/Workstation"
import { getSelectOptions } from "@utils/getSelectOptions"

export interface ChamadoFormProps {
  onSubmit: SubmitHandler<ChamadoFormValues>
  defaultValues?: ChamadoFormValues
}

export const ChamadoFormWrapper = ({
  onSubmit,
  defaultValues
}: ChamadoFormProps) => {
  const { data: session } = useSession()

  const isEditing = Boolean(defaultValues)

  const methods = useForm<ChamadoFormValues>({
    defaultValues: useMemo(
      () => ({
        ...chamadosDefaultValues,
        ...defaultValues,
        attendant_name: session?.user?.name
      }),
      [defaultValues, session?.user?.name]
    ),
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
    resetField("attendant_name", {
      defaultValue: session?.user?.name
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ignore resetField
  }, [session?.user])

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
    (result: Result<ApiResponse<Workstation>>) => {
      if (result.type === "success") {
        toast.success(result.value?.message)
        mutateWorkstations()
      } else {
        toast.error(result.error?.message)
      }

      closeWorkstationModal()
    },
    [closeWorkstationModal, mutateWorkstations]
  )

  return (
    <>
      <FormProvider {...methods}>
        {/* Self-enclosing form to avoid nested forms submiting the main form */}
        <form id="chamado-form-wrapper" onSubmit={handleSubmit(onSubmit)} />
        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          <Input
            label="Solicitante"
            {...register("applicant_name", {
              required: "Campo obrigatório"
            })}
            errors={errors?.applicant_name}
            leftElement={
              <InputLeftElement>
                <Icon as={BsPersonCircle} fontSize={20} />
              </InputLeftElement>
            }
          />

          <Input
            label="Telefone"
            as={InputMask}
            mask="9999-9999"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- maskChar is not in the lib types
            // @ts-ignore
            maskChar={null}
            placeholder="0000-0000"
            {...register("applicant_phone", {
              required: "Campo obrigatório"
            })}
            errors={errors?.applicant_phone}
            leftElement={
              <InputLeftElement>
                <Icon as={BsTelephoneFill} fontSize={20} />
              </InputLeftElement>
            }
          />

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
                    isEditing={isEditing}
                  />
                </fieldset>
              ))}

              {!isEditing && (
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
          Finalizar {isEditing ? "Edição" : "Atendimento"}
        </Button>
      </FormProvider>

      <WorkstationModal
        workstation={workstations?.data?.find(
          (station) => station.id === getValues("workstation_id.value")
        )}
        isOpen={isWorkstationModalOpen}
        onClose={closeWorkstationModal}
        onSubmit={handleWorkstationEdit}
      />
    </>
  )
}
