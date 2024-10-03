import axios from "axios";

export const axiosAuth = axios.create({
  baseURL: "http://192.168.2.29:3999",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
