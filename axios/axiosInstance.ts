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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkODU1YTRhLTY2MDAtNDg5NC1iZDM3LTI0ZWQ4MGE3Mjk0YSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJQaG9uZU51bWJlciI6IjExMTExMTExMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyODY2MzMwMywiZXhwIjoxNzYwMTk5MzAzfQ.D9JAey0n24yamU8SMRrMYvoai8rs9DngXm2Hv4ZGl-E';
    // }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export { instance };
