const layer = layui.layer
const form = layui.form

// 定义 验证 规则
form.verify({
  samePwd: function (value) {
    if (value == $('[name=old_pwd]').val()) {
      return '新旧密码不能一样';
    }
  },
  rePwd: function (value) {
    if (value !== $('[name=new_pwd]').val()) {
      return '密码不一致';
    }
  },
  pass: [
    /^[\S]{6,12}$/
    , '密码必须6到12位，且不能出现空格'
  ]
});



// submit 事件 更新密码
$('.layui-form').on('submit', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'PATCH',
    url: '/my/updatepwd',
    data: $(this).serialize(),
    success: function (res) {
      if (res.code !== 0) return layer.msg(res.message)
      layer.msg(res.message)
      $('.layui-form')[0].reset()    // 使用 reset() 要 将其转换为 DOM元素
    }
  })
})