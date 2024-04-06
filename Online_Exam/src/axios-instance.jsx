import axios from "axios";

export const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  /* baseURL: 'https://6526a969917d673fd76cbd60.mockapi.io/API/', */
  timeout: 10000,
  headers: {}
});
