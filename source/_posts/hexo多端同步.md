---
title: hexo多端同步
tags:
  - hexo
  - gitee
abbrlink: adc93921
article_type: 0
date: 2020-05-17 15:10:23
---
## <br>1.github创建hexo分支
创建hexo分支并设置为默认
![](https://i.loli.net/2020/06/09/wGNiuYf8cVRA7Ep.png)
<!-- more -->
![](https://i.loli.net/2020/06/09/EFgBxW6qnHfI8QP.png)


## <h2 id="2">2.备份本地blog到github的hexo分支上</h2>
进本地blog文件夹
初始化本地仓库：`git init`
添加本地所以文件到仓库：`git add .`
添加commit：`git commit -m "修改文件描述"`
添加本地仓库分支：`git branch hexo`
添加远程仓库：`git remote add origin git@github.com:yourname/yourname.github.io.git`
> 远程仓库查看命令：`git remote`
> 远程仓库删除命令：`git remote rm hexo`
添加本地文件到远程仓库hexo分支：`git push origin hexo -f`

**注：**远程仓库中的 master 分支用于存储 hexo 生成的静态页面，hexo 分支用于存储 hexo 源文件；

**问提点：yilia主题的文件上传为空文件夹，导致博客打开空白？？？**
```
注意这里有个巨大的坑！！！如果你用的是第三方的主题theme，是使用git clone下来的话，要把主题文件夹下面把.git文件夹删除掉，不然主题无法push到远程仓库，导致你发布的博客是一片空白
```
此答案无法解决！！

## 3.在b电脑上，加载hexo分支内容
安装node.js，安装git，创建SSH秘钥(参考[搭建博客记录](http://zsx.pub/2020/05/11/gitee+hexo搭建博客/))
进到要加载的本地目录
克隆远程仓库hexo分支到本地：`git clone -b hexo git@github.com:yourname/yourname.github.io.git`
安装插件`npm install`
hexo git部署`npm install hexo-deployer-git`

可编写博客，生成并部署`hexo clean，hexo g，hexo d`
再同步到分支，执行* [第二步](#2)

## 4.多端同步
在任意终端更新博客前，拉取最新的版本`git pull origin hexo`
更新完后同步hexo分支
```
git add.
git commit -m "描述"
git push origin hexo
```
生成并部署`hexo clean，hexo g，hexo d`

附录：[github帮助中文](https://help.github.com/cn/github/managing-files-in-a-repository/adding-a-file-to-a-repository)


