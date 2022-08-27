import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { FaTrash } from "react-icons/fa"
import { MdLibraryAdd } from "react-icons/md"
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Select,
  Stack,
  Text,
  Tooltip
} from "@chakra-ui/react"

import { useRequest } from "@hooks/useRequest"
import { localidadesApi } from "@services/api"
import { getCities } from "@services/Cidades"

interface WorkstationFormProps {
  defaultValues?: Workstation | undefined
  onSubmit: (data: CreateWorkstationPayload) => void
}

export const WorkstationForm = ({
  defaultValues,
  onSubmit
}: WorkstationFormProps) => {
  type check = {
    adsl_vpn: boolean
    regional: boolean
  }

  const { data: cidades } = useRequest<Workstation[]>(
    getCities(),
    localidadesApi
  )

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateWorkstationPayload>({
    defaultValues: {
      ...defaultValues
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "phone"
  })
  const [CBox, setCBox] = useState<check>({ adsl_vpn: false, regional: true })

  const setVPN = () => {
    setCBox({ adsl_vpn: !CBox.adsl_vpn, regional: CBox.regional })
  }

  const setRegional = () => {
    setCBox({ adsl_vpn: CBox.adsl_vpn, regional: !CBox.regional })
  }

  const onSubmit2 = (data: CreateWorkstationPayload) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit2)}>
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
          <Flex gap={8}>
            {CBox.adsl_vpn ? (
              <></>
            ) : (
              <Box w="100%">
                <FormLabel htmlFor="Link">Link</FormLabel>
                <Input
                  {...register("link", { required: "Campo obrigatório" })}
                  placeholder=""
                  variant="flushed"
                />
                {errors?.link && (
                  <FormErrorMessage>{errors?.link?.message}</FormErrorMessage>
                )}
              </Box>
            )}

            <Box w="100%">
              <FormLabel htmlFor="ip">Faixa de IP</FormLabel>
              <Input
                {...register("ip", { required: "Campo obrigatório" })}
                placeholder=""
                variant="flushed"
              />
              {errors?.ip && (
                <FormErrorMessage>{errors?.ip?.message}</FormErrorMessage>
              )}
            </Box>
          </Flex>

          <Flex gap={8}>
            {CBox.regional ? (
              <Box w={"50%"}>
                <FormLabel htmlFor="regional_id">Regional</FormLabel>

                <Select
                  {...register("regional_id", {
                    required: "Campo obrigatório"
                  })}
                  defaultValue=""
                  variant="flushed"
                >
                  <option disabled value="">
                    Selecione
                  </option>
                  <option value="0">Regional 1</option>
                  <option value="1">Regional 2</option>
                </Select>
                {errors?.regional_id && (
                  <FormErrorMessage>
                    {errors?.regional_id?.message}
                  </FormErrorMessage>
                )}
              </Box>
            ) : (
              <></>
            )}
            <Box w={"50%"}>
              <FormLabel htmlFor="city_id">Cidade</FormLabel>
              <Select
                {...register("city_id", {
                  required: "Campo obrigatório"
                })}
                defaultValue=""
                variant="flushed"
              >
                <option disabled value="">
                  Selecione
                </option>
                {cidades?.data?.map((cidade) => {
                  return (
                    <option key={cidade.id} value={cidade.id}>
                      {cidade.name}
                    </option>
                  )
                })}
              </Select>
              {errors?.city_id && (
                <FormErrorMessage>{errors?.city_id?.message}</FormErrorMessage>
              )}
            </Box>
          </Flex>
        </Stack>
        <Flex gap={8}>
          <Box w={"45%"} mt={"2em"}>
            <FormLabel htmlFor="phone">Telefones:</FormLabel>
            {fields.map((phone, index) => {
              return (
                <Flex mt={"2em"} key={phone.id}>
                  <Box>
                    <FormLabel htmlFor={"phone"}>Telefone</FormLabel>
                    <Input
                      {...register(`phone.${index}.number`, {
                        required: "Campo obrigatório"
                      })}
                      placeholder="Novo Telefone"
                      variant="flushed"
                    />
                  </Box>

                  <Tooltip
                    label={`Tirar Telefone`}
                    placement="top"
                    bg="red.500"
                    color="white"
                    openDelay={250}
                    hasArrow
                  >
                    <Box mt={"2em"} ml={"1em"}>
                      <IconButton
                        aria-label="Delete"
                        // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop -- precisa passar a key
                        onClick={() => remove(index)}
                        icon={<FaTrash />}
                        color="red.500"
                        variant="solid"
                      />
                    </Box>
                  </Tooltip>
                  {errors?.phone && (
                    <FormErrorMessage>
                      {errors?.phone?.message}
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
            <Tooltip
              label="Adicionar Telefone"
              placement="top"
              bg="gray.100"
              color="black"
              openDelay={250}
              hasArrow
            >
              <IconButton
                aria-label="Add"
                icon={<MdLibraryAdd cursor="pointer" size={24} />}
                // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop -- eu de novo
                onClick={() => append({})}
                variant="solid"
              />
            </Tooltip>
          </Text>
        </Flex>
      </FormControl>

      <Button type="submit" width="100%" isLoading={isSubmitting}>
        Registrar
      </Button>
    </form>
  )
}
