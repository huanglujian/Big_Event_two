$(function () {
  // 点击其中一个box中的 a 链接 切换到 另外个 box
  $('.login-reg-box').on('click', 'a', function () {
    $(this).parents('.box').hide().siblings('.box').show()
  })

  // 引入 layui.form 对象
  const form = layui.form
  const layer = layui.layer

  // 使用 form.verify() 定义验证规则
  form.verify({
    // 定义密码验证要求
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    // 定义确定密码验证要求
    repwd: function (value) {
      if (value !== $('.reg-box [name=password]').val()) {
        return '密码不一致'
      }
    }
  })


  // 监听注册表单的提交事件
  $('#regForm').on('submit', function (e) {
    // 阻止默认提交
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reg',
      data: $(this).serialize(),
      success: function (res) {
        if (res.code !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        // 注册完回到登录界面
        $('#toLogin').click()
      }
    })
  })


  // 监听登录表单的提交事件
  $('#loginForm').on('submit', function (e) {
    // 阻止默认提交
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.code !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        // 将 登录成功获取的 token属性的值 保存到 localStorage
        localStorage.setItem('token', res.token)
        // 登录成功转到 index.html
        // location.href = '/index.html'
      }
    })
  })






})