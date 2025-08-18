// config/middlewares.ts
export default [
  'strapi::errors',

  // Security + CSP (helps with images / media / fonts from your Strapi)
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'http://localhost:1337'],
          'img-src': ["'self'", 'data:', 'blob:', 'http://localhost:1337'],
          'media-src': ["'self'", 'data:', 'blob:', 'http://localhost:1337'],
          'font-src': ["'self'", 'data:'],
          // If you load any external CDNs, add them here.
        },
      },
    },
  },

  // CORS – allow your Vite dev servers
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['http://localhost:5173', 'http://localhost:8080'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      credentials: true,
      keepHeaderOnError: true,
    },
  },

  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
