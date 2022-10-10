$(function () {
  const layer = layui.layer
  const form = layui.form

  loadCateList()

  // 初始化富文本编辑器
  initEditor()

  // 调动接口， 得到 分类列表
  function loadCateList() {
    $.ajax({
      method: 'GET',
      url: 'http://big-event-vue-api-t.itheima.net/my/cate/list',
      headers: {
        Authorization: localStorage.getItem('token') || ''
      },
      success: function (res) {
        if (res.code !== 0) return layer.msg(res.message)
        const htmlStr = template('tpe_cate', res)
        $('[name=cate_id]').html(htmlStr)
        // 通知 layui 重新渲染表单区域的UI结构
        form.render()
      }
    })
  }


  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)


  // 模仿点击，文件上传
  $('#btnSelect').on('click', function () {
    // $('#coverFile').click()
    file.click()   //  打开系统文件选择框
  })

  // 监听 coverFile 的 change 事件，获取用户选择的文件列表
  $('#file').on('change', function (e) {
    // 获取到文件的列表数组
    var files = e.target.files
    // 判断用户是否选择了文件
    if (files.length === 0) {
      return
    }
    // 根据文件，创建对应的 URL 地址
    var newImgURL = URL.createObjectURL(files[0])
    // 为裁剪区域重新设置图片
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })



  let art_save = '已发布'

  // 点击事件  ，点击草稿
  $('#artSave').on('click', function () {
    art_save = '草稿'
  })


  // 调动 ajax 发布文章
  $('#articleInfo').on('submit', function (e) {
    e.preventDefault()


    const fd = new FormData($(this)[0])  // 直接打印时看不出来内容的，用 foreach 遍历可以看到里面的内容



    fd.append('state', art_save)

    // 4. 将封面裁剪过后的图片，输出为一个文件对象
    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        fd.append('cover_img', blob)    // 将文件对象，存储到 fd 中

        $.ajax({
          method: 'POST',
          url: 'http://big-event-vue-api-t.itheima.net/my/article/add',
          data: fd,
          headers: {
            Authorization: localStorage.getItem('token')
          },
          // 注意：如果向服务器提交的是 FormData 格式的数据，
          // 必须添加以下两个配置项
          contentType: false,
          processData: false,
          success: function (res) {
            if (res.code !== 0) {
              return layer.msg('发布文章失败！')
            }
            layer.msg('发布文章成功！')
            // 发布文章成功后，跳转到文章列表页面
            location.href = '../../../article/article_filter.html'
          }

        })

      })




  })











})