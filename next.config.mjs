/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:['cdn-icons-png.flaticon.com'],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'agile-marmot-192.convex.cloud'
            },
            {
              protocol: 'https',
              hostname: 'https://agile-marmot-192.convex.cloud/'
            },
            {
              protocol: 'https',
              hostname: 'img.clerk.com'
            },
            {
              protocol: "https",
              hostname: "images.unsplash.com",
            },
            {
              protocol: "https",
              hostname: "utfs.io",
            },
            {
              protocol: "https",
              hostname: "replicate.delivery"
            },
          ]
    },
    env:{
      DATABASE_URL: process.env.DATABASE_URL,
      OPEN_AI_KEY: process.env.OPEN_AI_KEY,
    }
};

export default nextConfig;
