const proxy = [
    {
      context: ['/api'],
      target: 'http://localhost/projeto-os-api/public/',
      secure: false,
      logLevel: 'debug',
      pathRewrite: { '^/api':'' }
    }
  ];
  module.exports = proxy;