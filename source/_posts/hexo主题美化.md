---
title: hexo主题美化
tags:
  - hexo
  - yilia
abbrlink: d5b19752
date: 2020-05-21 14:34:43
toc:
article_type: 0
---
        
1.添加浏览统计
---
**引入不算子统计**
修改yilia\_config.yml
<!-- more -->
```
#开启不算子访问统计
busuanzi:
    enable: true
```
在yilia/layout/_partial/after-footer.ej文件末尾添加:
`<script async src="//dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"></script>`
**添加网站访问量统计**
在yilia/layout/_partial/footer.ejs文件`<div class="footer-right"></div>`后面之间放入代码
```
<% if (theme.busuanzi && theme.busuanzi.enable){ %>
        <!-- 不蒜子统计 -->
        <span id="busuanzi_container_site_pv">
                PV:<span id="busuanzi_value_site_pv"></span>
        </span>
        <span class="post-meta-divider">|</span>
        <span id="busuanzi_container_site_uv" style='display:none'>
                Visitor:<span id="busuanzi_value_site_uv"></span>
        </span>
        <script async src="/busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
  <% } %>
```
**添加文章阅读数**
在yilia/layout/_partial/article.ejs文件
`<%- partial('post/title', {class_name: 'article-title'}) %>`后面添加
```
	<!--显示阅读次数-->
	<% if (!index && post.comments){ %>
	  <br/>
	  <a class="cloud-tie-join-count" href="javascript:void(0);" style="color:gray;font-size:14px;">
	  <span class="icon-sort"></span>
	  <span id="busuanzi_container_page_pv" style="color:#ef7522;font-size:14px;">
	    阅读数: <span id="busuanzi_value_page_pv"></span>次 &nbsp;&nbsp;
	  </span>
	  </a>
	<% } %>
	<!--显示阅读次数完毕-->
```
2.添加文字数量，阅读时间
---
安装插件`npm -i -save hexo-wordcount`
修改blog根目录`_config.yml`文件，添加:
```
word_count: true
```
修改themes\yilia\layout\_partial\article.ejs,在大概第七行
`<%- partial('post/date', {class_name: 'archive-article-date', date_format: null}) %>`后面添加:
```
	<!--显示字数-->
	<% if(theme.word_count && !post.no_word_count){%>
          <%- partial('post/word') %>
          <% } %>
	<!--显示字数-->
```
最后在themes\yilia\layout\_partial\post目录下新建`word.ejs`文件,内容如下
```
<div style="margin-top:10px;">
    <span class="post-time">
      <span class="post-meta-item-icon">
        <i class="fa fa-keyboard-o" aria-hidden="true"></i>
        <span class="post-meta-item-text" style="font-size: 16px;color: grey">  字数统计: </span>
        <!--这里样式可以自己定制-->
        <span class="post-count" style="font-size: 16px;color: grey"><%= wordcount(post.content) %>字</span>
      </span>
    </span>

    <span class="post-time">
      &nbsp; | &nbsp;
      <span class="post-meta-item-icon">
        <i class="fa fa-hourglass-half" aria-hidden="true"></i>
        <span class="post-meta-item-text" style="font-size: 16px;color: grey">  阅读时长: </span>
        <span class="post-count" style="font-size: 16px;color: grey"><%= min2read(post.content) %>分</span>
      </span>
    </span>
</div>
```
3.添加百度统计
---
[百度统计](https://tongji.baidu.com/)
修改yilia目录`_config.yml`文件，添加:
![](https://i.loli.net/2020/06/09/FOVXoP9WLjiJKrZ.png)

4.代码复制按钮
---
[下载font-awwsome图标库](http://www.fontawesome.com.cn/)
解压后文件夹重命名为`font-awesome`,放到theme\yilia\source\目录下
找到themes\yilia\layout\_partial\head.ejs，在html的<head>标签里添加：
```
<link rel="stylesheet" href="/font-awesome/css/font-awesome.min.css">
```
在\themes\yilia\source\目录下新建clipboard_use.js
```
$(".highlight").wrap("<div class='code-wrapper' style='position:relative'></div>");
/*页面载入完成后，创建复制按钮*/
!function (e, t, a) {
    /* code */
    var initCopyCode = function () {
        var copyHtml = '';
        copyHtml += '<button class="btn-copy" data-clipboard-snippet="">';
        copyHtml += '  <i class="fa fa-clipboard" aria-hidden="true"></i><span>复制</span>';
        copyHtml += '</button>';
        $(".highlight .code").before(copyHtml);
        var clipboard = new ClipboardJS('.btn-copy', {
            target: function (trigger) {
                return trigger.nextElementSibling;
            }
        });
        clipboard.on('success', function (e) {
            e.trigger.innerHTML = "<i class='fa fa-check' aria-hidden=\"true\"></i><span>复制成功</span>"
            setTimeout(function () {
                e.trigger.innerHTML = "<i class='fa fa-clipboard' aria-hidden=\"true\"></i><span>复制</span>"
            }, 1000)
           
            e.clearSelection();
        });
        clipboard.on('error', function (e) {
            e.trigger.innerHTML = "<i class='fa fa-times aria-hidden=\"true\"'></i><span>复制失败</span>"
            setTimeout(function () {
                e.trigger.innerHTML = "<i class='fa fa-clipboard' aria-hidden=\"true\"></i><span>复制</span>"
            }, 1000)
            e.clearSelection();
        });
    }
    initCopyCode();
}(window, document);
```
在themes\yilia\source\main.0cf68a.css末尾添加：
```
/* 代码复制按钮 */
.btn-copy {
    display: inline-block;
    cursor: pointer;
    background-color: #eee;
    background-image: linear-gradient(#fcfcfc, #eee);
    border: 1px solid #d5d5d5;
    border-radius: 3px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-appearance: none;
    font-size: 13px;
    font-weight: 700;
    line-height: 20px;
    color: #333;
    -webkit-transition: opacity .3s ease-in-out;
    -o-transition: opacity .3s ease-in-out;
    transition: opacity .3s ease-in-out;
    padding: 2px 6px;
    position: absolute;
    right: 5px;
    top: 5px;
    opacity: 0;
}

.btn-copy span {
    margin-left: 5px
}

.code-wrapper:hover .btn-copy {
    opacity: 1;
}
```
找到\themes\yilia\layout\layout.ejs,在</body>前加入：
```
<!-- 代码块复制功能 -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/clipboard@2.0.4/dist/clipboard.js"></script>
<script type="text/javascript" src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<script type="text/javascript" src="/clipboard_use.js"></script>
```

5.添加左边栏主页图标
---
注:需要先引入font-awesome字体库
在\themes\yilia\layout\_partial\left-col.ejs如下代码后边
```
		<nav class="header-menu">
			<ul>
			<% for (var i in theme.menu){ %>
				<li><a href="<%- url_for(theme.menu[i]) %>"><%= i %></a></li>
	        <%}%>
			</ul>
```
添加代码：
```
  <script>
      var menu = document.getElementsByClassName('header-menu')[0];
      var lis = menu.children[0].getElementsByTagName('li');
      var n = lis.length
      var menu_icon = new Array()
      //这个menu_icon用来装图标，图标的类名都是下面“fa fa-xxx”，自行添加就行
      menu_icon[0]="<i class=\"fa fa-home\" aria-hidden=\"true\"></i> "
		menu_icon[1]="<i class=\"fa fa-book\" aria-hidden=\"true\"></i> "
      for (var i = 0; i < n; i++){
        var temp = lis[i].children[0].innerHTML;
        lis[i].children[0].innerHTML = menu_icon[i] + temp;
      }
</script>
```
7.添加背景图片
---
**添加左边栏背景**
修改themes\yilia\source\main.0cf68a.css
添加背景图
```
.left-col{/*background:#fff;*/ background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url('http://qa5rgbn80.bkt.clouddn.com/%E8%83%8C%E6%99%AF.jpg') no-repeat 0% 20%/ cover;width:300px;position:fixed;opacity:1;transition:all .2s ease-in;height:100%;z-index:999}
```
**添加右边栏背景**
修改themes\yilia\source\main.0cf68a.css
背景改为透明,`background:#fff`->`background:rgba(255, 255, 255, 0.5)`
```
.article{margin:30px;position:relative;border:1px solid #ddd;border-top:1px solid #fff;border-bottom:1px solid #fff;/*background:#fff;*/background:rgba(255, 255, 255, 0.5));
```
背景取消颜色,注销`background:#eaeaea`
```
.mid-col{position:absolute;right:0;min-height:100%;/*background:#eaeaea;*/left:300px;width:auto}
```
添加背景图片,`background-color:#fff`->`background:linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url('http://qa5rgbn80.bkt.clouddn.com/%E8%83%8C%E6%99%AF.jpg') no-repeat 0% 0%/ cover`

```
body{margin:0;font-size:14px;font-family:Helvetica Neue,Helvetica,STHeiTi,Arial,sans-serif;line-height:1.5;color:#333;/*background-color:#fff;*/min-height:100%;background:linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url('http://qa5rgbn80.bkt.clouddn.com/%E8%83%8C%E6%99%AF.jpg') no-repeat 0% 0%/ cover;}
```
注销`background:#eaeaea`
```
body{overflow-y:hidden;/*background:#eaeaea*/}
```

8.添加valine评论系统
---
官网：[leancloud](https://leancloud.cn)，注册一个账号，然后创建应用，名字可以随意。然后会生成一个应用，有对应的`APP ID`，`APP KEY`，在`设置>应用key`可以查看。

在themes\yilia\_config.yml大概在#5、Gitment后面添加valine设置，内容如下（注意把里面的APP ID，APP KEY换成自己应用中的信息）
```
#6、Valine https://valine.js.org
valine: 
 appid: 'APP ID'  #Leancloud应用的appId
 appkey: 'APP KEY'  #Leancloud应用的appKey
 verify: false #验证码
 notify: false #评论回复提醒
 avatar: retro #评论列表头像样式：''/mm/identicon/monsterid/wavatar/retro/hide
 #头像类型可见： https://valine.js.org/avatar.html
 placeholder: Just go go #评论框占位符
```

在themes\yilia\layout\_partial\article.ejs中搜索这行代码`<% if (!index && post.comments){ %>`，在其后面添加代码：(这个代码是有响应式的)
```
<% if (theme.valine && theme.valine.appid && theme.valine.appkey){ %>
    <section id="comments" class="comments">
      <style>
        .comments{margin:30px;padding:10px;background:#fff}
        @media screen and (max-width:800px){.comments{margin:auto;padding:10px;background:#fff}}
      </style>
      <%- partial('post/valine', {
        key: post.slug,
        title: post.title,
        url: config.url+url_for(post.path)
        }) %>
  </section>
<% } %>
```

**新建文件**themes\yilia\layout\_partial\post\valine.ejs，内容为：
```
18
<div id="vcomment" class="comment"></div> 
<script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
<script src="//unpkg.com/valine/dist/Valine.min.js"></script>
<script>
   var notify = '<%= theme.valine.notify %>' == true ? true : false;
   var verify = '<%= theme.valine.verify %>' == true ? true : false;
    window.onload = function() {
        new Valine({
            el: '.comment',
            notify: notify,
            verify: verify,
            app_id: "<%= theme.valine.appid %>",
            app_key: "<%= theme.valine.appkey %>",
            placeholder: "<%= theme.valine.placeholder %>",
            avatar:"<%= theme.valine.avatar %>"
        });
    }
</script>
```

9.添加版权声明
---
\themes\yilia\_config.yml,添加代码 :
```
## 版权声明
copyright: 
    copyright_type: 1      # 0:关闭  1，文章md文件有copyright: true则开启 2，全都开启
    licensee_url: https://creativecommons.org/licenses/by-nc-sa/4.0/          # 当前应用的版权协议地址。
    licensee_name: '知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议'      # 版权协议的名称
    licensee_ename: 'CC BY-NC-SA 4.0'                                         # 版权协议的英文名称
    licensee_img: https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png      # 版权协议的Logo
```
\themes\yilia\layout\_partial\post\目录，新建copyright.ejs:
```<!--添加版权声明-->
<%
  var sUrl = url.replace(/index\.html$/, '');
  sUrl = /^(http:|https:)\/\//.test(sUrl) ? sUrl : 'https:' + sUrl;
%>

<!-- #版权基础设定：0-关闭声明； 1-文章对应的md文件里有copyright: true属性，才有版权声明； 2-所有文章均有版权声明 -->
<% if ((theme.copyright.copyright_type === 2 || (theme.copyright.copyright_type === 1 && post.copyright)) && !index){ %>
  <ul class="copyright">
    <li class="copyright_author"><strong>本文作者：</strong>
    <% if(config.author != undefined){ %>
      <%= config.author%>
    <% }else{%>
      <font color="red">请在博客根目录“_config.yml”中填入正确的“author”</font>
    <%}%></li>
    <li class="copyright_article-url">
    <strong>本文链接：</strong>
    <a href="<%= config.url %>/<%= post.path %>" title="<%= post.title %>" target="_blank"><%= config.url %>/<%= post.path %></a>
    </li>
    <li class="copyright_update-time">
        <strong >最后更新：</strong>
        <time datetime="<%- date_xml(post.updated) %>" itemprop="dateUpdated"><%- full_date(post.updated, 'YYYY年MM月DD日 HH:mm:ss') %></time>
    </li>
    <!-- 有需要的可以取消注释 -->
    <!-- <li class="copyright_article-titles"><strong >本文标题：</strong>
    <a href="<%= config.url %>/<%= post.path %>" title="<%= post.title %>" target="_blank"><%= post.title %></a>
    </li>
    <li class="copyright_create-time">
    <strong>发布时间：</strong>
    <%- date(post.date, 'YYYY-MM-DD') %>
    </li> -->
    <li class="copyright_copyright">
    <strong>版权声明：</strong>
    本博客所有文章除特别声明外，均采用
    <a rel="license" href="<%= theme.copyright.licensee_url%>" title="<%= theme.copyright.licensee_name %>"><%= theme.copyright.licensee_ename%></a>
    许可协议进行许可。转载请注明出处！
   </li>
    <!--版权logo如果加载不出来可以注释掉-->
    <!-- <% if(theme.copyright.licensee_img != undefined){ %>
      <li><a rel="license" href="<%= theme.copyright.licensee_url%>"><img alt="知识共享许可协议" style="border-width:0" src="<%= theme.copyright.licensee_img%>"/></a></li>
    <% } %> -->
  </ul>
<% } else {%>
  <ul class="copyright" hidden="hidden"></ul>
<% } %>
<!-- 添加版权声明》 -->
```
themes\yilia\layout\_partial\article.ejs,`<% if ((theme.reward_type === 2 || (theme.reward_type === 1 && post.reward)) && !index){ %>`行上面添加代码：
```
<!-- 版权声明 -->
  <% if(theme.copyright){%>
    <%- partial('post/copyright') %>
  <% } %>
<!-- 声明结束 -->
```
\themes\yilia\source\main.xxxxx.css,在底部添加代码：
```
/* 版权声明 */
.copyright {
	background-color: rgba(162, 223, 247, 0.925);
	margin-top: 2em;
	border-left: 3px solid #03a9f4;
	padding: .5em 1em;
}
ul.copyright li {
    font-size: 19px;
    font-weight: bold;
    line-height: 1.5;
}
/* 版权声明移动端 */
@media screen and (max-width:800px){
	li.copyright_article-url{
		display: none;
	}
  ul.copyright li{
		font-weight: normal;
		font-size: 16px;
	}
}
```
10.添加loading动图
---
\themes\yilia\layout\layout.ejs ,在<div id="container" q-class="show:isCtnShow">的上一行添加：
```
<div id="loader-wrapper">
    <div id="loader"></div>
    <div class="loader-section section-left"></div>
    <div class="loader-section section-right"></div>
    <!-- <div class="load_title">Loading. . .<br></div> -->
</div>
```
themes\yilia\layout\_partial\head.ejs,在<head></head>标签里添加代码：
```
<!-- Js控制Loding特效-->
<script>
  //监听加载状态改变
  document.onreadystatechange = completeLoading;
  
  //加载状态为complete时移除loading效果
  function completeLoading() {
      if (document.readyState == "complete") {
          var loadingMask = document.getElementById('loader-wrapper');
          loadingMask.parentNode.removeChild(loadingMask);
      }
  }  
</script>
<!-- loading结束 -->
```
\themes\yilia\source\main.0cf68a.css,在文件的开头添加代码：
```
/* Loding特效样式 */
.chromeframe {
    margin: 0.2em 0;
    background: #ccc;
    color: #000;
    padding: 0.2em 0;}
#loader-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index:999999;}
#loader {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    border-radius: 50%;
    border: 3px solid transparent;
    /* COLOR 1 */
    border-top-color: pink;
    -webkit-animation: spin 2s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
    -ms-animation: spin 2s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
    -moz-animation: spin 2s linear infinite; /* Chrome, Opera 15+, Safari 5+ */ 
    -o-animation: spin 2s linear infinite; /* Chrome, Opera 15+, Safari 5+ */   
        animation: spin 2s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
    z-index:1001;}
#loader:before {
        content: "";
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        border-radius: 50%;
        border: 3px solid transparent;
        /* COLOR 2 */       
        border-top-color: lightblue;
        -webkit-animation: spin 3s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
        -moz-animation: spin 3s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
        -o-animation: spin 3s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
        -ms-animation: spin 3s linear infinite; /* Chrome, Opera 15+, Safari 5+ */              
        animation: spin 3s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */}
#loader:after {
        content: "";
        position: absolute;
        top: 15px;
        left: 15px;
        right: 15px;
        bottom: 15px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: yellow;
        /* COLOR 3 */       
        -moz-animation: spin 1.5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
        -o-animation: spin 1.5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
        -ms-animation: spin 1.5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */        
        -webkit-animation: spin 1.5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
          animation: spin 1.5s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */}


@-webkit-keyframes spin {
        0%{ 
            -webkit-transform: rotate(0deg);  /* Chrome, Opera 15+, Safari 3.1+ */
            -ms-transform: rotate(0deg);  /* IE 9 */
            transform: rotate(0deg);  /* Firefox 16+, IE 10+, Opera */
        }100%{
            -webkit-transform: rotate(360deg);  /* Chrome, Opera 15+, Safari 3.1+ */
            -ms-transform: rotate(360deg);  /* IE 9 */
            transform: rotate(360deg);  /* Firefox 16+, IE 10+, Opera */}
}

@keyframes spin {
        0%{ 
            -webkit-transform: rotate(0deg);  /* Chrome, Opera 15+, Safari 3.1+ */
            -ms-transform: rotate(0deg);  /* IE 9 */
            transform: rotate(0deg);  /* Firefox 16+, IE 10+, Opera */
        }100%{
            -webkit-transform: rotate(360deg);  /* Chrome, Opera 15+, Safari 3.1+ */
            -ms-transform: rotate(360deg);  /* IE 9 */
            transform: rotate(360deg);  /* Firefox 16+, IE 10+, Opera */}
}


#loader-wrapper .loader-section {
        position: fixed;
        top: 0;
        width: 50%;
        height: 100%;
		background: azure; /* Old browsers */
		opacity: .4;
        z-index: 1000;
        -webkit-transform: translateX(0);  /* Chrome, Opera 15+, Safari 3.1+ */
        -ms-transform: translateX(0);  /* IE 9 */
        transform: translateX(0);  /* Firefox 16+, IE 10+, Opera */}
#loader-wrapper .loader-section.section-left {left: 0;}
#loader-wrapper .loader-section.section-right {right: 0;}

/* Loaded */
.loaded #loader-wrapper .loader-section.section-left {
        -webkit-transform: translateX(-100%);  /* Chrome, Opera 15+, Safari 3.1+ */
            -ms-transform: translateX(-100%);  /* IE 9 */
                transform: translateX(-100%);  /* Firefox 16+, IE 10+, Opera */
        -webkit-transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);  
                transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);}
.loaded #loader-wrapper .loader-section.section-right {
        -webkit-transform: translateX(100%);  /* Chrome, Opera 15+, Safari 3.1+ */
            -ms-transform: translateX(100%);  /* IE 9 */
                transform: translateX(100%);  /* Firefox 16+, IE 10+, Opera */
        -webkit-transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);  
        transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);}
.loaded #loader {
        opacity: 0;
        -webkit-transition: all 0.3s ease-out;  
                transition: all 0.3s ease-out;}
.loaded #loader-wrapper {
        visibility: hidden;
        -webkit-transform: translateY(-100%);  /* Chrome, Opera 15+, Safari 3.1+ */
            -ms-transform: translateY(-100%);  /* IE 9 */
                transform: translateY(-100%);  /* Firefox 16+, IE 10+, Opera */
        -webkit-transition: all 0.3s 1s ease-out;  
                transition: all 0.3s 1s ease-out;}
/* JavaScript Turned Off */
.no-js #loader-wrapper {display: none;}
.no-js h1 {color: #222222;}
#loader-wrapper .load_title {
    font-family:'Open Sans';
    color:navy; font-size:19px; width:100%; text-align:center; z-index:9999999999999; position:absolute; top:60%; opacity:1; line-height:30px; }
#loader-wrapper .load_title span {  font-weight:normal; font-style:italic; font-size:13px; color:navy; opacity:0.5;}
/* loading结束 */
```
11.url优化
---
安装 hexo-abbrlink插件：
`npm install hexo-abbrlink --save`
根目录_config.yml，查找permalink，修改成这样：
```
# permalink: :title/  将之前的注释掉
permalink: articl/:abbrlink.html
abbrlink:
  alg: crc32  # 算法：crc16(default) and crc32
  rep: hex    # 进制：dec(default) and hex
```
url如这样:http://zsx.pub/articl/98113609.html

12.百度搜索收录
---
参考这个吧：https://www.yansheng.xyz/article/c1217b1d.html

13.给博客文章增加类型说明：“原创”或“转载”
---
根目录的_config.yml添加：
```
# 文章类型，在上面word_count: true的前提下可以进行开启
# 文章类型具体在对应的md文件开头的 article_type属性进行定义。原创：article_type:0 ，，转载：article_type:1 :
article_type: true
```
themes\yilia\layout\_partial\post\word.ejs,覆盖为：
```
<div style="margin-top:10px;margin-bottom:-15px;">
    <% if (theme.article_type == true){ %>
      <% if(post.article_type == 0){ %>
        <span class="article-type" style="
          color: white;
          font-size: 14px;
          background: #bf59f3;
          padding: 0 5px 1px 5px;
          margin-right: 5px;
          border-radius: 2px;">原创</span>
      <% } else if (post.article_type == 1){ %>
        <span class="article-type" style="
          color: white;
          font-size: 14px;
          background: #8BC34A;
          padding: 0 5px 1px 5px;
          margin-right: 5px;
          border-radius: 2px;">转载</span>
      <% } %>
    <% } %>
    <span class="post-time">
      <span class="post-meta-item-icon">
        <i class="fa fa-keyboard-o"></i>
        <span class="post-meta-item-text" style="font-size: 15px;color: navy">  字数统计: </span>
        <span class="post-count" style="font-size: 14px;color: navy"><%= wordcount(post.content) %></span>
      </span>
    </span>
    
    <span class="post-time">
      &nbsp; | &nbsp;
      <span class="post-meta-item-icon">
        <i class="fa fa-hourglass-half"></i>
        <span class="post-meta-item-text" style="font-size: 15px;color: navy">  阅读时长: </span>
        <span class="post-count" style="font-size: 14px;color: navy"><%= min2read(post.content) %>分</span>
      </span>
    </span>
</div>
```
根据自己的文章内容，在其对应的md文件里，需要声明为“原创”的开头写上article_type: 0,“转载”则是article_type: 1
修改scaffolds\post.md，添加article_type: 0（会在新生成md文件头固定添加）

14.超链接下滑线
---
修改`main.0cf68a.css`文件:
```
/*chaolianjie*/
a {
	background: transparent;
	text-decoration: none;
	color: #87CEFA
}

.article-entry a{
    display: inline-block;
    position: relative;
    color: #87CEFA;
    font-family: lucida console;
}

.article-entry a:hover{
    color: #d7191a;
    transition:.8s;
}

.article-entry a:hover::after{
  transform: scaleX(1);
  transform-origin: bottom center;
}
.article-entry a::after{
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 1.5px;
  bottom: 0;
  left: 0;
  background-color: #0087ca;
  transform-origin: bottom center;
  transition: transform 0.5s ease-out;
}
```

15.点击烟花效果
---
在`yilia/source`目录下添加`love.js`，内容如下：
```
class Circle {
  constructor({ origin, speed, color, angle, context }) {
    this.origin = origin
    this.position = { ...this.origin }
    this.color = color
    this.speed = speed
    this.angle = angle
    this.context = context
    this.renderCount = 0
  }

  draw() {
    this.context.fillStyle = this.color
    this.context.beginPath()
    this.context.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2)
    this.context.fill()
  }

  move() {
    this.position.x = (Math.sin(this.angle) * this.speed) + this.position.x
    this.position.y = (Math.cos(this.angle) * this.speed) + this.position.y + (this.renderCount * 0.3)
    this.renderCount++
  }
}

class Boom {
  constructor ({ origin, context, circleCount = 16, area }) {
    this.origin = origin
    this.context = context
    this.circleCount = circleCount
    this.area = area
    this.stop = false
    this.circles = []
  }

  randomArray(range) {
    const length = range.length
    const randomIndex = Math.floor(length * Math.random())
    return range[randomIndex]
  }

  randomColor() {
    const range = ['8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    return '#' + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range)
  }

  randomRange(start, end) {
    return (end - start) * Math.random() + start
  }

  init() {
    for(let i = 0; i < this.circleCount; i++) {
      const circle = new Circle({
        context: this.context,
        origin: this.origin,
        color: this.randomColor(),
        angle: this.randomRange(Math.PI - 1, Math.PI + 1),
        speed: this.randomRange(1, 6)
      })
      this.circles.push(circle)
    }
  }

  move() {
    this.circles.forEach((circle, index) => {
      if (circle.position.x > this.area.width || circle.position.y > this.area.height) {
        return this.circles.splice(index, 1)
      }
      circle.move()
    })
    if (this.circles.length == 0) {
      this.stop = true
    }
  }

  draw() {
    this.circles.forEach(circle => circle.draw())
  }
}

class CursorSpecialEffects {
  constructor() {
    this.computerCanvas = document.createElement('canvas')
    this.renderCanvas = document.createElement('canvas')

    this.computerContext = this.computerCanvas.getContext('2d')
    this.renderContext = this.renderCanvas.getContext('2d')

    this.globalWidth = window.innerWidth
    this.globalHeight = window.innerHeight

    this.booms = []
    this.running = false
  }

  handleMouseDown(e) {
    const boom = new Boom({
      origin: { x: e.clientX, y: e.clientY },
      context: this.computerContext,
      area: {
        width: this.globalWidth,
        height: this.globalHeight
      }
    })
    boom.init()
    this.booms.push(boom)
    this.running || this.run()
  }

  handlePageHide() {
    this.booms = []
    this.running = false
  }

  init() {
    const style = this.renderCanvas.style
    style.position = 'fixed'
    style.top = style.left = 0
    style.zIndex = '999999999999999999999999999999999999999999'
    style.pointerEvents = 'none'

    style.width = this.renderCanvas.width = this.computerCanvas.width = this.globalWidth
    style.height = this.renderCanvas.height = this.computerCanvas.height = this.globalHeight

    document.body.append(this.renderCanvas)

    window.addEventListener('mousedown', this.handleMouseDown.bind(this))
    window.addEventListener('pagehide', this.handlePageHide.bind(this))
  }

  run() {
    this.running = true
    if (this.booms.length == 0) {
      return this.running = false
    }

    requestAnimationFrame(this.run.bind(this))

    this.computerContext.clearRect(0, 0, this.globalWidth, this.globalHeight)
    this.renderContext.clearRect(0, 0, this.globalWidth, this.globalHeight)

    this.booms.forEach((boom, index) => {
      if (boom.stop) {
        return this.booms.splice(index, 1)
      }
      boom.move()
      boom.draw()
    })
    this.renderContext.drawImage(this.computerCanvas, 0, 0, this.globalWidth, this.globalHeight)
  }
}

const cursorSpecialEffects = new CursorSpecialEffects()
cursorSpecialEffects.init()
```
修改`footer.ejs`文件，在最后面添加:
```
<!-- 鼠标点击爱心 -->
<script type="text/javascript" src="/love.js"></script>
```
爱心效果代码如下:
```
! function (e, t, a) {
    function n() {
        c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"), o(), r()
    }
    function r() {
        for (var e = 0; e < d.length; e++) d[e].alpha <= 0 ? (t.body.removeChild(d[e].el), d.splice(e, 1)) : (d[e].y--, d[e].scale += .004, d[e].alpha -= .013, d[e].el.style.cssText = "left:" + d[e].x + "px;top:" + d[e].y + "px;opacity:" + d[e].alpha + ";transform:scale(" + d[e].scale + "," + d[e].scale + ") rotate(45deg);background:" + d[e].color + ";z-index:99999");
        requestAnimationFrame(r)
    }
    function o() {
        var t = "function" == typeof e.onclick && e.onclick;
        e.onclick = function (e) {
            t && t(), i(e)
        }
    }
    function i(e) {
        var a = t.createElement("div");
        a.className = "heart", d.push({
            el: a,
            x: e.clientX - 5,
            y: e.clientY - 5,
            scale: 1,
            alpha: 1,
            color: s()
        }), t.body.appendChild(a)
    }
    function c(e) {
        var a = t.createElement("style");
        a.type = "text/css";
        try {
            a.appendChild(t.createTextNode(e))
        } catch (t) {
            a.styleSheet.cssText = e
        }
        t.getElementsByTagName("head")[0].appendChild(a)
    }
    function s() {
        return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
    }
    var d = [];
    e.requestAnimationFrame = function () {
        return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {
            setTimeout(e, 1e3 / 60)
        }
    }(), n()
}(window, document);
```

16.动画效果Scrollr
---
修改`layout.ejs`文件：
```
<script src="https://cdn.bootcss.com/scrollReveal.js/4.0.5/scrollreveal.js"></script>
<script>

<!--
function showArticle(){
	$(".article").each(function(){
		if( $(this).offset().top <= $(window).scrollTop()+$(window).height() && !($(this).hasClass('show')) ) {
			$(this).removeClass("hidden").addClass("show");
			$(this).addClass("is-hiddened");
		} else {
			if(!$(this).hasClass("is-hiddened")) {
				$(this).addClass("hidden");
			}
		}
	})
}
-->

var config = {
 	    reset: true,
            origin: 'left', 
            distance: '30px',
            duration: 1500, 
            delay: 0.5, 
            rotate: { x: 0, y: 200, z: 0 }, 
            container: document.documentElement,
            opacity: 0, 
            scale: 1,

        beforeReveal: function(domEl){
            console.log('动画执行了');
	    
        },
  
        beforeReset: function(domEl){
            console.log('滚轮开始');
	    
        },
   
        afterReveal: function(domEl){
            console.log('动画结束');
	   
        },

        afterReset: function(domEl){
            console.log('滚动结束');
	    
        }
    };
window.sr = ScrollReveal();
sr.reveal('.body-wrap',config);                        
</script>
```

17. 微信分享图片失效
---
文件`yilia\layout\_partial\post\share.ejs`
```
      <img src="<%- 'qrcode' in locals ? qrcode(sUrl) : '//pan.baidu.com/share/qrcode?url=' + sUrl  %>" alt="微信分享二维码">
```
修改为：
```
<img src="<%- 'qrcode' in locals ? qrcode(sUrl) : '//api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + sUrl  %>" alt="微信分享二维码">
```