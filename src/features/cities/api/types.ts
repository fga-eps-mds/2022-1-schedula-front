export interface City {
  id: string;
  name: string;
  state: string;
}

export interface PostCreateCityParams {
  name: string;
  state: string;
}

export interface PostCreateCityResponse {
  id: string;
  name: string;
  state: string;
}

export interface PutUpdateCityParams {
  cityId: string;
  data: {
    name: string;
    state: string;
  };
}

export interface PutUpdateCityResponse {
  id: string;
  name: string;
  state: string;
}

export interface DeleteCityParams {
  cityId: string;
}
