export default {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,

          removeDefs: false,
          removeUselessDefs: false,
          cleanupIds: false,

          removeXlink: false,

          removeHiddenElems: false,
          removeEmptyContainers: false,

          removeUnusedNS: false,
        },
      },
    },
  ],
};
