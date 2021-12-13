module.exports = {
  devServer: {
    // 网络代理，配置跨域
    proxy: {
      /**
       * 被约定的，需要代理的标识
       * 请求时使用类似 /api/user形式即可，无需指定http地址
       */
      '/api': {
        // 这里后台的地址模拟的;应该填写你们真实的后台接口
        target: 'http://ttapi.research.itcast.cn',
        // 允许跨域
        changOrigin: true,
        /**
         * 重写路径，当我们在浏览器中看到请求的地址为：
         * api/core/getData/userInfo 时
         * 实际上访问的地址是：
         * http://ttapi.research.itcast.cn/core/getData/userInfo,
         * 因为重写了 /api
         */
        pathRewrite: {
          /**
           * 并将以/api开头的链接，其开头的/api替换为空的字符串，
           * 因为我们真正请求的地址是没有带/api，这个重写很重要!!!
           */
          '^/api': ''
        }
      }
    }
  }
}
