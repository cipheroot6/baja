import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["motion/react", "@react-three/drei"],
  },
  outputFileTracingIncludes: {
    '/api/model/buggy.glb': ['./cad_models/**/*'],
  },
};

export default nextConfig;
