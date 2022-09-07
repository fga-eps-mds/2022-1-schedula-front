import { useCallback, useEffect, useState } from "react"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { FaPlus } from "react-icons/fa"
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text
} from "@chakra-ui/react"

import { ActionButton } from "@components/ActionButtons"
import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { ControlledSelect } from "@components/ControlledSelect"
import { getSelectOptions } from "@utils/getSelectOptions"

export interface WorkstationFormProps {
  defaultValues?: Workstation | undefined
  onSubmit: SubmitHandler<CreateWorkstationPayload>
  cidades: ApiResponse<City[]> | undefined
  regionais: ApiResponse<Workstation[]> | undefined
  isLoadingRegionais: boolean
  isLoadingCidades: boolean
}

type FormValues = CreateWorkstationPayload & {
  phones: { number: string }[]
}

type check = {
  adsl_vpn: boolean | null
  regional: boolean | null
}

export const WorkstationForm = ({
  defaultValues,
  onSubmit,
  cidades,
  regionais,
  isLoadingRegionais,
  isLoadingCidades
}: WorkstationFormProps) => {
  // const { data: cidades, isLoading: isLoadingCidades } =
  //   useRequest<Workstation[]>(getCities)

  // const { data: regionais, isLoading: isLoadingRegionais } = useRequest<
  //   Workstation[]
  // >(
  //   getWorkstations({
  //     params: {
  //       regional: true
  //     }
  //   })
  // )

  const {
    register,
    control,
    handleSubmit,

    reset,
    resetField,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    defaultValues: {
      ...defaultValues,
      phones: defaultValues?.phones?.map((phone) => ({ number: phone }))
    }
  })

  useEffect(() => {
    // THIS A HACKY SOLUTION UNTIL BACKEND SENDS THE NAME OF THE CITY/WORKSTATION
    // Get workstation label from defaultValues and set it on the select
    if (defaultValues?.regional_id && regionais) {
      const label = regionais?.data.find(
        (regional) => regional?.id === defaultValues?.regional_id
      )?.name

      if (label)
        resetField("regional_id", {
          defaultValue: {
            value: defaultValues?.regional_id,
            label
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- HACKY CODE
  }, [defaultValues])

  useEffect(() => {
    // THIS A HACKY SOLUTION UNTIL BACKEND SENDS THE NAME OF THE CITY/WORKSTATION
    // Get workstation label from defaultValues and set it on the select
    if (defaultValues?.city_id && cidades) {
      const label = cidades?.data.find(
        (city) => city?.id === defaultValues?.city_id
      )?.name

      if (label)
        resetField("city_id", {
          defaultValue: {
            value: defaultValues?.city_id,
            label
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- HACKY CODE
  }, [defaultValues])

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phones"
  })

  const handleAddPhone = useCallback(() => {
    append({
      number: ""
    })
  }, [append])

  const handleRemovePhone = useCallback(
    (index: number) => () => {
      remove(index)
    },
    [remove]
  )

  const [CBox, setCBox] = useState<check>({
    adsl_vpn: defaultValues?.adsl_vpn || false,
    regional: defaultValues?.regional || false
  })

  const setVPN = () => {
    setCBox({ adsl_vpn: !CBox.adsl_vpn, regional: CBox.regional })
    reset({ link: undefined, ip: undefined })
  }

  const setRegional = () => {
    setCBox({ adsl_vpn: CBox.adsl_vpn, regional: !CBox.regional })
    reset({ regional_id: undefined })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Object.keys(errors).length > 0} mb={8}>
        <Stack spacing={8}>
          <Flex gap={8}>
            <Box w="100%">
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input
                {...register("name", { required: "Campo obrigatório" })}
                placeholder="Nome"
                variant="flushed"
              />
              {errors?.name && (
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              )}
            </Box>
            <FormLabel htmlFor="adsl_vpn"></FormLabel>

            <Stack spacing={5} direction="row" w={"100%"}>
              <Stack spacing={5} direction="row">
                <Checkbox
                  colorScheme="orange"
                  {...register("adsl_vpn", {
                    onChange() {
                      setVPN()
                    }
                  })}
                >
                  ADSL/VPN
                </Checkbox>
                <Checkbox
                  colorScheme="orange"
                  {...register("regional", {
                    onChange() {
                      setRegional()
                    }
                  })}
                >
                  Regional
                </Checkbox>
              </Stack>
            </Stack>
            {errors?.adsl_vpn && (
              <FormErrorMessage>{errors?.adsl_vpn?.message}</FormErrorMessage>
            )}
          </Flex>

          {CBox.adsl_vpn ? (
            <></>
          ) : (
            <Flex gap={8}>
              <Box w="100%">
                <FormLabel htmlFor="Link">Link</FormLabel>
                <Input
                  {...register("link", {
                    required: "Campo obrigatório",
                    shouldUnregister: true
                  })}
                  placeholder="00.00.000.1"
                  variant="flushed"
                />
                {errors?.link && (
                  <FormErrorMessage>{errors?.link?.message}</FormErrorMessage>
                )}
              </Box>
              <Box w="100%">
                <FormLabel htmlFor="ip">Faixa de IP</FormLabel>
                <Input
                  {...register("ip", {
                    required: "Campo obrigatório",
                    shouldUnregister: true
                  })}
                  placeholder="00.000.00.2 a 00.00.000.3"
                  variant="flushed"
                />
                {errors?.ip && (
                  <FormErrorMessage>{errors?.ip?.message}</FormErrorMessage>
                )}
              </Box>
            </Flex>
          )}

          <Flex gap={8}>
            {!CBox.regional ? (
              <Box w={"50%"}>
                <ControlledSelect
                  control={control}
                  name="regional_id"
                  id="regional_id"
                  options={getSelectOptions(regionais?.data, "name", "id")}
                  isLoading={isLoadingRegionais}
                  placeholder="Regional"
                  label="Regional"
                  rules={{
                    required: "Campo obrigatório",
                    shouldUnregister: true
                  }}
                />
              </Box>
            ) : (
              <></>
            )}

            <Box w={"50%"}>
              <ControlledSelect
                control={control}
                name="city_id"
                id="city_id"
                options={getSelectOptions(cidades?.data, "name", "id")}
                isLoading={isLoadingCidades}
                placeholder="Cidade"
                label="Cidade"
                rules={{ required: "Campo obrigatório" }}
              />
            </Box>
          </Flex>
        </Stack>

        <Flex gap={8}>
          <Box w={"45%"} mt={"2em"}>
            <FormLabel htmlFor="phone">Telefones:</FormLabel>
            {fields?.map((phone, index) => {
              return (
                <Flex mt={"2em"} key={phone.id}>
                  <Box>
                    <FormLabel htmlFor={"phone"}>Telefone</FormLabel>
                    <Input
                      {...register(`phones.${index}.number` as const, {
                        required: "Campo obrigatório"
                      })}
                      placeholder="Novo Telefone"
                      variant="flushed"
                    />
                  </Box>
                  <Box mt={"2em"} ml={"1em"}>
                    <DeleteButton
                      label="Telefone"
                      onClick={handleRemovePhone(index)}
                      variant="ghost"
                    />
                  </Box>
                  {errors?.phones && (
                    <FormErrorMessage>
                      {errors?.phones?.message}
                    </FormErrorMessage>
                  )}
                </Flex>
              )
            })}
          </Box>
          <Text
            fontSize={"3xl"}
            w={"50%"}
            textAlign={"left"}
            alignSelf={"flex-end"}
          >
            <ActionButton
              label="Adicionar Telefone"
              icon={<FaPlus />}
              variant="ghost"
              color="primary"
              onClick={handleAddPhone}
            />
          </Text>
        </Flex>
      </FormControl>

      <Button type="submit" width="100%" isLoading={isSubmitting}>
        Registrar
      </Button>
    </form>
  )
}
