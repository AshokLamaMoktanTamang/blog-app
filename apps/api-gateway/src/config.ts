export const config = {
  userService: {
    host: process.env.USER_SERVICE_HOST || 'localhost',
    port: parseInt(process.env.USER_SERVICE_PORT || '3333', 10),
  },
  blogService: {
    host: process.env.BLOG_SERVICE_HOST || 'localhost',
    port: parseInt(process.env.BLOG_SERVICE_PORT || '3003', 10),
  },
  apiGateway: {
    port: parseInt(process.env.API_GATEWAY_PORT || '3001', 10),
    host: process.env.API_GATEWAY_HOST || 'localhost',
  },
};
