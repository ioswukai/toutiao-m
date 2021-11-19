/**
 * PostCSS 配置文件
 */
module.exports = {
  // PostCSS中各插件的配置
  plugins: {
    // autoperfixer 插件的配置
    // 作用：生成浏览器CSS样式规则前缀
    // VueCLI 内部已经配置了autoperfixer 插件
    // 这里又配置一次，所以产生冲突了
    // 'autoperfixer': {
    //   // 配置要兼容的环境信息
    //   browsers: ['Android >= 4.0', 'iOS >= 10']
    // },

    // // 配置使用 postcss-pxtorem 插件
    // 'postcss-pxtorem': {
    //   // 转换的基准值，以设计稿为准
    //   // 375: 37.5
    //   // 750: 75
    //   // Vant 组件的样式是以 375 设计稿开发的
    //   // 我们的设计稿
    //   //    375，量多少，写多少
    //   //    750，量出来的尺寸 ÷ 2
    //   rootValue: 37.5,
    //   // 配置要转换的CSS属性，*表示转换所有的属性
    //   propList: ['*']
    'postcss-pxtorem': {
      // 插件处理每个css都会来调用这个函数，
      // 它会把需要处理的css信息传递给rootValue函数
      rootValue ({ file }) {
        // 如果是 Vant 的样式就按照 37.5 处理转换
        // 如果是我们自己的样式就按照 75 处理转换
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],

      // 配置不要转换的样式资源，写文件名就行，不用写后缀
      exclude: 'github-markdown'
    }
  }
}
