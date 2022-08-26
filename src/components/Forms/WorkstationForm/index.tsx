import { useState } from "react"
import { useForm } from "react-hook-form"
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

  //Vê se o campo vpn e regional estão marcados para retirar ou incluir outros campos
  const [CBox, setCBox] = useState<check>({ adsl_vpn: false, regional: false })
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateWorkstationPayload>({
    defaultValues: {
      ...defaultValues
    }
  })

  const [count, setCount] = useState<number[]>([])

  // for (let i = 0; i < count; i++) {
  //   const temp = tel
  //   temp.push(
  //     <>
  //       <FormLabel key={i} htmlFor="phone">
  //         Telefone
  //       </FormLabel>
  //       <Input
  //         {...register("phone", { required: "Campo obrigatório" })}
  //         key={i}
  //         placeholder=""
  //         variant="flushed"
  //       />
  //       {errors?.phone && (
  //         <FormErrorMessage>{errors?.phone?.message}</FormErrorMessage>
  //       )}
  //     </>
  //   )
  //   setTel(temp)
  // }

  function Contador() {
    if (count[0]) {
      setCount([...count, count[count.length - 1] + 1])
      console.log(count)
    } else {
      setCount([1])
    }
  }

  // useEffect(() => {}, [])

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
                <option value="0">Cidade 1</option>
                <option value="1">Cidade 2</option>
              </Select>
              {errors?.city_id && (
                <FormErrorMessage>{errors?.city_id?.message}</FormErrorMessage>
              )}
            </Box>
          </Flex>
        </Stack>
        <Flex gap={8}>
          <Box w={"50%"} mt={"2em"}>
            <FormLabel htmlFor="phone">Telefone</FormLabel>
            <Input
              {...register("phone", { required: "Campo obrigatório" })}
              placeholder=""
              variant="flushed"
            />
            {errors?.phone && (
              <FormErrorMessage>{errors?.phone?.message}</FormErrorMessage>
            )}
            {count.map((key) => {
              return (
                <Box mt={"2em"} key={key}>
                  <FormLabel htmlFor="phone">Telefone</FormLabel>
                  <Input
                    {...register("phone", {
                      required: "Campo obrigatório"
                    })}
                    placeholder=""
                    variant="flushed"
                  />
                  {errors?.phone && (
                    <FormErrorMessage>
                      {errors?.phone?.message}
                    </FormErrorMessage>
                  )}
                </Box>
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
                onClick={Contador}
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
