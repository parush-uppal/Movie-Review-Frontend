import axios from "axios";

const client = axios.create({ baseURL: "https://cinema-opus.onrender.com/api" });

export default client;
