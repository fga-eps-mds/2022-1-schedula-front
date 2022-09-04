import { Text } from "@chakra-ui/react"
import { Props } from "chakra-react-select"

export const handleEmptyOptions: Props["noOptionsMessage"] = (state) => (
  <Text color="gray.300">
    Nenhuma resultado para pesquisa{" "}
    <Text as="span" fontWeight="semibold" color="white" p={0.5} bg="primary">
      {state.inputValue}
    </Text>
  </Text>
)
