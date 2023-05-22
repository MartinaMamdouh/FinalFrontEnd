import axios from 'axios';

const connection = axios.create({
  baseURL: 'http://10.0.2.2:3000/api/v1',
});

export default connection;