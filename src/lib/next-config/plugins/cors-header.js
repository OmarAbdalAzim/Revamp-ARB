const config = require('../../../temp/config');

/**
 * @param {import('next').NextConfig} nextConfig
 */
const corsHeaderPlugin = (nextConfig = {}) => {
  if (!config.sitecoreApiHost) {
    return nextConfig;
  }
  return Object.assign({}, nextConfig, {
    async headers() {
      const extendHeaders =
        typeof nextConfig.headers === 'function' ? await nextConfig.headers() : [];
      return [
        ...(await extendHeaders),
        {
          source: '/_next/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value:'*'
             // value: config.sitecoreApiHost.replace(/\/$/, ''),
            },
            {
              key:'Access-Control-Allow-Credentials',
              value:'true'
            },
            {
              key:'Access-Control-Allow-Methods',
              value:'GET,DELETE,PATCH,POST,PUT'
            },
            {
              key:'Access-Control-Allow-Headers',
              value:'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
            }        
          ],
        },
        {
          source: '/api/jss/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value:'*'
             // value: config.sitecoreApiHost.replace(/\/$/, ''),
            },
            {
              key:'Access-Control-Allow-Credentials',
              value:'true'
            },
            {
              key:'Access-Control-Allow-Methods',
              value:'GET,DELETE,PATCH,POST,PUT'
            },
            {
              key:'Access-Control-Allow-Headers',
              value:'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
            }        
          ]
        },
      ];
    },
  });
};

module.exports = corsHeaderPlugin;
