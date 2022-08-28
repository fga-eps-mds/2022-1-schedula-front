import { createRequestConfig } from "@services/request"

export const getCities = createRequestConfig({
  url: "/city",
  method: "get"
})

export const getCity = (id: number) => ({
  url: `/city?city_id=${id}`,
  method: "get"
})

export const createCity = createRequestConfig<CityPayload>({
  url: "/city",
  method: "post"
})

export const updateCity = (id: number) =>
  createRequestConfig<CityPayload>({
    url: `/city/${id}`,
    method: "put"
  })

export const deleteCity = (id: number) => ({
  url: `/city/${id}`,
  method: "delete"
})
