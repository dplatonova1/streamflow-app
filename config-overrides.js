module.exports = function override(config, env) {
  let loaders = config.resolve;
  loaders.fallback = {
    fs: false,
    tls: false,
    net: false,
    http: false,
    https: false,
    zlib: require.resolve("browserify-zlib"),
    stream: require.resolve("stream-browserify"),
    crypto: require.resolve("crypto-browserify"),
    url: false,
  };

  return config;
};
