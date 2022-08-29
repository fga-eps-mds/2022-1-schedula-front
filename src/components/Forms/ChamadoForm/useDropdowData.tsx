import { useRequest } from "@hooks/useRequest"
import { getProblemCategories } from "@services/Categorias"
import { getProblemTypes } from "@services/Problemas"

export const useDropdownData = (category_id: number) => {
  const {
    data: categorias,
    isLoading: isLoadingCategories,
    error: errorCategorias
  } = useRequest<CategoriaProblema[]>(getProblemCategories)

  const {
    data: tiposProblemas,
    isLoading: isLoadingProblems,
    error: errorProblemas
  } = useRequest<TipoProblema[]>(
    category_id ? getProblemTypes(category_id) : null
  )

  return {
    categorias,
    isLoadingCategories,
    errorCategorias,
    tiposProblemas,
    isLoadingProblems,
    errorProblemas
  }
}
