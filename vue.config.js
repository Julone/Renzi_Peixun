const path = require('path');
const globalLessVariables = path.resolve(__dirname, './global.variables.less');

module.exports = {
    publicPath: './',
    filenameHashing: true,
    assetsDir: 'static',
    productionSourceMap: false,
    configureWebpack: config => {
        process.env.NODE_ENV === 'development' && (config.devtool = 'source-map');
    },
    css: {
      loaderOptions: {
        less: {
          modifyVars: {
            hack: `true; @import "${globalLessVariables}";`
          },
        },
        postcss: {
          plugins: [
            require('postcss-px2rem')({
              remUnit: 42,
            })
          ]
        }
      }
    },
    devServer: {
        port: 8080,
        proxy: {
            '^/api': {
                target: 'http://tm.lilanz.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}