/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/exosome-site",
  assetPrefix: "/exosome-site/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
