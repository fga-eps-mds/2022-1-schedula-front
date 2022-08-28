import { services } from "@services"

const resourceURL = "/city"

const cidadesService = services.localidades(resourceURL)

export const createCity = (payload: CityPayload) =>
  cidadesService({
    method: "post",
    data: payload
  })

export const getCities = cidadesService()

export const getCity = (id: number) =>
  cidadesService({
    params: {
      city_id: id
    }
  })

export const updateCity = (id: number) => (payload: CityPayload) =>
  cidadesService({
    url: resourceURL + `/${id}`,
    method: "put",
    data: payload
  })

export const deleteCity = (id: number) =>
  cidadesService({
    url: resourceURL + `/${id}`,
    method: "delete"
  })
