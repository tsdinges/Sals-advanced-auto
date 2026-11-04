import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /**
   * Keep old Wix URLs working so Google rankings and bookmarks
   * survive the switch. Each old page now lives as a section on
   * the home page (or its own route, once built).
   */
  async redirects() {
    return [
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/about-us", destination: "/#about", permanent: true },
      { source: "/contact-us", destination: "/#contact", permanent: true },
      { source: "/vehicles", destination: "/#for-sale", permanent: true },
    ];
  },
};

export default nextConfig;
