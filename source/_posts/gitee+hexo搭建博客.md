---
title: windows\gitee+hexo 搭建博客记录
tags:
  - hexo
  - gitee
abbrlink: '98113609'
date: 2020-05-11 09:43:23
article_type: 0
---

<br>1.安装node.js
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
![](https://i.loli.net/2020/06/09/mlSsoWugh7KGcB1.png)
备注：图片保持在七牛云
====
更：2020/06/09 七牛云域名30天过期，图片保持到sm.ms
====

5.yilia主题下载
-
`git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia` #下载yilia主题到本地

修改hexo根目录下的 _config.yml 文件 ： theme: yilia
`hexo clean` #清除之前生成的东西
`hexo g`	#生成静态文章
`hexo d`	#部署文章到仓库


# 6.个人域名修改
1.域名购买：阿里云
2.添加解析
`ping 个人博客地址`放回ip地址
![](https://i.loli.net/2020/06/09/x2HluoInm7ew3dv.png)
3.github添加个人域名
![](https://i.loli.net/2020/06/09/NRtfOsC8PBnM9wS.png)

附录
-
博客保存在
blog\source\_posts\123.md
[下载MarkdownPad2](http://markdownpad.com/download/markdownpad2-setup.exe)

注册码：
Soar360@live.com
密钥:
```
<pre>GBPduHjWfJU1mZqcPM3BikjYKF6xKhlKIys3i1MU2eJHqWGImDHzWdD6xhMNLGVpbP2M5SN6bnxn2kSE8qHqNY5QaaRxmO3YSMHxlv2EYpjdwLcPwfeTG7kUdnhKE0vVy4RidP6Y2wZ0q74f47fzsZo45JE2hfQBFi2O9Jldjp1mW8HUpTtLA2a5/sQytXJUQl/QKO0jUQY4pa5CCx20sV1ClOTZtAGngSOJtIOFXK599sBr5aIEFyH0K7H4BoNMiiDMnxt1rD8Vb/ikJdhGMMQr0R4B+L3nWU97eaVPTRKfWGDE8/eAgKzpGwrQQoDh+nzX1xoVQ8NAuH+s4UcSeQ==
```

参考:
[hexo史上最全搭建教程](https://blog.csdn.net/sinat_37781304/article/details/82729029)
[Hexo博客优化之内容编辑](https://blog.csdn.net/nightmare_dimple/article/details/86661474)
[hexo+yilia主题网站进阶教程](https://segmentfault.com/a/1190000020260103?utm_source=tag-newest)
[别人的博客参考](https://www.yansheng.xyz/)