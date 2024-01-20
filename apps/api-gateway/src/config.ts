export const config = {
  userService: {
    host: process.env.USER_SERVICE_HOST || 'localhost',
    port: parseInt(process.env.USER_SERVICE_PORT || '3001', 10),
  },
  blogService: {
    host: process.env.BLOG_SERVICE_HOST || 'localhost',
    port: parseInt(process.env.BLOG_SERVICE_PORT || '3002', 10),
  },
  apiGateway: {
    port: parseInt(process.env.API_GATEWAY_PORT || '4000', 10),
    host: process.env.API_GATEWAY_HOST || 'localhost',
  },
};
