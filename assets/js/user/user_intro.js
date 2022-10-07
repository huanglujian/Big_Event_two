$(function () {
  const layer = layui.layer
  const form = layui.form

  // 定义验证规则 
  form.verify({
    nickname: function (value) {
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return '用户名不能有特殊字符';
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return '用户名首尾不能出现下划线\'_\'';
      }
      if (/^\d+\d+\d$/.test(value)) {
        return '用户名不能全为数字';
      }
    }
  })

  renderinfo()

  // 定义 渲染表单 的函数
  function renderinfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.code !== 0) return layer.msg('res.message')
        form.val("user_info", res.data)
      }
    })
  }

  // 给重置按钮添加点击事件
  $('#btnReset').on('click', function (e) {
    // 取消 重置按钮的 默认行为
    e.preventDefault()
    renderinfo()
  })


  // 给 提交按钮 添加 点击事件
  $('#btnSubmit').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'PUT',
      url: '/my/userinfo',
      data: form.val('user_info'),
      success: function (res) {
        if (res.code !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        window.parent.getUserInfo()     // 使用 function 声明的函数 会加到 window上
      }
    })
  })




})