/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.discordapp.com", "localhost"],
  },
  compiler: {
    styledComponents: true,
  },
  i18n,
  env: {
    GRAPHQL_URI: process.env.GRAPHQL_URI,
    API_URI: process.env.API_URI,
    UPLOAD_URI: process.env.UPLOAD_URI,
    IS_LAUNCHED: process.env.IS_LAUNCHED,
  },
  // Support MDX files as pages:
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  // Support loading `.md`, `.mdx`:
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        // The default `babel-loader` used by Next:
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          /** @type {import('@mdx-js/loader').Options} */
          options: {
            /* jsxImportSource: …, otherOptions… */
          },
        },
      ],
    });
    // config.resolve.fallback = { fs: false };

    return config;
  },
};


module.exports = withPWA(nextConfig);
