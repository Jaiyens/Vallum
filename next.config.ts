import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // The rig scrub's frame sequence. Requested with a ?v= cache key
        // (FRAMES_VERSION in components/future-rig/frames-manifest.ts), so
        // it can be cached for good; a regenerated set ships under a new key.
        source: "/rig/frames/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
