import { createRequestConfig } from "@services/request"

export const getCity = createRequestConfig({
  url: "/categoria",
  method: "get"
})
