const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NEXT_PUBLIC_APP_ENV === 'local',
});

module.exports = withPWA({
  swcMinify: true,
  reactStrictMode: false,
  images: {
    domains: ['www.buymeacoffee.com', 'lh3.googleusercontent.com', 'www.paypalobjects.com'],
  },
});
