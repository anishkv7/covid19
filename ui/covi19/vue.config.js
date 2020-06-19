module.exports = {
    publicPath: process.env.NODE_ENV === 'production' 
      ? '/'
      : '/',
  
      devServer: {
      proxy: {
        // proxy all requests starting with /api to jsonplaceholder
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true
          
        }
      }
    },
    configureWebpack: {
      devtool: 'source-map'
    }
  }