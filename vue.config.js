module.exports = {
  chainWebpack: config => {
    config.module
      .rule('csv')
      .test(/\.csv$/)
      .use('csv-loader')
      .loader('csv-loader')
      .end();
    // config.module
    //   .rule('json')
    //   .test(/\.json$/)
    //   .use('json-loader')
    //   .loader('json-loader')
    //   .end();
    config.module
      .rule('eslint')
      .test('//')

      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.emitWarning = false;
        return options;
      });
  },
};
