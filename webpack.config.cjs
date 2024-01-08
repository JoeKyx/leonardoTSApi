const path = require('path')

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/leonardoApi.ts', // Replace with your main entry file
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'leonardoApi.js', // Output file name
    path: path.resolve(__dirname, 'dist'),
    library: 'leonardo-ts', // Expose your library
    libraryTarget: 'umd',
    globalObject: 'this',
  },
}
