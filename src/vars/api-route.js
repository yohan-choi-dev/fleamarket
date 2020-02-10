let APIRoute = (!process.env.NODE_ENV || process.env.NODE_ENV == 'development')
  ? process.env.API_URL_DEV
  : process.env.API_URL_PROD;

export default APIRoute;