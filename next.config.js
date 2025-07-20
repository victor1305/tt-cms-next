/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store'
        }
      ]
    }
  ],
  experimental: {
    // Asegura que los módulos se resuelvan correctamente
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '.'
    };
    return config;
  }
};

module.exports = nextConfig;