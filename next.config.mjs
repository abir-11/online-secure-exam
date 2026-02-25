// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    // Allow images from Cloudinary
    domains: ["res.cloudinary.com"],
    // Alternatively, for more control, you can use remotePatterns:
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "res.cloudinary.com",
    //   },
    // ],
  },
};

export default nextConfig;
