# spark-template

烽火台app3.0中的静态模板配置

# 安卓rotate后的滚动问题
> 滚动元素的父元素或祖先设置`overflow:hidden`
> 需要滚动的元素设置`overflow-x: auto`,不要写`overflow-y:hidden`
```js
componentDidMount() {
  if(document.getElementById("overlay_layer")) {
    document.getElementById("overlay_layer").style.display = 'none';
  }
}

componentWillUnmount() {
  if(document.getElementById("overlay_layer")) {
    document.getElementById("overlay_layer").style.display = 'block;
  }
}
```