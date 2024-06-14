/** @type {import('next').NextConfig} */
const nextConfig = {
  async middleware() {
    const { middleware } = await import("./middleware");
    return middleware;
  },
};

export default nextConfig;
