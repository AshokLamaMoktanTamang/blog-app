export const config = {
  host: process.env.BLOG_SERVICE_HOST || 'localhost',
  port: parseInt(process.env.BLOG_SERVICE_PORT || '3003', 10),
};
