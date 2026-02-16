module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@types': './src/types',
          '@context': './src/context',
          '@api': './src/api',
          '@screens': './src/screens',
        },
      },
    ],
  ],
};
