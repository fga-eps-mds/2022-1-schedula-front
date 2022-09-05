import type { ReactElement } from "react"
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  UseFormStateReturn
} from "react-hook-form"

type RenderInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = ({
  field,
  fieldState,
  formState
}: {
  field: ControllerRenderProps<UserProfile, TName>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<TFieldValues>
}) => ReactElement
