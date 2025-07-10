module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@config': './src/config',
          '@screens': './src/screens',
          '@components': './src/components',
          '@app': './src/app',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
