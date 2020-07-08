const path = require('path');
const globalLessVariables = path.resolve(__dirname, './global.variables.less');
const resolve = (dir) => path.join(__dirname,dir);
const CompressionPlugin = require('compression-webpack-plugin');
const isDevEnv = process.env.NODE_ENV === 'development';

module.exports = {
    publicPath: isDevEnv? '/' : './',
    filenameHashing: true,
    assetsDir: 'static',
    productionSourceMap: false,
    configureWebpack: config => {
      if(isDevEnv) {
        config.devtool = 'source-map'
      }else{
        config.externals = {
          'vue': 'Vue',
          'vue-router':'VueRouter',
          'vuex': 'Vuex'
        }
        console.log(config);
        return {
          plugins: [new CompressionPlugin({
            test: /\.js$|\.html$|\.css$/,
            threshold: 1024, // 1kb == 1024
            deleteOriginalAssets: false
          })]
        }
      }
    },
    chainWebpack:config =>{
      config.resolve.alias.set('api', resolve('src/api/api-proxy-page.js'))
    },
    css: {
      sourceMap: isDevEnv,
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
            '^/exec.ashx': { // * cur
              target: 'http://tm.lilanz.com/qywx/webbll',
              changeOrigin: true,
            },
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
            }
        }
    }
}