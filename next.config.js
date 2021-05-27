const webpack = require("webpack");
const dotenv = require("dotenv-webpack");
const path = require("path");
require("dotenv").config();

module.exports = {
  // images: {
  //   // ここ
  // },
  webpack: (config) => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true,
      }),
    ];

    return config;
  },
  env: {
    NEXT_PUBLIC_API_URL: "https://yoko.microcms.io/api/v1/post",
    NEXT_PUBLIC_API_KEY: "46b8e189-659d-4f08-8b82-20f00a2bd5c1",
  },
};
