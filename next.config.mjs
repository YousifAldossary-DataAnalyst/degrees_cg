/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:['cdn-icons-png.flaticon.com'],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'lovely-flamingo-139.convex.cloud'
            },
            {
              protocol: 'https',
              hostname: 'https://prestigious-opossum-362.convex.cloud'
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
    }
};

export default nextConfig;
