import { Services } from "@services"

const CityService = Services.localidades.create("/city")

export const getCities = CityService.get()

export const getCityById = (city_id: number) =>
  CityService.get({ params: { city_id } })

export const createCity = (payload: CityPayload) =>
  CityService.post({
    data: payload
  })

export const updateCity = (id: number) => (payload: CityPayload) =>
  CityService.put({
    url: CityService.newUrl(`/${id}`),
    data: payload
  })

export const deleteCity = (id: number) =>
  CityService.delete({
    url: CityService.newUrl(`/${id}`)
  })
