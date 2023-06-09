import axios from "axios";

const server = axios.create({
    baseURL: "http://172.20.10.3:8080/",
    responseType: "json",
    withCredentials: true,
});

server.interceptors.response.use((response) =>{
    return response;
}, (error) =>{
    return Promise.reject(error.message);
})

export default server;