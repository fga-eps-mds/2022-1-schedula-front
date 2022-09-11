import { ReactElement, useCallback } from "react"
import { Badge, Flex, HStack, Skeleton, Text, Tooltip } from "@chakra-ui/react"

import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { EditButton } from "@components/ActionButtons/EditButton"
import { Item } from "@components/ListItem"
import { useAuthorization } from "@hooks/useAuthorization"
import { useRequest } from "@hooks/useRequest"
import { getCityById } from "@services/Cidades"
import { request } from "@services/request"
import { deleteWorkstation } from "@services/Workstation"

interface WorkstationItemProps {
  workstation: Workstation
  onEdit: (chamado: Workstation) => void
  onDelete: (
    result: Result<ApiResponse<null>>,
    workstation: Workstation
  ) => void
}

export const WorkstationItem = ({
  workstation,
  onEdit,
  onDelete
}: WorkstationItemProps) => {
  const { isAuthorized: isEditAuthorized } = useAuthorization(["manager"])
  const { isAuthorized: isDeleteAuthorized } = useAuthorization()

  const { data: city, isLoading: isLoadingCity } = useRequest<City>(
    workstation ? getCityById(workstation?.city_id) : null
  )

  const handleDelete = useCallback(
    async ({ id }: Workstation) => {
      const response = await request<null>(deleteWorkstation(id))

      onDelete?.(response, workstation)
    },
    [workstation, onDelete]
  )

  return (
    <Item<Workstation>
      title={
        <Flex>
          {workstation?.name}
          <HStack spacing={2} ml={4}>
            {workstation?.regional && (
              <Badge colorScheme="purple" variant="solid">
                Regional
              </Badge>
            )}
            {
              {
                true: (
                  <Badge colorScheme="cyan" variant="subtle">
                    ADSL_VPN
                  </Badge>
                ),
                false: (
                  <>
                    <Tooltip
                      colorScheme="blackAlpha"
                      label="IP"
                      placement="top"
                      openDelay={350}
                    >
                      <Badge colorScheme="orange" variant="outline">
                        {workstation?.ip}
                      </Badge>
                    </Tooltip>
                    <Badge colorScheme="orange" variant="subtle">
                      {workstation?.link}
                    </Badge>
                  </>
                )
              }[workstation?.adsl_vpn?.toString?.()]
            }
          </HStack>
        </Flex>
      }
      description={
        <Skeleton isLoaded={!isLoadingCity}>
          <Text>{city?.data?.name || "---"}</Text>
        </Skeleton>
      }
    >
      <Item.Actions item={workstation}>
        {
          (isEditAuthorized && (
            <EditButton onClick={onEdit} label={workstation?.name} />
          )) as ReactElement
        }
        {
          (isDeleteAuthorized && (
            <DeleteButton onClick={handleDelete} label={workstation?.name} />
          )) as ReactElement
        }
      </Item.Actions>
    </Item>
  )
}
