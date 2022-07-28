import axios from 'axios';

export const testApi = axios.create({
  baseURL: 'https://api.github.com',
});

// export microservices here...
