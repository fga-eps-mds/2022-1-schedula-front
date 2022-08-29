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
  } = useRequest<TipoProblema[]>(getProblemTypes(category_id))

  return {
    categorias,
    isLoadingCategories,
    errorCategorias,
    tiposProblemas,
    isLoadingProblems,
    errorProblemas
  }
}
