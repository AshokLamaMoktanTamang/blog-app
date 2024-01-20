export const config = {
  host: process.env.USER_SERVICE_HOST || 'localhost',
  port: parseInt(process.env.USER_SERVICE_PORT || '3333', 10),
  dbUri: process.env.USER_SERVICE_DB_URI,
  secretKey: process.env.JWT_SECRET_KEY
};
