/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    optimizePackageImports: ["recharts", "clsx", "@radix-ui/react-select"],
  },
};

export default nextConfig;
