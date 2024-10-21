import axios from 'axios';

const instance = axios.create();
instance.defaults.timeout = 60000;

instance.defaults.baseURL =
  'https://stationary-backend-five.vercel.app/graphql';
// instance.defaults.baseURL = 'http://localhost:5000/graphql';

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    config.headers.Authorization =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRmODhlOWVlLWFjMjItNDMxZi04MzZjLTZiMTg3NTYyZmViNCIsImVtYWlsIjoiYWRtaW5AcmFhZGhhYnMuY29tIiwiUGhvbmVOdW1iZXIiOiIwMDAwMDAwMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyOTUyOTMzMywiZXhwIjoxNzYxMDY1MzMzfQ.tNrFu5Vq89YSK8m49pQMzfZbRk6lVyGWcvNljfQf2jE';
    // }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export { instance };
