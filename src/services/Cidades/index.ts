import { createRequestConfig } from "@services/request"

export const getCities = createRequestConfig({
  url: "/cidades",
  method: "get"
})

export const getCity = (id: number) => ({
  url: `/categoria?category_id=${id}`,
  method: "get"
})

export const createCity = createRequestConfig<ICityPayload>({
  url: "/categoria",
  method: "post"
})

export const updateCity = (id: number) =>
  createRequestConfig<ICityPayload>({
    url: `/categoria/${id}`,
    method: "put"
  })

export const deleteCity = (id: number) => ({
  url: `/categoria/${id}`,
  method: "delete"
})
