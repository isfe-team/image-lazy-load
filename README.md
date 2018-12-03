# image-lazy-load

A simple lazy loading library for images.

## Author

@hxli8 @bqliu

## Introduction

When there're lots of pictures in a web page, in order to reduce the occupation of network resources, we shouldn't load all pictures at one time. The image-lazy-load library is used to solve this problem.

## Think

To save network resources and speed up loading duration, We don't load images until they are visible in a web page. Of course, we can optimize the loading process by using a short delay. For example, when we use a high speed to scroll page, maybe the previous resource is not necessary.

Also, this library is suitable for the case where there are multiple modules loading the image. Scrolling in their respective areas will only affect their own region.

## Implementation

Set the picture path that needs to be used in `data-src`, and set a basic picture in the src attribute of the picture, Such as a base64 format image. When scrolling, the visual height is calculated and if the pictures are visible, the image path in the `data-src` is assigned to `src` attribute. So the browser will load this.

## Usage

```javascript
scrollLoadPic(
    contaniner, // 要加载图片所在的容器，不填时默认Body
    { 
        preLoadHeight: 0, // preLoadHeight: 预加载的高度
        delay: 1000 // delay: 延迟加载的时间
    }
)
```



## 含义及目的

实现图片懒加载是指图片不在一开始就全部加载完成，而在进入到可视区域内才开始加载，这样可以提升网页性能，提升用户体验，同时减少服务器压力

## 实现思路

### 计算可视区域图片

法一、滚动时计算可视区域,首先在构造函数里设置一些初始值，并且手动触发一次滚动事件用来加载刚打开页面时的图片，代码实现如下

 <pre><code>
    constructor ({ preloadHeight = 0, delay = 0 } = { }, container = document ) {
      this.container = container
      this.option = { preloadHeight, delay }
      // maintain standalone timer
      this.timer = null
      // bind this
      this.containerScrollHandler = this._onScroll.bind(this)
      // and call it at first
      this.containerScrollHandler()
    }
  </code></pre>

当滚动时，设置定时器，若在用户设置的延迟时间内没有进行滚动，此时开始计算可视区域内的元素

  <pre><code>
    _onScroll () {
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        // 计算可视区域图片，并加载
        this._loadImagesCore()
      }, this.option.delay)
    }
  </code></pre>

计算可视区域，获取要加载的所有图片，然后获取屏幕的可视区域高度a，元素距离顶部的高度b，滚动高度c以及用户设置的预先向下加载的高度d,当 b – c < a + d 时。证明该元素位于可视区域

  <pre><code>
    _loadImagesCore () {
      const images = this.container.querySelectorAll('img')
      // 获取元素滚动的高度
      // container.nodeType 为9，说明此节点是 document
      const containerScrollTop = this.container.nodeType === 9
                              ? document.documentElement.scrollTop
                              : this.container.scrollTop
      // 获取屏幕可视区域高度
      const containerHeight = this.container.nodeType === 9
                            ? document.documentElement.clientHeight
                            : this.container.offsetHeight
      const viewTop = image.offsetTop - containerScrollTop
      if (viewTop  < containerHeight + this.option.preloadHeight) {
        // 加载图片
      }
  </code></pre>

法二、intersectionObserver 内部已经计算过可视区域了，只需使用它的intersectionRatio这个api来判断是否在可视区域内即可

  <pre><code>
    // 使用intersectionObserver实现图片懒加载
    var observer = new IntersectionObserver(function (elements) {
      elements.forEach(function(element) {
        // 目标元素在刚进入到离开之前加载元素
        if (element.intersectionRatio > 0 && element.intersectionRatio <= 1) {
          if (element.target.dataset.src) {
            element.target.src = element.target.dataset.src
          }
        }
      })
    })
    function addObserver() {
      // 获取要进行懒加载的所有图片
      var imgItems = document.querySelectorAll('img')
      imgItems.forEach(function(item) {
        // 开始观察
        observer.observe(item)
      })
    }
    addObserver()
 </code></pre>

### 加载图片

若图片的data-src属性存在，并且没有被加载过，将data-src里面的值赋值给src属性，此时图片开始加载

  <pre><code>
    const rawSrc = element.dataset['src']
    if (rawSrc) {
      element.src = rawSrc
      element.dataset['__loaded'] = true
    }
  </code></pre>

## 使用

#### 用户使用的时候传入三个参数（可选）

1. preloadHeight： 预先向下加载的高度，不传默认0
2. delay: 延迟加载的时间，当图片进入可视区域内延迟多久加载，不传默认0
3. container: 装有懒加载图片的容器，不传默认document

#### 要进行懒加载的图片src不设置，或者给一个正在加载的状态图片， 将真正的图片地址放入data-src里面

