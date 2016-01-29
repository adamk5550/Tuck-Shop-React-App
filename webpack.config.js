module.exports = {
    context: __dirname + "/src",
    entry: "./app.js",
    output: {
        path:  __dirname + "/src/public/js",
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
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015']
          }
        }

      ]
    }
};
