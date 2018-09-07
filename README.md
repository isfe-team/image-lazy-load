# image-lazy-load
 A simple lazy loading library for images.

Author

@hxli8

# introduce

When the page has a large number of pictures, in order to reduce the network resources occupied, 
prevent all pictures loaded at one time, so with this image lazy loading library, when the 
picture is located in the visual area to load pictures, in the loading process can be set delay 
time, when the scroll is too fast do not load, stay longer than the delay time. Will continue to
load pictures, This loading library is suitable for the case where there are multiple modules loading the image.
scrolling in their respective areas will only affect the region of the picture load

# thinking

put the picture path that needs to be used in data-src,put a basic picture in the src attribute
of the picture.such base64.img，In the process of scrolling, the visual height is calculated. When the picture is at the visual height, the image path in the data-src is assigned to src, Loading pictures at this time

# use methods
 img src="base"  data-src="use-image"
 
 scrollLoadPic({ preLoadHeight: 0, delay: 1000 }, contaniner) 
   preLoadHeight: 预加载的高度
   delay: 延迟加载的时间
   contaniner: 要加载图片所在的容器，不填时默认Body
