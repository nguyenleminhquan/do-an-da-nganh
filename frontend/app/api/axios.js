import axios from "axios";

export default axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL: 'http://172.17.33.33:5000/'
})
