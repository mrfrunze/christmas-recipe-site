import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.example.com", // byt till ditt riktiga REST API senare
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
