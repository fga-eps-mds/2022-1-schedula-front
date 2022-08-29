import {
  Modal as ModalContainer,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps as ChakraModalProps
} from "@chakra-ui/react"

export interface ModalProps extends ChakraModalProps {
  title: string
  children: React.ReactNode
}

export const Modal = ({ children, title, ...props }: ModalProps) => {
  return (
    <ModalContainer {...props}>
      <ModalOverlay
        bg="blackAlpha.400"
        backdropFilter="blur(8px) hue-rotate(10deg)"
      />
      <ModalContent p={8}>
        <ModalHeader textAlign="center">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalContainer>
  )
}
