// For backend connection code.
// This file creates one common Axios setup for the whole frontend.

import axios from "axios"; // This imports Axios, which helps React talk to Django using HTTP requests.

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // All backend requests will start from this URL
});

export default api; // This allows us to use this API object in other files.