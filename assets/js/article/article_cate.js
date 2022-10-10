$(function () {
  const layer = layui.layer
  const form = layui.form

  loadArticleList()

  // 加载文章列表  函数
  function loadArticleList() {
    $.ajax({
      method: 'GET',
      url: '/my/cate/list',
      success: function (res) {
        if (res.code !== 0) return layer.msg(res.message)
        const { data } = res

        let str = ''
        data.forEach((item, i) => {
          str += `
          <tr>
            <td>${i + 1}</td>
            <td>${item['cate_name']}</td>
            <td>${item['cate_alias']}</td>
            <td>
              <button button type="button" class="layui-btn layui-btn-normal btnEdit" data-id=${item.id}>修改</button>
              <button type="button" class="layui-btn layui-btn-danger btnDel" data-id=${item.id}>删除</button>
            </td>
          </tr>
          `
        })
        // console.log(str)

        // let htmlStr = template('tpe_cate', data)
        // console.log(htmlStr)
        $('tbody').html(str)
      }
    })
  }

  // 点击 添加 按钮 弹出 弹出层
  let index = null
  $('#btnAdd').on('click', function () {
    index = layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: '添加文章分类',
      content: $('#tpe_layer').html()
    })
  })

  // 添加分类 和 修改分类
  let isEdit = false
  $('body').on('submit', '#layerForm', function (e) {
    e.preventDefault()

    if (isEdit) {
      $.ajax({
        method: 'PUT',
        url: '/my/cate/info',
        data: $(this).serialize(),
        success: function (res) {
          if (res.code !== 0) return layer.msg(res.message)
          layer.msg(res.message)
          loadArticleList()
        }
      })
    } else {
      $.ajax({
        method: 'POST',
        url: '/my/cate/add',
        data: $(this).serialize(),
        success: function (res) {
          console.log(res)
          if (res.code !== 0) return layer.msg(res.message)
          layer.msg(res.message)
          loadArticleList()
        }
      })
    }

    isEdit = false
    layer.close(index)

  })


  // 编辑分类
  $('tbody').on('click', '.btnEdit', function () {
    isEdit = true
    index = layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: '修改文章分类',
      content: $('#tpe_layer').html()
    })

    $.ajax({
      method: 'GET',
      url: '/my/cate/info?id=' + $(this).attr('data-id'),
      success: function (res) {
        if (res.code !== 0) return layer.msg(res.message)
        form.val("layerForm", res.data)
      }
    })
  })


  // 删除 分类
  $('tbody').on('click', '.btnDel', function () {
    const result = confirm('确定删除？')
    if (result) {
      $.ajax({
        method: 'DELETE',
        url: '/my/cate/del?id=' + $(this).attr('data-id'),
        success: function (res) {
          if (res.code !== 0) return layer.msg(res.message)
          layer.msg(res.message)
          loadArticleList()
        }
      })
    }
  })

})