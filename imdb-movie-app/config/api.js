import axios from "axios";

const instance = axios.create({
    baseURL: `https://imdb-api.com/en/API`
})

instance.interceptors.response.use((response)=>{
    return response
}, (error)=>{
    return promise.reject(error.message);
});

export default instance;