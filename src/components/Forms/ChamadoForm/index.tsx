import { useFormContext } from "react-hook-form"
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Select,
  Text
} from "@chakra-ui/react"

import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { useDropdownData } from "@components/Forms/ChamadoForm/useDropdowData"
import { ChamadoPriority, ChamadoStatus } from "@constants/Chamados"
import {
  getSelectOptions,
  useCreateSelectOptions
} from "@hooks/useCreateSelectOptions"

interface ChamadoFormProps {
  index: number
  onRemove?: () => void
  isEdditing?: boolean
}

const statusColor = (status: keyof typeof ChamadoStatus) => {
  switch (status) {
    case "pending":
      return "yellow.400"

    case "in_progress":
      return "blue.400"

    case "solved":
      return "green.400"

    case "outsourced":
      return "purple.400"

    default:
      return "gray.400"
  }
}

export const ChamadoForm = ({
  index,
  onRemove,
  isEdditing
}: ChamadoFormProps) => {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext<ChamadoPayload>()

  const {
    categorias,
    isLoadingCategories,
    errorCategorias,
    tiposProblemas,
    isLoadingProblems,
    errorProblemas
  } = useDropdownData(watch(`problems.${index}.category_id`))

  const categoriasOptions = useCreateSelectOptions({
    options: getSelectOptions(categorias?.data, "name", "id"),
    isLoading: isLoadingCategories,
    errorMessage: errorCategorias?.message
  })

  const tiposProblemasOptions = useCreateSelectOptions({
    options: getSelectOptions(tiposProblemas?.data, "name", "id"),
    isLoading: isLoadingProblems,
    errorMessage: errorProblemas?.message
  })

  console.log("ERRORS", errors)

  return (
    <Box>
      <Text
        color="GrayText"
        position="relative"
        borderBottom="2px solid"
        borderColor={statusColor(watch(`problems.${index}.request_status`))}
      >
        Chamado {index + 1}
      </Text>

      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={8}
        p={8}
        position="relative"
        bg="white"
        boxShadow="medium"
      >
        {!isEdditing && onRemove && (
          <DeleteButton
            zIndex={10}
            top={1}
            right={1}
            position="absolute"
            onClick={onRemove}
            label="Chamado"
            aria-label="Apagar Chamado"
            variant="ghost"
          />
        )}

        <FormControl
          isInvalid={Boolean(errors?.problems?.[index]?.request_status)}
        >
          <FormLabel>Status</FormLabel>
          <Select
            {...register(`problems.${index}.request_status` as const, {
              required: "Campo obrigatório"
            })}
          >
            {Object.entries(ChamadoStatus).map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors?.problems?.[index]?.request_status?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors?.problems?.[index]?.priority)}>
          <FormLabel>Prioridade</FormLabel>
          <Select
            {...register(`problems.${index}.priority` as const, {
              required: "Campo obrigatório"
            })}
          >
            {Object.entries(ChamadoPriority).map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors?.problems?.[index]?.priority?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={Boolean(errors?.problems?.[index]?.category_id)}
        >
          <FormLabel>Categoria do Problema</FormLabel>
          <Select
            defaultValue=""
            {...register(`problems.${index}.category_id` as const, {
              required: "Campo obrigatório"
            })}
          >
            <option disabled value="">
              Selecione uma categoria
            </option>
            {categoriasOptions}
          </Select>
          <FormErrorMessage>
            {errors?.problems?.[index]?.category_id?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors?.problems?.[index]?.problem_id)}>
          <FormLabel>Tipo de Problema</FormLabel>
          <Select
            defaultValue=""
            {...register(`problems.${index}.problem_id` as const, {
              required: "Campo obrigatório"
            })}
            disabled={!watch(`problems.${index}.category_id`)}
          >
            <option disabled value="">
              Selecione um tipo de problema
            </option>
            {tiposProblemasOptions}
          </Select>
          <FormErrorMessage>
            {errors?.problems?.[index]?.problem_id?.message}
          </FormErrorMessage>
        </FormControl>
      </Grid>
    </Box>
  )
}
