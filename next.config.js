const { PHASE_DEVELOPMENT_SERVER, PHASE_TEST } = require("next/constants")

/** @type {import('next').NextConfig} */
const nextConfig = (phase, { defaultConfig }) => ({
  ...defaultConfig,
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    ...(phase !== PHASE_DEVELOPMENT_SERVER &&
      phase !== PHASE_TEST && { removeConsole: true })
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/chamados",
        permanent: false
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: "/eventos",
        destination: "/chamados?is_event=true"
      }
    ]
  }
  //   typescript: {
  //     // !! WARN !!
  //     // Dangerously allow production builds to successfully complete even if
  //     // your project has type errors.
  //     // !! WARN !!
  //     ignoreBuildErrors: true,
  //   },
  //   eslint: {
  //     // Warning: This allows production builds to successfully complete even if
  //     // your project has ESLint errors.
  //     ignoreDuringBuilds: true,
  //   },
})

module.exports = nextConfig
