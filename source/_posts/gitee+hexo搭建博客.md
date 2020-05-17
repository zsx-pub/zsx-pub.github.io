---
title: windows\gitee+hexo 搭建博客记录
date: 2020-05-11 09:43:23
tags:
     - hexo
     - gitee
---

1.安装node.js
-
[node.js下载](https://nodejs.org/en/download/)
`node -v` #查看node版本
`npm -v`	#查看npm版本
`npm install -g cnpm --registry=http://registry.npm.taobao.org	` #安装淘宝的cnpm 管理器
`cnpm -v`	#查看cnpm版本`
<!-- more -->
2.安装git
-
[git下载](https://npm.taobao.org/mirrors/git-for-windows/)

3.安装hexo
-
`npm install -g hexo-cli` #安装hexo
`hexo -v` #查看hexo版本

`mkdir blog`	#创建blog目录
`cd blog`	#进入blog目录

`hexo init` #生成博客 初始化博客
`hexo s`	#启动本地博客服务
http://localhost:4000/	#本地访问地址

4.gitee
-
注册gitee账号，新建仓库

生成shh添加到gitee：
`git config --global user.name "yourname"`
`git config --global user.email "youremail"`

修改blog\_config.yml
deploy:
  type: git
  repo: https://gitee.com/zsx_pp/blog.git
  branch: master

安装deploy-git ，也就是部署的命令,这样你才能用命令部署到gitee
`npm install hexo-deployer-git --save`(需要输入用户名，密码)

`hexo clean` #清除之前生成的东西
`hexo g`	#生成静态文章
`hexo d`	#部署文章到仓库

**注意：解析错误时**
修改blog\_config.yml
url: http://zsx_pp.gitee.io/blog
root: /blog

更新gitee仓库服务--->Gitee Pages(每次更新博文后都要点击)
![](http://qa5rgbn80.bkt.clouddn.com/gitee%E6%9B%B4%E6%96%B0.PNG)
备注：图片保持在七牛云

5.yilia主题下载
-
`git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia` #下载yilia主题到本地

修改hexo根目录下的 _config.yml 文件 ： theme: yilia
`hexo clean` #清除之前生成的东西
`hexo g`	#生成静态文章
`hexo d`	#部署文章到仓库

6.添加浏览统计
-
**引入不算子统计**
修改yilia\_config.yml
```
#开启不算子访问统计
busuanzi:
    enable: true
```
在yilia/layout/_partial/after-footer.ej文件末尾添加:
`<script async src="//dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"></script>`
**添加网站访问量统计**
在yilia/layout/_partial/footer.ejs末尾</footer>与其上面的</div>之间放入代码
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

7.添加背景图片
-
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

# 8.添加valine评论系统 #
## 8.1注册leancloud #
到官网：[leancloud](https://leancloud.cn)，注册一个账号，然后创建应用，名字可以随意。然后会生成一个应用，有对应的`APP ID`，`APP KEY`，在`设置>应用key`可以查看。
## 8.2yilia主题添加评论设置 ##
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

附录
-
博客保存在
blog\source\_posts\123.md
[下载MarkdownPad2](http://markdownpad.com/download/markdownpad2-setup.exe)

注册码：
Soar360@live.com
密钥<pre>GBPduHjWfJU1mZqcPM3BikjYKF6xKhlKIys3i1MU2eJHqWGImDHzWdD6xhMNLGVpbP2M5SN6bnxn2kSE8qHqNY5QaaRxmO3YSMHxlv2EYpjdwLcPwfeTG7kUdnhKE0vVy4RidP6Y2wZ0q74f47fzsZo45JE2hfQBFi2O9Jldjp1mW8HUpTtLA2a5/sQytXJUQl/QKO0jUQY4pa5CCx20sV1ClOTZtAGngSOJtIOFXK599sBr5aIEFyH0K7H4BoNMiiDMnxt1rD8Vb/ikJdhGMMQr0R4B+L3nWU97eaVPTRKfWGDE8/eAgKzpGwrQQoDh+nzX1xoVQ8NAuH+s4UcSeQ==


参考:
[hexo史上最全搭建教程](https://blog.csdn.net/sinat_37781304/article/details/82729029)
[Hexo博客优化之内容编辑](https://blog.csdn.net/nightmare_dimple/article/details/86661474)
[hexo+yilia主题网站进阶教程](https://segmentfault.com/a/1190000020260103?utm_source=tag-newest)
[别人的博客参考](https://www.yansheng.xyz/)