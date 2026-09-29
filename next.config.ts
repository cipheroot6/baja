import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  outputFileTracingIncludes: {
    '/api/model/v2/buggy.glb': ['./cad_models/buggy.glb'],
  },
};

export default nextConfig;
