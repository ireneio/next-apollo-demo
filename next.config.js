const withTM = require('next-transpile-modules')(['@mui/material', '@mui/system']); // pass the modules you would like to see transpiled
// const withTypescript = require('@zeit/next-typescript')

module.exports = withTM({
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
})

// module.exports = withTypescript({
//   reactStrictMode: true,
//   webpack: (config) => {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//     };
//     return config;
//   },
// })
