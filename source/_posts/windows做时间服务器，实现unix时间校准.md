---
title: windows做时间服务器，实现unix时间校准
article_type: 0
abbrlink: 650c54f6
date: 2020-05-22 16:37:49
tags: 
	- unix
	- ntp
toc:
---
前言:
>unix系统在运行一段时间后，系统的时间就会出现偏差，由于是局域网无法连接到internet，于是将内网的可连接internet的windows主机做为时间服务器，unix通过它来校准时间

<!-- more -->
NTP简介：
NTP是网络时间协议(Network Time Protocol)，它是用来同步网络中各个计算机的时间的协议。
在计算机的世界里，时间非常地重要
例如：对于火箭发射这种科研活动，对时间的统一性和准确性要求就非常地高，是按照A这台计算机的时间，还是按照B这台计算机的时间？
NTP就是用来解决这个问题的，NTP（Network Time Protocol，网络时间协议）是用来使网络中的各个计算机时间同步的一种协议。
它的用途是把计算机的时钟同步到世界协调时UTC，其精度在局域网内可达0.1ms，在互联网上绝大多数的地方其精度可以达到1-50ms。
它可以使计算机对其服务器或时钟源（如石英钟，GPS等等）进行时间同步，它可以提供高精准度的时间校正，而且可以使用加密确认的方式来防止病毒的协议攻击。

## windows做时间服务器设置
参考microsoft[如何在 Windows Server 中配置权威时间服务器](http://download.microsoft.com/download/E/A/9/EA9F5FDC-255C-46A3-9AFE-C714B6037703/MicrosoftEasyFix50395.msi)

1.将服务器类型更改为 NTP。 为此，请按照下列步骤操作：
依次选择开始 > 运行，键入 `regedit`，然后选择确定。
找到并单击下面的注册表子项：
`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\W32Time\Parameters\Type`
在右窗格中，右键单击键入，然后选择修改。

2.在编辑值中的数值数据框中键入 NTP，然后选择确定。
将 `AnnounceFlags` 设置为 5。 为此，请按照下列步骤操作：
找到并单击下面的注册表子项：
`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\W32Time\Config\AnnounceFlags`
在右窗格中，右键单击 `AnnounceFlags`，然后选择修改。
在编辑 DWORD 值中，在数值数据框中键入 5，然后选择确定。

3.启用 `NTPServer`。 为此，请按照下列步骤操作：
找到并单击下面的注册表子项：
`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\W32Time\TimeProviders\NtpServer`
在右窗格中，右键单击已启用，然后选择修改。
在编辑 DWORD 值的数值数据框中，键入 1，然后选择确定。

4.指定时间源。 为此，请按照下列步骤操作：
找到并单击下面的注册表子项：
`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\W32Time\Parameters`
在右窗格中，右键单击 NtpServer，然后选择修改。
在编辑值的数值数据框中键入 Peers，然后选择确定。
>注意:
Peers 是一个以空格分隔的对等机列表的占位符，计算机从中可获取时间戳。 列出的每个 DNS 名称都必须是唯一的。 必须在每个 DNS 名称后面附加 ,0x1。 如果不在每个 DNS 名称后附加 ,0x1，则在步骤 5 中所做的更改将不会生效。![](https://i.loli.net/2020/06/09/d8k6vfX5qTcbWy7.png)

5.配置时间校准设置。 为此，请按照下列步骤操作：
找到并单击下面的注册表子项：
`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\W32Time\Config\MaxPosPhaseCorrection`
在右窗格中，右键单击 `MaxPosPhaseCorrection`，然后选择修改。
在“编辑 DWORD 值”中的“基数” 框中单击选择“十进制”。
在编辑 DWORD 值的数值数据框中键入 TimeInSeconds，然后选择确定。
找到并单击下面的注册表子项：
`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\W32Time\Config\MaxNegPhaseCorrection`
 
在右窗格中，右键单击 `MaxNegPhaseCorrection`，然后选择修改。
在“编辑 DWORD 值”中的“基数” 框中单击选择“十进制”。
在编辑 DWORD 值的数值数据框中键入 TimeInSeconds，然后选择确定。

6.重启windows时间服务，cmd命令
`net stop w32time && net start w32time`

**注:自动配置方法**
[点击下载 EasyFix.msi](http://download.microsoft.com/download/E/A/9/EA9F5FDC-255C-46A3-9AFE-C714B6037703/MicrosoftEasyFix50395.msi)
![](https://i.loli.net/2020/06/09/yLicws6QXEtxB1N.png)

## unix自动时间同步
1.修改ntp配置文件`etc/ntp.config`，以windows服务器为准进行同步
![](https://i.loli.net/2020/06/09/Z4oUhX1BWetKVjQ.png)

2.查看ntp同步状态` ntpq -p`
![](https://i.loli.net/2020/06/09/egdFL8RDx5AjTu1.png)

3.手动同步时间
`ntpdate -u 'severIP'`

