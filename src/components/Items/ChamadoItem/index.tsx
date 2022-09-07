import { useMemo } from "react"
import {
  Badge,
  Box,
  HStack,
  Skeleton,
  Spacer,
  Tag,
  Text
} from "@chakra-ui/react"

import { EditButton } from "@components/ActionButtons/EditButton"
import { Item } from "@components/ListItem"
import { CHAMADO_PRIORITY, priorityColorMap } from "@constants/Chamados"
import { useRequest } from "@hooks/useRequest"
import { getCityById } from "@services/Cidades"
import { getWorkstationById } from "@services/Workstation"
import { formatDate } from "@utils/formatDate"

interface ChamadoItemProps {
  chamado: Chamado
  handleEdit: (chamado: Chamado) => void
}

export const ChamadoItem = ({ chamado, handleEdit }: ChamadoItemProps) => {
  const isEvent = useMemo(
    () => chamado?.problems?.some((item) => item?.is_event),
    [chamado?.problems]
  )

  const { data: city, isLoading: isLoadingCity } = useRequest<City>(
    getCityById(chamado?.city_id),
    {
      revalidateIfStale: false
    }
  )

  const { data: workstation, isLoading: isLoadingWorkstation } =
    useRequest<Workstation>(getWorkstationById(chamado?.workstation_id), {
      revalidateIfStale: false
    })

  return (
    <Box>
      <HStack spacing={2}>
        {chamado.problems.map((problem, index) => (
          <Badge
            colorScheme={priorityColorMap(problem.priority)}
            variant={
              {
                low: "outline",
                normal: "outline",
                high: "subtle",
                urgent: "solid"
              }[problem.priority]
            }
            key={index}
          >
            {CHAMADO_PRIORITY[problem.priority]}
          </Badge>
        ))}
        <Spacer />
        {isEvent && (
          <Text>
            Agendado para {formatDate(new Date())} as{" "}
            {formatDate(new Date(), "time")}
          </Text>
        )}
      </HStack>
      <Item<Chamado>
        title={
          <>
            <HStack spacing={6}>
              <Box>
                <Text fontSize="sm" fontWeight="light" color="GrayText">
                  Solicitante
                </Text>
                <Text noOfLines={1}>{chamado?.applicant_name}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="light" color="GrayText">
                  Posto de Trabalho
                </Text>
                <Skeleton isLoaded={!isLoadingWorkstation}>
                  <Text noOfLines={1}>{workstation?.data?.name}</Text>
                </Skeleton>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="light" color="GrayText">
                  Local
                </Text>
                <Skeleton isLoaded={!isLoadingCity}>
                  <Text noOfLines={1}>{city?.data?.name}</Text>
                </Skeleton>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="light" color="GrayText">
                  Atendente
                </Text>
                <Text noOfLines={1}>{chamado?.attendant_name}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="light" color="GrayText">
                  Data / Hora
                </Text>
                <Box textAlign="center" fontWeight="medium">
                  <Text>
                    {formatDate(chamado?.created_at, "date")}{" "}
                    {formatDate(chamado?.created_at, "time")}
                  </Text>
                </Box>
              </Box>
            </HStack>
          </>
        }
        description={
          <Box>
            <HStack gap={4} mt={2} flexWrap="wrap">
              {chamado?.problems.map((problem) => (
                <HStack align="start" spacing={1} key={problem?.problem_id}>
                  <Tag variant="subtle" colorScheme="gray">
                    {problem?.category?.name}
                  </Tag>
                  <Tag variant="subtle" colorScheme="purple">
                    {problem?.problem?.name}
                  </Tag>
                </HStack>
              ))}
            </HStack>
          </Box>
        }
      >
        <Item.Actions item={chamado}>
          <EditButton
            onClick={handleEdit}
            label={isEvent ? "Evento" : "Chamado"}
          />
        </Item.Actions>
      </Item>
    </Box>
  )
}
