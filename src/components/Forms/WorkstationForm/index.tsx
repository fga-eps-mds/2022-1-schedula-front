import { useForm } from "react-hook-form"
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack
} from "@chakra-ui/react"

interface WorkstationFormProps {
  defaultValues?: Workstation | undefined
  onSubmit: (data: CreateWorkstationPayload) => void
}

export const WorkstationForm = ({
  defaultValues,
  onSubmit
}: WorkstationFormProps) => {
  let isUpdating = false
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateWorkstationPayload>({
    defaultValues: {
      ...defaultValues
    }
  })

  if (defaultValues !== undefined) {
    isUpdating = true
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Object.keys(errors).length > 0} mb={8}>
        <Stack spacing={8}>
          <Flex gap={8}>
            <Box w="100%">
              <FormLabel htmlFor="name">Nome do posto de trabalho</FormLabel>
              <Input
                {...register("name", { required: "Campo obrigatório" })}
                placeholder="Nome"
                variant="flushed"
              />
              {errors?.name && (
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              )}
            </Box>

            <Box w="100%">
              <FormLabel htmlFor="adsl_vpn"></FormLabel>

              <Stack spacing={5} direction="row">
                <Stack spacing={5} direction="row">
                  <Checkbox colorScheme="orange" defaultChecked>
                    ADSL/VPN
                  </Checkbox>
                  <Checkbox colorScheme="orange" defaultChecked>
                    Regional
                  </Checkbox>
                </Stack>
              </Stack>
              {errors?.adsl_vpn && (
                <FormErrorMessage>{errors?.adsl_vpn?.message}</FormErrorMessage>
              )}
            </Box>
          </Flex>
          <Flex gap={8}>
            <Box w="100%">
              <FormLabel htmlFor="Link">Link</FormLabel>
              <Input
                {...register("Link", { required: "Campo obrigatório" })}
                placeholder=""
                variant="flushed"
              />
              {errors?.Link && (
                <FormErrorMessage>{errors?.Link?.message}</FormErrorMessage>
              )}
            </Box>

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
            <Box width="50%">
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

            <Flex gap={8}>
              <Box width="100%">
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
                  <FormErrorMessage>
                    {errors?.city_id?.message}
                  </FormErrorMessage>
                )}
              </Box>
            </Flex>
          </Flex>
        </Stack>
        <Flex gap={8}>
          <Box width="50%">
            <FormLabel htmlFor="phone">Telefone</FormLabel>
            <Input
              {...register("phone", { required: "Campo obrigatório" })}
              placeholder=""
              variant="flushed"
            />
            {errors?.phone && (
              <FormErrorMessage>{errors?.phone?.message}</FormErrorMessage>
            )}
          </Box>
        </Flex>
      </FormControl>

      <Button type="submit" width="100%" isLoading={isSubmitting}>
        Registrar
      </Button>
    </form>
  )
}
