# 人资 - 培训课堂系统
## 项目描述
### 项目简介：核心功能基于微信浏览器的在线培训学习系统，内部使用。
## 项目结构
>   `/global.darkmode.less` 黑暗CSS模式适配
>   `/global.variables.less` 全局的less变量
## 接口文件
>   `/src/api/api-proxy-page.js` 接口命名规则： 页面_方法名 `(例如home_getCourseList)`
## 全局组件
>   `/src/component/_index.js` 自定义组件

>   `/src/vant.js` vant组件
## 其他杂项
- $eventBus的事件挂载于 App.vue
- `/public/index.html` 可根据环境加载不同的JS
- `/src/utils/storage.js` 主要用法是，   
    ```javascript
    setStorage({ name !: String, type?: 'session'|'local', content!: Object})
    ```
    ```javascript
    getStorage({ name!: String, type?: 'session'|'local'})
    ```
