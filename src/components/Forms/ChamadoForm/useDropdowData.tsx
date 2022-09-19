import { useRequest } from "@hooks/useRequest"
import { getCategories } from "@services/Categorias"
import { getCities } from "@services/Cidades"
import { getProblemTypes } from "@services/Problemas"
import { getWorkstations } from "@services/Workstation"

export const useDropdownData = (category_id?: number) => {
  const {
    data: cities,
    isLoading: isLoadingCities,
    error: errorCities
  } = useRequest<City[]>(getCities)

  const {
    data: workstations,
    isLoading: isLoadingWorkstations,
    isValidating: isValidatingWorkstations,
    error: errorWorkstations,
    mutate: mutateWorkstations
  } = useRequest<Workstation[]>(getWorkstations())

  const {
    data: categorias,
    isLoading: isLoadingCategories,
    error: errorCategorias
  } = useRequest<Category[]>(getCategories(), {
    revalidateIfStale: false
  })

  const {
    data: tiposProblemas,
    isLoading: isLoadingProblems,
    error: errorProblemas
  } = useRequest<TipoProblema[]>(
    category_id ? getProblemTypes(category_id) : null,
    {
      revalidateIfStale: false
    }
  )

  return {
    categorias,
    isLoadingCategories,
    errorCategorias,
    tiposProblemas,
    isLoadingProblems,
    errorProblemas,
    cities,
    isLoadingCities,
    errorCities,
    workstations,
    isLoadingWorkstations,
    isValidatingWorkstations,
    errorWorkstations,
    mutateWorkstations
  }
}
