import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/api/model/buggy.glb': ['./cad_models/**/*'],
  },
};

export default nextConfig;
