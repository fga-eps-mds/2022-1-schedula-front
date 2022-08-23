import { useCallback } from "react"
import {
  forwardRef,
  IconButton,
  IconButtonProps,
  Tooltip,
  TooltipProps
} from "@chakra-ui/react"

type ActionButtonProps<T> = Omit<IconButtonProps, "onClick"> &
  ActionButton<T> & {
    tooltipProps?: Partial<TooltipProps>
  }

function ActionButtonInner<T>(
  props: ActionButtonProps<T>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { onClick, label, icon, tooltipProps, ...rest } = props

  const handleAction = useCallback(() => (onClick as () => void)?.(), [onClick])

  return (
    <Tooltip
      label={label}
      placement="top"
      bg="gray.100"
      color="black"
      openDelay={250}
      hasArrow
      {...tooltipProps}
    >
      <IconButton
        onClick={handleAction}
        icon={icon}
        variant="solid"
        color="gray.700"
        {...rest}
        ref={ref}
      />
    </Tooltip>
  )
}

export const ActionButton = forwardRef(ActionButtonInner) as <T>(
  props: ActionButtonProps<T> & { ref?: React.ForwardedRef<HTMLButtonElement> }
) => ReturnType<typeof ActionButtonInner>
