import { useFormContext } from "react-hook-form"
import { Box, Grid, Text } from "@chakra-ui/react"

import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { ControlledSelect } from "@components/ControlledSelect"
import { useDropdownData } from "@components/Forms/ChamadoForm/useDropdowData"
import {
  ChamadoPriority,
  ChamadoStatus,
  statusColor
} from "@constants/Chamados"
import { getSelectOptions } from "@hooks/useCreateSelectOptions"

interface ChamadoFormProps {
  index: number
  onRemove?: () => void
  isEdditing?: boolean
}

export const ChamadoForm = ({
  index,
  onRemove,
  isEdditing
}: ChamadoFormProps) => {
  const { watch, control } = useFormContext<ChamadoFormValues>()

  const {
    categorias,
    isLoadingCategories,
    errorCategorias,
    tiposProblemas,
    isLoadingProblems,
    errorProblemas
  } = useDropdownData(
    Number(watch(`problems.${index}.category_id` as const)?.value)
  )

  return (
    <Box>
      <Text fontWeight="hairline">{`// Chamado ${index + 1}`}</Text>

      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={8}
        p={8}
        position="relative"
        borderTop="3px solid"
        borderColor={statusColor(
          watch(`problems.${index}.request_status`)?.value
        )}
        bg="whiteAlpha.300"
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

        <ControlledSelect
          control={control}
          name={`problems.${index}.request_status` as const}
          id={`problems.${index}.request_status` as const}
          options={Object.entries(ChamadoStatus).map(([value, label]) => ({
            value,
            label
          }))}
          placeholder="Status"
          label="Status"
          rules={{ required: "Campo obrigatório" }}
        />

        <ControlledSelect
          control={control}
          name={`problems.${index}.priority` as const}
          id={`problems.${index}.priority` as const}
          options={Object.entries(ChamadoPriority).map(([value, label]) => ({
            value,
            label
          }))}
          placeholder="Prioridade"
          label="Prioridade"
          rules={{ required: "Campo obrigatório" }}
        />

        <ControlledSelect
          control={control}
          name={`problems.${index}.category_id` as const}
          id={`problems.${index}.category_id` as const}
          options={getSelectOptions(categorias?.data, "name", "id")}
          isLoading={isLoadingCategories}
          placeholder="Categoria do Problema"
          label="Categoria do Problema"
          rules={{ required: "Campo obrigatório" }}
        />

        <ControlledSelect
          control={control}
          name={`problems.${index}.problem_id` as const}
          id={`problems.${index}.problem_id` as const}
          options={getSelectOptions(tiposProblemas?.data, "name", "id")}
          isLoading={isLoadingProblems}
          placeholder="Tipo de Problema"
          label="Tipo de Problema"
          rules={{ required: "Campo obrigatório" }}
          isDisabled={!watch(`problems.${index}.category_id`)?.value}
        />
      </Grid>
    </Box>
  )
}
