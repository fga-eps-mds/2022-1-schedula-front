import axios from 'axios';

export const testApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ?? 'https://api.github.com',
});

export const listcategory = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://0.0.0.0:5000',
});

export const listCity = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BACKEND_URL ??
    'https://jsonplaceholder.typicode.com',
});

export const typeApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BACKEND_URL ??
    'https://jsonplaceholder.typicode.com',
});

export const listproblemas = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5000',
});
// export microservices here...
