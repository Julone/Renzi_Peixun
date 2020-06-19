const path = require('path');
const globalLessVariables = path.resolve(__dirname, './global.variables.less');
function resolve(dir){
  return path.join(__dirname,dir)
}

module.exports = {
    publicPath: './',
    filenameHashing: true,
    assetsDir: 'static',
    productionSourceMap: false,
    configureWebpack: config => {
        process.env.NODE_ENV === 'development' && (config.devtool = 'source-map');
        
        
    },
    chainWebpack:config =>{
          config.resolve.alias
          .set('api', resolve('src/global/api.js'))
          
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
              remUnit: 37.5,
            })
          ]
        }
      }
    },
    devServer: {
        port: 8080,
        proxy: {
            '^/api1': {
                target: 'http://192.168.36.171:8080/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api1': ''
                }
            },
            '^/api2': {
              target: 'http://192.168.36.125:8080/',
              changeOrigin: true,
              pathRewrite: {
                  '^/api2': ''
              }
            }
        }
    }
}