import axios from 'axios';

export const axiosZip = axios.create({
  baseURL: process.env.ZIP_CODE_API,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
});