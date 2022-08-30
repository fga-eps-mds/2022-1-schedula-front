import { Services } from "@services"

const CityService = Services.localidades.create("/city")

export const getCities = CityService.get()

export const getCityById = (city_id: number) =>
  CityService.get({ params: { city_id } })

export const createCity = CityService.post<CityPayload>

export const updateCity = CityService.put<CityPayload>

export const deleteCity = CityService.delete
