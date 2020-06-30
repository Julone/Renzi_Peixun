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
            require('postcss-pxtorem')({
              // remUnit: 37.5, 这个是postcss-px2rem
              rootValue: 36, // 换算的基数(设计图750的根字体为32)
                        selectorBlackList: [],// 要忽略的选择器并保留为px。
                        propList: ["*"], //可以从px更改为rem的属性。
                        minPixelValue: 1 // 设置要替换的最小像素值。
            })
          ]
        }
      }
    },
    devServer: {
        port: 8080,
        proxy: {
            '^/phq_api': {
                target: 'http://192.168.36.171:9878',
                changeOrigin: true,
                pathRewrite: {
                    '^/phq_api': ''
                }
            },
            '^/api2': {
              target: 'http://192.168.36.125:8080/',
              changeOrigin: true,
              pathRewrite: {
                  '^/api2': ''
              }
            },
            '^/api_test': {
              target: 'http://192.168.35.97:9878',
              changeOrigin: true,
              pathRewrite: {
                  '^/api_test': ''
              }
            },
            '^/exec.ashx': {
              target: 'http://tm.lilanz.com/qywx/webbll/exec.ashx',
              changeOrigin: true,
            },
            
        }
    }
}