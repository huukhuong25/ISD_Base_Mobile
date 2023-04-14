module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      'module-resolver',
      {
        root: ['src'],
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
          src: './src',
        },
      },
    ],
  ],
};
