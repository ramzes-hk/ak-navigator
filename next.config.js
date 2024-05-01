/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/Aceship/Arknight-Images/main/**",
      },
    ],
  },
};

module.exports = nextConfig;
