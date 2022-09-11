import { useCallback, useState } from "react"
import { FaSyncAlt } from "react-icons/fa"

import { ActionButton } from "@components/ActionButtons"

interface RefreshButtonProps {
  refresh: () => Promise<unknown>
}

export const RefreshButton = ({ refresh }: RefreshButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = useCallback(() => {
    setIsLoading(true)
    refresh?.().finally(() => setIsLoading(false))
  }, [refresh])

  return (
    <ActionButton
      icon={<FaSyncAlt />}
      label="Atualizar Dados"
      onClick={handleRefresh}
      isLoading={isLoading}
      variant="outline"
    />
  )
}
