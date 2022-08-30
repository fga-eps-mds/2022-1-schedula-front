import { Services } from "@services"

const CategoryService = Services.chamados.create("/categoria")

export const getCategories = CategoryService.get()

export const getCategoryById = (category_id: number) =>
  CategoryService.get({ params: { category_id } })

export const createCategory = (payload: CategoryPayload) =>
  CategoryService.post({
    data: payload
  })

export const updateCategory = (id: number) => (payload: CategoryPayload) =>
  CategoryService.put({
    url: CategoryService.newUrl(`/${id}`),
    data: payload
  })

export const deleteCategory = (id: number) =>
  CategoryService.delete({
    url: CategoryService.newUrl(`/${id}`)
  })
