import axios from 'axios';

export const testApi = axios.create({
  baseURL: 'https://api.github.com',
});

export const listcategory = axios.create({
  baseURL: 'http://localhost:5000',
});

export const listproblemas = axios.create({
  baseURL: 'http://localhost:5000',
});
// export microservices here...
