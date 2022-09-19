import { useCallback, useReducer } from "react"

type State<Fields extends readonly string[]> = {
  [key in Fields[number]]: string
}

export enum ACTIONS {
  UPDATE_FIELD = "UPDATE_FIELD"
}

type Action = {
  type: keyof typeof ACTIONS
  payload: any
}

export const reducer = <Fields extends readonly string[]>(
  state: State<Fields>,
  action: Action
): State<Fields> => {
  switch (action.type) {
    case ACTIONS.UPDATE_FIELD: {
      return { ...state, [action.payload.field]: action.payload.value }
    }

    default:
      console.log("Invalid action")

      return state
  }
}

export const useFilters = <Fields extends readonly string[]>(
  fields: Fields
) => {
  const [filters, dispatch] = useReducer(
    reducer,
    fields.reduce((field, v) => ({ ...field, [v]: "" }), {})
  )

  const updateField = useCallback(
    (field: typeof fields[number]) => (value: any) => {
      dispatch({ type: ACTIONS.UPDATE_FIELD, payload: { field, value } })
    },
    []
  )

  return {
    filters: filters as State<Fields>,
    updateField
  }
}
