const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    blockList: [
      // Gradle plugin build output; Metro ENOENT when reading these
      /node_modules[\\/]@react-native[\\/]gradle-plugin[\\/]bin[\\/].*/,
    ],
    unstable_enablePackageExports: true,
    unstable_conditionNames: ['react-native', 'browser', 'require', 'import'],
    unstable_conditionsByPlatform: {
      android: ['react-native'],
      ios: ['react-native'],
    },
    // Polyfill Node built-ins so axios (and others) work without custom resolveRequest
    extraNodeModules: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
