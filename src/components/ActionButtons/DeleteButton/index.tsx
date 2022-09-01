import { useCallback, useState } from "react"
import { FaTrash } from "react-icons/fa"
import {
  Button,
  Flex,
  Heading,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  Text,
  useDisclosure
} from "@chakra-ui/react"

import { ActionButton, ActionButtonProps } from "@components/ActionButtons"

type DeleteButtonProps<Data> = ActionButtonProps<Data>

const tooltipStyle = {
  bg: "red.500",
  color: "white"
}

export const DeleteButton = <Data,>({
  label,
  onClick,
  ...props
}: DeleteButtonProps<Data>) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = useCallback(async () => {
    setIsLoading(true)
    await (onClick as () => void)?.()
    onClose?.()
    setIsLoading(false)
  }, [onClose, onClick])

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="auto">
      <PopoverAnchor>
        <ActionButton
          label={`Excluir ${label}`}
          icon={<FaTrash />}
          onClick={onOpen}
          isLoading={isLoading}
          color="red.500"
          tooltipProps={tooltipStyle}
          tabIndex={1}
          {...props}
        />
      </PopoverAnchor>
      <PopoverContent
        data-testid="delete-confirmation-popover"
        border={0}
        borderRadius="base"
        bg="blackAlpha.600"
        backdropFilter="blur(8px)"
        color="white"
      >
        <PopoverArrow />
        <PopoverCloseButton color="white" top={2} right={2} />

        <PopoverHeader bg="blackAlpha.600" borderTopRadius="base" border={0}>
          <Heading size="md" color="white" fontWeight="semibold">
            Excluir {label}
          </Heading>
        </PopoverHeader>

        <PopoverBody bg="blackAlpha.300">
          <Text>
            Você realmente deseja excluir <strong>{label}</strong>?
          </Text>
          <Text fontStyle="italic" mt={1}>
            Está ação não poderá ser desfeita.
          </Text>
        </PopoverBody>

        <PopoverFooter borderBottomRadius="base" border={0} bg="blackAlpha.300">
          <Flex justifyContent="space-between">
            <Button onClick={onClose} variant="solid" colorScheme="blackAlpha">
              Cancelar
            </Button>
            <Button onClick={handleDelete} colorScheme="red" variant="solid">
              Excluir
            </Button>
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
