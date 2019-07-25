# CSS布局

## 如何居中div？

### 行内元素水平居中

```css
#container {
    text-align: center;
}
```

### 单个 div（块级元素）水平居中

```css
#center {
  width: 200px;
  margin: 0 auto;
}
```

### 多个 div 水平居中

```css
/* 传统方案 */
#container {
    text-align: center;
}
#center {
    display: inline-block;
}

/* flex 布局方案 */
#container {
    justify-content: center;
    display: flex;
}
```

### 绝对定位的 div 居中（已知宽高）

#### 子绝父相 + margin

```css
#center {
  position: absolute;
  width: 300px;
  height: 300px;
  margin: auto; /* 0 auto 水平居中；auto 水平垂直居中 */
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: pink; /* 方便看效果 */
}
```

#### 子绝父相 + 负边距

```css
#center {
  position: absolute;
  width:500px;
  height:300px;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -250px;  /* 外边距为自身宽高的一半 */
  background-color: pink;     /* 方便看效果 */
}
```

#### 当被居中的元素是 inline or inline-block 元素

```css
#container {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
```

### 任意元素（未知宽高）

#### 子绝父相 + translate

```css
#container {
    position: relative;
}

/* 利用transform */
#center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

#### flex（需考虑兼容性）

```css
#container {
  display: flex;
  display: -webkit-flex; /* Safari仍旧需要使用特定的浏览器前缀 */
  align-items: center;    /* 垂直居中 */
  justify-content: center;  /* 水平居中 */
}
#center {
  width: 100px;
  height: 100px;
  background-color: pink;   /* 方便看效果 */
}
```

## 请解释一下CSS3的 Flexbox（弹性盒布局模型）,以及适用场景？

该布局模型的目的是提供一种更加高效的方式来对容器中的条目进行布局、对齐和分配空间。

在传统的布局方式中:

- block 布局是把块在垂直方向从上到下依次排列的；
- inline 布局则是在水平方向来排列。
- flex 弹性盒布局并没有这样内在的方向限制，可以由开发人员自由操作。

适用场景：弹性布局适合于移动前端开发，在 Android 和 iOS 上也完美支持。

参考：http://www.w3cplus.com/css3/flexbox-basics.html

### 如何使用 flex 实现三列等宽布局

父元素 display: flex，子元素 flex: 1

#### 解释

子元素的设置等同于：flex: 1 1 auto

flex的默认值是：0 1 auto

意思是项目默认有剩余空间也不放大（0），但空间不足会缩小（1）

现在改为了值 1 ，就可以放大了，所以三栏可以平分宽度

阅读：[flex设置成1和auto有什么区别](https://segmentfault.com/q/1010000004080910)

### 如何使用 flex 实现下列布局

![flex](https://gitee.com/evestorm/various_resources/raw/master/css/flex-left.png)

> HTML

```html
<div id="container">
  <div class="box box1">1</div>
  <div class="box box2">2</div>
  <div class="box box3">3</div>
  <div class="box box4">4</div>
  <div class="box box5">5</div>
</div>
<p>margin-left: auto</p>
```

> CSS

```css
#container {
  display: flex;
  justify-content: flex-end;
  background-color: lightyellow;
}
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 75px;
  background-color: springgreen;
  border: 1px solid #333;
}
.box5 {
  margin-left: auto;
}
p {
  width: 100%;
  text-align: center;
}
```

摘自：[css flex布局中妙用 margin: auto](https://juejin.im/post/5bde54ce51882516e840a8af)

## 用纯CSS创建一个三角形的原理是什么？

```css
把上、左、右三条边隐藏掉（颜色设为 transparent）
#demo {
    width: 0;
    height: 0;
    border-width: 20px;
    border-style: solid;
    border-color: transparent transparent red transparent;
}
```

## css多列等高如何实现？

### 原理

利用 `padding-bottom|margin-bottom` 正负值相抵； 

设置父容器设置超出隐藏（overflow:hidden），这样子父容器的高度就还是它里面的列没有设定 padding-bottom 时的高度， 当它里面的任一列高度增加了，则父容器的高度被撑到里面最高那列的高度， 其他比这列矮的列则会用它们的 padding-bottom 来补偿这部分高度差。

因为背景是可以用在 padding 占用的空间里的，而且边框也是跟随 padding 变化的，所以就成功的完成了一个障眼法。

### 实现

> HTML

```html
<ul class="Article">
  <li class="js-equalheight">
    <p>
      一家将客户利益置于首位的经纪商，
      为客户提供专业的交易工具一家将客户利益置于首位的经纪商
    </p>
  </li>
  <li class="js-equalheight">
    <p>一家将客户利益置于首位的经纪商，为客户提供专业的交易工具</p>
  </li>
  <li class="js-equalheight">
    <p>一家将客户利益置于首位的经纪商</p>
  </li>
</ul>
```

> CSS

```css
.Article {
  overflow: hidden;
}

.Article > li {
  float: left;
  margin: 0 10px -9999px 0;
  padding-bottom: 9999px;
  background: #4577dc;
  width: 200px;
  color: #fff;
}

.Article > li > p {
  padding: 10px;
}
```

## 有一个高度自适应的 div ，里面有两个 div ，一个高度 100px ，希望另一个填满剩下的高度。

> HTML

```html
<body>
    <div class="outer">
        <div class="A"></div>
        <div class="B"></div>
    </div>
</body>
```

> CSS

### 方案1

```css
.A {
    height: 100px;
    background-color: pink;
}

.B {
    background-color: blue;
    height: calc(100vh - 100px);
}
```

### 方案2

```css
/* 
  利用border-box将padding包含在高度内； 
*/
.outer {
    height: 100%;
    padding: 100px 0 0;
    box-sizing: border-box;
    background-color: pink;
}
/* 
  用负margin值将A子容器顶到页面顶部
*/
.A {
    height: 100px;
    margin: -100px 0 0;
    background: #BBE8F2;
}
/* 
  剩下的高度100%-100px就是B容器所谓的100%高了
*/
.B {
    height: 100%;
    background: #D9C666;
}
```

### 方案3

```css
.outer {
    height: 100%;
    padding: 100px 0 0;
    box-sizing: border-box;
    position: relative;
}
/*
  绝对定
*/
.A {
    height: 100px;
    background: #BBE8F2;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.B {
    height: 100%;
    background: #D9C666;
}
```

### 方案4

```css
.outer {
    height: 100%;
    position: relative;
}

.A {
    height: 100px;
    background: #BBE8F2;
}

.B {
    background: #D9C666;
    width: 100%;
    position: absolute;
    top: 100px;
    left: 0;
    bottom: 0;
}
```

### 方案5

```css
.outer {
    height: 100%;
    background: red;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: row;
}

.A {
    width: 100%;
    height: 100px;
    background: green;
}

.B {
    background: blue;
    flex: 1;
}
```

## rem布局的优缺点

优点：

能维持能整体的布局效果，移动端兼容性好，不用写多个css代码，而且还可以利用@media进行优化。

缺点：

开头要引入一段 js 代码，单位都要改成 rem（ font-size 可以用 px ），计算 rem 比较麻烦(可以引用预处理器，但是增加了编译过程，相对麻烦了点)。PC 和 Mobile 要分开。

参考：

- [用 rem 实现 WebApp 自适应的优劣分析](https://www.cnblogs.com/qieguo/p/5386565.html)
- [CSS3 的字体大小单位\[rem\]到底好在哪？](https://www.zhihu.com/question/21504656)
- [总结个人使用过的移动端布局方法](https://segmentfault.com/a/1190000010211016)

## 慎用 em 的原因

**em会叠加计算。**在这个机制下太容易犯错了，因为你不知道这段`css`指定的字号具体是多少。

> HTML

```html
<span>
    abc
    <span>def</span>
    abc
</span>
```

> CSS

```css
span { font-size: 1.5em; }
```

实际效果：

![abc.png](https://cdn.nlark.com/yuque/0/2019/png/260235/1549344767634-006a0ce5-2c0c-4087-97c3-c8e77933009d.png)

先要搞清楚 `em` 的计算原理，它是根据**当前元素的字号**按比例计算的。

外层 `span` 的字号是 `16px`（浏览器默认值），所以 `1.5em` 之后是 `24px` 。由于字号是继承的，导致内层 `span` 的字号继承过来是 `24px` ，再经过 `1.5em` 之后就成了 `36px` 。

所以，就算要用 `em` 的话，尽量不要用在继承属性（`font-size`）上，除非你真的清楚你在做什么！

## 两列布局（左列定宽，右列自适应）

> HTML

```html
<body>
  <div id="left">左列定宽</div>
  <div id="right">右列自适应</div>
</body>
```

### 1. 利用 float + margin

```css
#left {
    background-color: #f00;
    float: left;
    width: 100px;
    height: 500px;
}

#right {
    background-color: #0f0;
    height: 500px;
    margin-left: 100px; /*设置间隔，大于等于#left的宽度*/
}

原理：#left左浮动，脱离文档流，#right为了不被#left挡住，
设置margin-left大于等于#left的宽度达到视觉上的两栏布局
```

### 2. 使用 float + overflow（触发bfc）

```css
#left {
    background-color: #f00;
    float: left;
    width: 100px;
    height: 500px;
}

#right {
    background-color: #0f0;
    height: 500px;
    overflow: hidden; /*触发bfc达到自适应*/
}

原理：#left左浮动，#right触发bfc达到自适应
```

### 3. 使用 table 实现

```css
#parent {
    width: 100%;
    display: table;
    height: 500px;
}

#left {
    width: 100px;
    background-color: #f00;
}

#right {
    background-color: #0f0;
}
/*利用单元格自动分配宽度*/
#left, #right {
    display: table-cell;
}
```

### 4. 使用 position 实现

```css
#parent{
    position: relative;
}  /*父相*/

#left {
    position: absolute;  /*子绝*/
    top: 0;
    left: 0;
    background-color: #f00;
    width: 100px;
    height: 500px;
}

#right {
    position: absolute;  /*子绝*/
    top: 0;
    left: 100px;  /*值大于等于#left的宽度*/
    right: 0;
    background-color: #0f0;
    height: 500px;
}
```

### 5. 使用 flex 实现

```css
#parent {
    width: 100%;
    height: 500px;
    display: flex;
}

#left {
    width: 100px;
    background-color: #f00;
}

#right {
    flex: 1; /*均分了父元素剩余空间*/
    background-color: #0f0;
}
```

## 两列布局（一列不定宽，一列自适应）

### 1. float + overflow

```css
#left {
    margin-right: 10px;
    float: left;  /*只设置浮动,不设宽度*/
    height: 500px;
    background-color: #f00;
}

#right {
    overflow: hidden;  /*触发bfc*/
    height: 500px;
    background-color: #0f0;
}

原理：#left不设宽度左浮动，#right触发 bfc 达到自适应
```

### 2. flex 布局

```css
#parent{
    display: flex;
}

#left { /*不设宽度*/
    margin-right: 10px;
    height: 500px;
    background-color: #f00;
}

#right {
    height: 500px;
    background-color: #0f0;
    flex: 1;  /*均分#parent剩余的部分*/
}
```

## 三列布局（左中定宽，右侧自适应）

> HTML

```html
<body>
<div id="parent">
    <div id="left">左列定宽</div>
    <div id="center">中间定宽</div>
    <div id="right">右列自适应</div>
</div>
</body>
```

### 1. float + margin

```css
#parent{
    min-width: 310px;
} /*100+10+200,防止宽度不够,子元素换行*/

#left {
    margin-right: 10px;  /*#left和#center间隔*/
    float: left;
    width: 100px;
    height: 500px;
    background-color: #f00;
}

#center{
    float: left;
    width: 200px;
    height: 500px;
    background-color: #eeff2b;
}

#right {
    margin-left: 320px;  /*等于#left和#center的宽度之和加上间隔,多出来的就是#right和#center的间隔*/
    height: 500px;
    background-color: #0f0;
}
```

### 2. float + overflow

```css
#parent{
    min-width: 320px;
} /*100+10+200+20,防止宽度不够,子元素换行*/

#left {
    margin-right: 10px; /*间隔*/
    float: left;
    width: 100px;
    height: 500px;
    background-color: #f00;
}

#center{
    margin-right: 10px; /*在此定义和#right的间隔*/
    float: left;
    width: 200px;
    height: 500px;
    background-color: #eeff2b;
}

#right {
    overflow: hidden;  /*触发bfc*/
    height: 500px;
    background-color: #0f0;
}
```

### 3. 利用 position

```css
#parent {
    position: relative;
} /*父相*/

#left {
    position: absolute; /*子绝*/
    top: 0;
    left: 0;
    width: 100px;
    height: 500px;
    background-color: #f00;
}

#center {
    position: absolute; /*子绝*/
    left: 100px;        /*对应#left的width值*/
    top: 0;
    width: 200px;
    height: 500px;
    background-color: #eeff2b;
}

#right {
    position: absolute; /*子绝*/
    left: 300px;        /*对应#left和#center的width值之和*/
    top: 0;
    right: 0;
    height: 500px;
    background-color: #0f0;
}
```

### 4. 利用 table

```css
#parent {
    width: 100%;
    height: 520px; /*抵消上下间距10*2的高度影响*/
    margin: -10px 0;  /*抵消上下边间距10的位置影响*/
    display: table;
    /*左右两边间距无法消除,子元素改用padding设置盒子间距就没有这个问题*/
    border-spacing: 10px;  /*关键!!!设置间距*/
}

#left {
    display: table-cell;
    width: 100px;
    background-color: #f00;
}

#center {
    display: table-cell;
    width: 200px;
    background-color: #eeff2b;
}

#right {
    display: table-cell;
    background-color: #0f0;
}
```

### 5. 利用 flex

```css
#parent {
    height: 500px;
    display: flex;
}

#left {
    margin-right: 10px;  /*间距*/
    width: 100px;
    background-color: #f00;
}

#center {
    margin-right: 10px;  /*间距*/
    width: 200px;
    background-color: #eeff2b;
}

#right {
    flex: 1;  /*均分#parent剩余的部分达到自适应*/
    background-color: #0f0;
}
```

## 三列布局（两侧定宽，中间自适应）

### 圣杯布局 [详解](https://blog.csdn.net/konglei1996/article/details/50881391?utm_source=blogxgwz4)

> HTML

```html
<div class="container">
    <div class="center">中间</div>  <!-- 让中间第一，这样浮动的时候它会先占据100%宽 -->
    <div class="left">左边</div>
    <div class="right">右边</div>
</div>
```

> CSS

```css
.container {
  height: 500px;
  min-width: 400px;  /* 左边w*2+右边w */
  padding: 0 100px 0 150px; /* 1. 父容器左右留出固定padding */
  background-color: gray;
}

.left {
  margin-left: -100%; /* 4.1 让被挤到center下方的left左移整个容器的宽度，此时左上角与center重叠 */
  position: relative; /* 4.2 为了让left移到最左边,设置相对定位 */
  left: -150px; /* 4.3 然后相对自己左移自已宽度的单位，使自己移动到最左边 */
  height: 100%;
  float: left;  /* 2.1 左浮动 */
  width: 150px;
  background-color: rgba(233, 233, 0, .2);
}

.center {
  height: 100%;
  width: 100%;  /* 3. 让center占据剩下父容器的100%宽 */
  float: left;  /* 2.1 左浮动 */
  background-color: rgba(165, 12, 23, .4);
}

.right {
  margin-right: -100px; /* 5. 给在第二行的right设置一个负自己宽度的margin-right。让其最右边 */
  height: 100%;
  width: 100px;
  float: left;  /* 2.1 左浮动 */
  background-color: green;
}
```

### 双飞翼布局方法 [详情](http://m.10qianwan.com/web/350789.html)

> HTML

```html
<div class="container">
    <div class="center">
        <div>中间</div>
    </div>
    <div class="left">左边</div>
    <div class="right">右边</div>
</div>
```

> CSS

```css
.container {
    width: 100%;  /* 1. 整个容器宽100%自适应 */
    height: 500px;
    background-color: gray;
}

.left {
    width: 100px; /* 3.1 设置定宽 */
    margin-left: -100%; /* 5. 左移容器宽度100%个单位，就把自己排在了center前面 */
    background-color: rgba(233, 233, 0, .2);
}

.center {
    width: 100%;  /* 4. 中间容器100%，此时会把左右挤到第二行 */
    background-color: rgba(165, 12, 23, .4);
}

.center div {
    margin: 0 150px 0 100px;  
    /* 7. 此时center的左右分别有100和150宽与left，right重叠。所以让center子容器左右margin抵消 */
}

.right {
    width: 150px; /* 3.2 设置定宽 */
    margin-left: -150px;  /* 6. 同样左移自身宽度的单位，让right也回到第一行 */
    background-color: green;
}

.left, .center, .right {
    height: 100%;
    float: left; /*2. 子容器全部左浮动 */
}
```

## 布局的几种方式

1. 伸缩布局 flex
2. 流式布局 百分比
3. 响应式布局 媒体查询（超小屏设备时：流式布局）
    <!- 以上布局共同点：元素只能做到宽度的适配（排除图片）->
4. rem布局 宽度和高度都能做到适配（等比适配）

## 其它

### 实现不使用 border 画出 1px 高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果。

```html
 <div style="height:1px;overflow:hidden;background:red"></div>
```
