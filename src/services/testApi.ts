import axios from 'axios';

export const testApi = axios.create({
  baseURL: 'https://api.github.com',
});

export const listcategory = axios.create({
  baseURL: 'http://localhost:3000',
});

// export microservices here...
