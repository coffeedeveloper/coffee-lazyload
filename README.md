# coffee-lazyload

一个简易版本的延迟加载图片，无任何依赖，支持ie9及以上版本浏览器。
有以下特性：

- 隔N秒后自动加载下屏图片
- 加载图片后重新计算图片位置

## 接口说明

在使用延迟加载中，请先给予图片默认地址

```html
<img src="/images/gray.png" data-origin="/images/1.png" alt="" />
```

```javascript
Lazyload.init({
  el: '[data-origin]', //需要绑定延迟加载的元素
  attr: 'origin', //获取图片真实地址的data属性名
  autoLoad: true, //是否自动加载下屏图片
  delay: 2000, //自动加载下屏图片的间隔时间
  recalculate: false, //是否动态重新计算图片位置
});
```
