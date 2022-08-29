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
          aria-label="Delete"
          label={`Apagar ${label}`}
          icon={<FaTrash />}
          onClick={onOpen}
          isLoading={isLoading}
          color="red.500"
          tooltipProps={tooltipStyle}
          tabIndex={1}
          {...props}
        />
      </PopoverAnchor>
      <PopoverContent data-testid="delete-confirmation-popover">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Heading size="md" fontWeight="light">
            Apagar &apos;{label}&apos;
          </Heading>
        </PopoverHeader>
        <PopoverBody>
          Você realmente deseja excluir <strong>{label}</strong>?
        </PopoverBody>
        <PopoverFooter>
          <Flex justifyContent="space-between">
            <Button onClick={onClose} variant="outline">
              Cancelar
            </Button>
            <Button onClick={handleDelete} colorScheme="red" variant="solid">
              Apagar
            </Button>
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
