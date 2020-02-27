import dotenv from 'dotenv';
dotenv.config();

let APIRoute = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
  ? process.env.REACT_APP_API_ENDPOINT_DEV
  : process.env.REACT_APP_API_ENDPOINT_PROD;

export default APIRoute;