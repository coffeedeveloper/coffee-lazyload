# coffee-lazyload

一个简易版本的延迟加载图片，无任何依赖，支持ie9及以上版本浏览器。
暂时不支持`div`的`backgroud`的这种方式的延迟加载。

有以下特性：

- 隔N秒后自动加载下屏图片
- 加载图片后重新计算图片位置

## 接口说明

在使用延迟加载中，请先给予图片默认地址

```html
<img src="/images/gray.png" data-origin="/images/1.png" alt="" />
```

当然你也可以用`base64`来作为占位符

```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
  data-origin="/images/1.png"/>
```

```javascript
Lazyload.init({
  el: '[data-origin]', //需要绑定延迟加载的元素
  attr: 'origin', //获取图片真实地址的data属性名
  autoLoad: true, //是否自动加载下屏图片
  delay: 2000, //自动加载下屏图片的间隔时间
  threshold: 0, //提前多少px预加载图片
  recalculate: false, //是否动态重新计算图片位置
});

//如果后期增加了DOM而需要重新刷新一下插件
Lazyload.refresh();
```
