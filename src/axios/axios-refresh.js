import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://securetoken.googleapis.com/v1'
});

export default instance;
