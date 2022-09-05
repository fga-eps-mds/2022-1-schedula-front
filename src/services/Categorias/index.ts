import { Services } from "@services"

const CategoryService = Services.chamados.create("/categoria")

export const getCategories = CategoryService.get

export const getCategoryById = (category_id: number) =>
  CategoryService.get({ params: { category_id } })

export const createCategory = CategoryService.post<CategoryPayload>

export const updateCategory = CategoryService.put<CategoryPayload>

export const deleteCategory = CategoryService.delete
