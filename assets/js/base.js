/* 注意： 每次 调用 ajax 的时候  ，会先调用 ajaxPrefilter 函数
在这个函数中， options 是 ajax提供的配置对象 
*/
$.ajaxPrefilter(function (options) {
  console.log(options)
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  /* 这个 options.url 就是 我们在 $.post 中 给的 url ，因为在那边 只给 URL后面的部分，这边再给平完整  */
  options.url = 'http://big-event-vue-api-t.itheima.net' + options.url

  // 统一设置 contentType 值
  options.contentType = 'application/json'

  // 定义 将 key=value字符串 转换 为 JSON字符串 
  const format2Json = (source) => {
    let target = {}
    source.split('&').forEach((el) => {
      let ky = el.split('=')
      target[ky[0]] = ky[1]
    })
    return JSON.stringify(target)
  }
  // 统一将 键值对的字符串 转变为 JOSN对象
  options.data = format2Json(options.data)
})
