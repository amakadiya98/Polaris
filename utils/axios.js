import axios from 'axios';
import { baseUrl } from '../config/url';

const Axios = axios.create({
    baseURL: baseUrl
})

export default Axios