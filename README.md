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
