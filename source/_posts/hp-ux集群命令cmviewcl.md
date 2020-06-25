---
title: hp-ux集群命令cmviewcl
article_type: 0
abbrlink: 10d64041
date: 2020-06-16 09:04:24
tags:
  - hp-ux
  - unix
  - cmviewcl
toc:
---

1.HP-UX 集群管理
---
Cluster 集群
Node 节点 集群下的各台计算机
Package 资源组（包括： 共享vg 卷组、浮动IP、锁盘、APP应用）
<!-- more -->
2.双机原理
---
在2个主机节点上分别安装集群软件(如：HP ServiceGuard)，对客户端配置一个浮动IP，浮动意思是该IP地址适时绑定在2个节点中的某一个上，但该IP对客户端是固定的。每个节点配置3块网卡，分别是数据网卡，心跳信号网卡，以及一块对数据和心跳备份的网卡。数据和心跳网卡需要配置IP地址，备份网卡不配，当数据或心跳网卡失效，备份网卡自动接管数据或心跳网卡IP地址。当ServieGuard启动后，一旦主节点发生异常，如主节点停机、应用的关键进程退出、网络中断等情况发生，备节点立即启动预设的应用程序，同时将浮动IP绑定到备节点上，整个主备机切换时间大概在2分钟内完成，切换后，客户端通过浮动IP透明地连接到备机上。当主节点故障排除后，是否要将备节点重新切换到主节点有2个策略，一是手工切换，二是自动切换，缺省是手工切换。
![](https://i.loli.net/2020/06/16/KNIl2EXgaRPS5U6.png)

3.集群相关命令
---
启动集群：cmruncl –v 
停止集群：cmhaltcl –v（若有包运行，加-f参数） 
只在一个节点上启动集群：cmruncl –n 节点名  
观察整个集群状态：cmviewcl –v
启动包：cmrunpkg –v –n 节点名 包名  
停止包：cmhaltpkg –v 包名
设置包的自动切换属性：cmmodpkg –e 包名（允许包在节点之间自动切换）
启动节点：cmrunnode 节点名

4.容灾测试例子
---
1.关闭1号机，模拟其挂机
`su`进root用户
`cd /`进根目录
`shutdown -hy -0`关闭1号机(关机前最好关闭服务器应用)
2.查看资源包是否切换到2号机
进2号机，`su`进root用户
`cmviewcl`查看双机状态
如果资源包没有自动切换到2号机，`cmrunpkg 包名`将其拉起到2号机
3.将1号机开机，重新加入到集群
开机，进入1号机，`su`进root用户
`cmviewcl`查看双机状态
`cmrunnode -v`将1号机的节点拉起
`cmmodpkg -e 包名`开启包的自动切换

参考：
[HP-UX 集群管理](http://blog.chinaunix.net/uid-9793706-id-1642178.html)