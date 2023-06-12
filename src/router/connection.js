import axios from 'axios';
const token='eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.7xGXdq5PJHMYyvqCCV0hwA2lCCde9LrUZkyFTX2Bc0s';
const connection = axios.create({
  baseURL: 'http://192.168.56.1:3000/api/v1',
  headers:{'Authorization':`Bearer ${token}`}
});

export default connection;