import axios from 'axios';

export const testApi = axios.create({
  baseURL: 'https://api.github.com',
});

export const listcategory = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const typeApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

// export microservices here...
