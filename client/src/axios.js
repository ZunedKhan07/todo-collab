import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true, // for sending JWT cookie
});

export default axiosInstance;
