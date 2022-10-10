$(function () {
  const layer = layui.layer
  const form = layui.form
  const laypage = layui.laypage

  const q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }

  initTable()
  loadCateList()

  // 调动接口， 得到 分类列表
  function loadCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/cate/list',
      success: function (res) {
        if (res.code !== 0) return layer.msg(res.message)
        const htmlStr = template('tpe_cate', res)
        $('[name=cate_id]').html(htmlStr)
        // 通知 layui 重新渲染表单区域的UI结构
        form.render()
      }
    })
  }

  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)
    const y = padZero(dt.getFullYear())
    const m = padZero(dt.getMonth() + 1)
    const d = padZero(dt.getDate())
    const hh = padZero(dt.getHours())
    const mm = padZero(dt.getMinutes())
    const ss = padZero(dt.getSeconds())
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
  const padZero = function (d) {
    return d > 9 ? d : '0' + d
  }


  // 调动接口，渲染 表格
  function initTable() {
    $.ajax({
      method: 'GET',
      url: `/my/article/list?pagenum=${q.pagenum}&pagesize=${q.pagesize}&cate_id=${q.cate_id}&state=${q.state}`,
      success: function (res) {

        if (res.code !== 0) return layer.msg(res.message)
        const htmlStr = template('tpe_filter', res)
        $('tbody').html(htmlStr)
        renderPage(res.total)
      }
    })
  }


  // 调动接口， 得到 分类列表
  function loadCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/cate/list',
      success: function (res) {
        if (res.code !== 0) return layer.msg(res.message)
        const htmlStr = template('tpe_cate', res)
        $('[name=cate_id]').html(htmlStr)
        // 通知 layui 重新渲染表单区域的UI结构
        form.render()
      }
    })
  }

  // 提交筛选， 刷新渲染表格
  $('#filterForm').on('submit', function (e) {
    e.preventDefault()
    q.cate_id = $('[name=cate_id]').val()
    q.state = $('[name=state]').val()
    initTable()
  })

  let page = ''
  // 渲染分页的函数
  function renderPage(total) {
    laypage.render({
      elem: 'laypage', //注意，这里的 是 ID，不用加 # 号 
      count: total,    //数据总数，从服务端得到
      limit: q.pagesize,    // 每页显示几条数据
      curr: q.pagenum,      // 设置默认被选中的分页
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [2, 3, 4, 5],
      /* 触发 jump回调 的 俩种方法
      1. 分页发生切换的时候，会触发 jump函数
      2. 初次渲染页面会调用
      */
      jump: function (obj, first) {
        // console.log(obj.curr, obj.pages, q.pagenum, first)
        if (obj.pages < page) {
          first = undefined
        }


        q.pagenum = obj.curr   // obj返回的是 分页栏的各类数据
        q.pagesize = obj.limit

        if (!first) initTable()   // 当 切栏的时候触发的first 是 undefined ，否则为 true

        page = obj.pages
      }
    })
  }


  // 点击删除 ，删除 文章
  $('body').on('click', '#btnDelete', function () {
    $.ajax({
      method: 'DELETE',
      url: '/my/article/info?id=' + $(this).attr('data-id'),
      success: function (res) {
        if (res.code !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        initTable()
      }
    })
  })



})

