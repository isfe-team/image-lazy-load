// 加载可视区域图片
// container存在在特定的容器里滚动
function lazyLoadImg (container, preLoadHeight, delayTime) {
  // 首先获取容器内所有的图片
  var imgList1 = document.querySelectorAll('img')
  var imgs = container ? container.querySelectorAll('img') : imgList1
  var scrollTop = container ? container.scrollTop : document.documentElement.scrollTop
  // 获取屏幕高度
  var nodes = document.querySelectorAll('[data-echo-placeholder]');
  var length = nodes.length;
  var screenHeight = container ? container.offsetHeight : document.documentElement.clientHeight
  // 计算每一张图片是否在可视区域内，若在就给图片增加 data-src 属性
  for (var i = 0; i < imgs.length; i++) {
    var viewTop = imgs[i].offsetTop - scrollTop
    if ( viewTop  < screenHeight + preLoadHeight && viewTop > -imgs[i].offsetHeight) {
      if (imgs[i].getAttribute('data-src') !== null) {
        imgs[i].src = imgs[i].getAttribute('data-src')
        imgs[i].setAttribute('data-echo-placeholder', imgs[i].src);
      }
    }
  }
  // 图片加载结束后移除事件
  if (length >= imgs.length) {
    const element = container ? container : document
    element.removeEventListener('scroll', function() { scroll(container, preLoadHeight, delayTime) })
  }
}

var time
var timer
var data

// 给滚动事件增加定时器，当滚动间隔时间少于定时器设置的延迟时间则不加载
function scroll (container, preLoadHeight, delayTime) {
  // 当滚动不同的页面时，time也进行相应切换
  if (container !== data) {
    times = timer
  } else {
    var t = times
    times = time
    time = t
  }
  data = container
  clearTimeout(times)
  times = setTimeout(function () {
    lazyLoadImg(container, preLoadHeight)
  }, delayTime)
  return times
}

// 滚动时加载图片
// 设定的向下多加载的高度
// 设置的所要加载图片的容器
function scrollLoadPic (container = document, { preLoadHeight = 0, delay = 0 } = { }) {
  container.addEventListener(
    'scroll',
    function() { scroll(container, preLoadHeight, delayTime) },
    false
  )
  scroll(container, preLoadHeight, delayTime)
  clearTimeout(time)
}

export default scrollLoadPic
