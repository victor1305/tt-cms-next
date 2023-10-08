/** @type {import('next').NextConfig} */
const nextConfig = {
  async middleware() {
    try {
      return require('./middleware');
    } catch (error) {
      console.error('Error al cargar el middleware:', error);
    }
  },
  // Otras configuraciones de Next.js...
};

module.exports = nextConfig;
