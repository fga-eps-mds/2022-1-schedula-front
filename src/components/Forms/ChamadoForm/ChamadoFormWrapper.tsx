import { useCallback } from "react"
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
  Icon,
  Input,
  Select,
  Textarea,
  VStack
} from "@chakra-ui/react"

import { ChamadoForm } from "@components/Forms/ChamadoForm"

export const ChamadoFormWrapper = () => {
  const methods = useForm<ChamadoPayload>({
    defaultValues: {
      problems: [
        {
          category_id: "",
          problem_id: "",
          is_event: false,
          priority: "normal",
          request_status: "pending",
          description: ""
        }
      ]
    }
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = methods

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "problems"
  })

  const handleAdd = useCallback(() => {
    append({
      category_id: "",
      problem_id: "",
      is_event: false,
      priority: "normal",
      request_status: "in_progress",
      description: ""
    })
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
            <Input {...register("applicant_name", { required: false })} />
            <FormErrorMessage>
              {errors?.applicant_name?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors?.applicant_phone)}>
            <FormLabel>Contato Solicitando</FormLabel>
            <Input {...register("applicant_phone", { required: false })} />
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
                <Input {...register("place", { required: false })} />
                <FormErrorMessage>{errors?.place?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors?.workstation_id)}>
                <FormLabel>Posto de Trabalho</FormLabel>
                <Select {...register("workstation_id", { required: false })} />
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
          isLoading={isSubmitting}
          mt={8}
        >
          Finalizar Atendimento
        </Button>
      </form>
    </FormProvider>
  )
}
