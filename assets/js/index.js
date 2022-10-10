// 这儿就不要用 $() 给 包起来了，要不然后面用不上里面的函数
  const layer = layui.layer


  getUserInfo()

  // 定义 获取用户的基本信息 的函数
  function getUserInfo() {
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success: function(res) {
       if (res.code !== 0) return layer.msg(res.message)
      //  console.log(res.data);
       renderAvator(res.data)
      }
    })
  } 


  // 定义 渲染头像 函数
  function renderAvator(data) {
    const name = data.nickname || data.username
    $('.welcome').html(name)
    if (!data.user_pic) {
      $('.layui-nav-img').hide()
      $('.text-avatar').html(name[0].toUpperCase()).show()
    }  else {
      $('.text-avatar').hide()
      $('.layui-nav-img').attr('src', data.user_pic).show()
    }
  }


  
