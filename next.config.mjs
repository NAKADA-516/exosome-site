/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? "/exosome-site" : "",
  assetPrefix: isProd ? "/exosome-site/" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
