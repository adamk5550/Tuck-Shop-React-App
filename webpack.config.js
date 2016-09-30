module.exports = {
    context: __dirname + "/public",
    entry: "./app.js",
    output: {
        path:  __dirname + "/public/public/js",
        filename: "bundle.js"
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: "uglify"
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)|(bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015']
          }
        }
      ]
    }
};
