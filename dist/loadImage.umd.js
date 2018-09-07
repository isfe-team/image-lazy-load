/*!
 * hxli
 * a simple picture lazy load
 * use methods scrollLoadPic({ preLoadHeight: 0, delay: 2000 }, container)
 * preLoadHeight: 向下多加载的高度,delay: 延迟加载时间,container: 在哪个容器里加载(获取到的dom)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.$$scrollLoadPic = factory());
}(this, (function () { 'use strict';

  // 加载可视区域图片
    // container存在在特定的容器里滚动
    function lazyLoadImg (container, preLoadHeight, delayTime) {
      // 首先获取容器内所有的图片
      var imgList1 = document.querySelectorAll('img');
      var imgs = container ? container.querySelectorAll('img') : imgList1;
      var scrollTop = container ? container.scrollTop : document.documentElement.scrollTop;
      // 获取屏幕高度
      var nodes = document.querySelectorAll('[data-echo-placeholder]');
      var length = nodes.length;
      var screenHeight = container ? container.offsetHeight : document.documentElement.clientHeight;
      // 计算每一张图片是否在可视区域内，若在就给图片增加 data-src 属性
      for (var i = 0; i < imgs.length; i++) {
        var viewTop = imgs[i].offsetTop - scrollTop;
        if ( viewTop  < screenHeight + preLoadHeight && viewTop > -imgs[i].offsetHeight) {
          if (imgs[i].getAttribute('data-src') !== null) {
            imgs[i].src = imgs[i].getAttribute('data-src');
            imgs[i].setAttribute('data-echo-placeholder', imgs[i].src);
          }
        }
      }
      // 图片加载结束后移除事件
      if (length >= imgs.length) {
        var element = container ? container : document;
        element.removeEventListener('scroll', function() { scroll(container, preLoadHeight, delayTime); });
      }
    }
    var time;
    var  timer;
    var  data;

    // 给滚动事件增加定时器，当滚动间隔时间少于定时器设置的延迟时间则不加载
    function scroll (container, preLoadHeight, delayTime) {
      // 当滚动不同的页面时，time也进行相应切换
      if (container !== data) {
        times = timer;
      } else {
        var t = times;
        times = time;
        time = t;
      }
      data = container;
      clearTimeout(times);
      times = setTimeout(function () {
        lazyLoadImg(container, preLoadHeight);
      }, delayTime);
      return times
    }

    // 滚动时加载图片
    function scrollLoadPic (extraInfo, container) {
      if ( container === void 0 ) container = '';

      var extraInfo = extraInfo || { };
      // 设定的向下多加载的高度
      var preLoadHeight = extraInfo.preLoadHeight || 0;
      // 设置的延迟加载时间
      var delayTime = extraInfo.delay || 0;
      // 设置的所要加载图片的容器
      var element = container ? container : document;
      element.addEventListener('scroll', function() { scroll(container, preLoadHeight, delayTime); },  false);
      scroll(container, preLoadHeight, delayTime);
      clearTimeout(time);
    }

  return scrollLoadPic;

})));

//# sourceMappingURL=loadImage.umd.js.map
