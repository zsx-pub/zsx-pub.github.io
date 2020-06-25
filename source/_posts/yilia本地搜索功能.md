---
title: yilia本地搜索功能
article_type: 0
tags:
  - yilia
  - 本地搜索
abbrlink: db1d7c34
date: 2020-05-25 21:07:52
toc:
---
>yilia并没有在网站内搜索内容的功能，只能在所有文章里搜索匹配标题，这不能满足需求。在网上搜了不少资料，但并没有针对这个修改，这对前端基本没有了解的我，自己摸索起来是真的有点困难。在这里记录下自己修改的内容，并不是完善的功能，但是能实现搜索全站内容。

<!-- more -->

参考别人基于yilia主题升级的yelee实现的本地搜索功能:
[MOxfive的博客](http://moxfive.xyz/2016/05/31/hexo-local-search/)
[码农半亩田的博客](https://gaomf.cn/2016/10/10/%E4%B8%BAHexo%E5%8D%9A%E5%AE%A2Yilia%E4%B8%BB%E9%A2%98%E6%B7%BB%E5%8A%A0%E6%9C%AC%E5%9C%B0%E7%AB%99%E5%86%85%E6%90%9C%E7%B4%A2%E5%8A%9F%E8%83%BD/)

## 1.search插件安装

本地站内搜索都是基于索引文件的，Hexo中可通过hexo-generator-search插件生成XML格式的索引文件，通过hexo-generator-json-content插件生成JSON格式的索引文件，此处选择了hexo-generator-search:
`npm install --save hexo-generator-search`
然后在Hexo站点根目录下的`_config.ym`l中添加如下配置即可：
```
search:
  path: search.xml
  field: all
```
>search.xml文件冗余没做，有需要再弄吧

## 2.搜索框添加 

修改主题目录`left-col.ejs`文件
```
		</nav>
		<nav class="header-smart-menu">
    		<% for (var i in theme.smart_menu){ %>
    			<% if(theme.smart_menu[i]){ %>
    			<a q-on="click: openSlider(e, '<%-i%>')" href="javascript:void(0)"><%= theme.smart_menu[i] %></a>
    			<% } %>
            <%}%>
		</nav>
////在上面这代码后面添加

<form id="search-form"> <!-- 搜索框相关 -->
    <input type="text" id="local-search-input" name="q" results="0" style="text-align:center" placeholder="站内搜索..." class="search form-control" autocomplete="off" autocorrect="off"/>
    <i class="fa fa-times" onclick="resetSearch()"></i> <!-- 清空/重置搜索框 -->
</form>
<div id="local-search-result"></div> <!-- 搜索结果区 -->
<p class='no-result'>没找到。。。</p> <!-- 无匹配时显示，注意请在 CSS 中设置默认隐藏 -->
```

## 3.搜索框样式修改

参考他们的样式，修改`main.0cf68a.css`文件，在最后添加
```
.search {
  width: 65%;
  height: 25px;
  margin-top: 0px;
  padding: 0;
  font-family: inherit;
  border: 2px solid transparent;
  border-bottom: 3px solid #fff;
  border-radius: 2px;
  opacity: 0.8;
  background: #708090;
}
.search:hover {
  border: 2px solid #d3d3d3;
  opacity: 1;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
}

/*搜索重置按钮*/
#search-form .fa-times {
  display: none;
  padding: 1px 0.7em;
  box-shadow: 0 0 3px rgba(0,0,0,0.15);
  cursor: pointer;
  color: #ff0000;
}
#search-form .fa-times:active {
  background: #fff;
}
#search-form .fa-times:hover {
  zoom: 1.1;
  padding: 1px 0.6em;
  border: 1px solid #fff;
  box-shadow: 0 0 6px rgba(0,0,0,0.25);
}

/*搜索结果区*/
#local-search-result {
  margin: auto -12% auto -6%;
  font-size: 0.9em;
  text-align: left;
  word-break: break-all;
}

#local-search-result ul.search-result-list li:hover {
  font-weight: normal;
}

/*单条搜索结果*/
#local-search-result li {
  margin: 0.5em auto;
  border-bottom: 2px solid #d3d3d3;
}
#local-search-result .search-result-list li:hover {
  background: rgba(158,188,226,0.21);
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
}

/*匹配的标题*/
#local-search-result a.search-result-title {
  line-height: 1.2;
  font-weight: bold;
  color: #ff000;
}

/*搜索预览段落*/
#local-search-result p.search-result {
  margin: 0.4em auto;
  line-height: 1.2em;
  max-height: 3.6em;
  overflow: hidden;
  text-align: justify;
  color: #fff;
}

/*匹配的关键词*/
#local-search-result em.search-keyword {
  color: #f58e90;
}

/*无匹配搜索结果时显示*/
p.no-result {
  display: none;
  margin: 2em 0 2em 6%;
  padding-bottom: 0.5em;
  text-align: left;
  color: #fff;
  font-family: font-serif serif;
  border-bottom: 2px solid #d3d3d3;
}
```

## 4.js文件添加

在source文件下添加`search.js`文件，内容问下：
```
// A local search script with the help of [hexo-generator-search](https://github.com/PaicHyperionDev/hexo-generator-search)
// Copyright (C) 2015 
// Joseph Pan <http://github.com/wzpan>
// Shuhao Mao <http://github.com/maoshuhao>
// Edited by MOxFIVE <http://github.com/MOxFIVE>

var searchFunc = function(path, search_id, content_id) {
    'use strict';
    $.ajax({
        url: path,
        dataType: "xml",
        success: function( xmlResponse ) {
            // get the contents from search data
            var datas = $( "entry", xmlResponse ).map(function() {
                return {
                    title: $( "title", this ).text(),
                    content: $("content",this).text(),
                    url: $( "url" , this).text()
                };
            }).get();
            var $input = document.getElementById(search_id);
            var $resultContent = document.getElementById(content_id);
            $input.addEventListener('input', function(){
                var str='<ul class=\"search-result-list\">';                
                var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                $resultContent.innerHTML = "";
                if (this.value.trim().length <= 0) {
                    return;
                }
                // perform local searching
                datas.forEach(function(data) {
                    var isMatch = true;
                    var content_index = [];
                    var data_title = data.title.trim().toLowerCase();
                    var data_content = data.content.trim().replace(/<[^>]+>/g,"").toLowerCase();
                    var data_url = data.url;
                    var index_title = -1;
                    var index_content = -1;
                    var first_occur = -1;
                    // only match artiles with not empty titles and contents
                    if(data_title != '' && data_content != '') {
                        keywords.forEach(function(keyword, i) {
                            index_title = data_title.indexOf(keyword);
                            index_content = data_content.indexOf(keyword);
                            if( index_title < 0 && index_content < 0 ){
                                isMatch = false;
                            } else {
                                if (index_content < 0) {
                                    index_content = 0;
                                }
                                if (i == 0) {
                                    first_occur = index_content;
                                }
                            }
                        });
                    }
                    // show search results
                    if (isMatch) {
                        str += "<li><a href='"+ data_url +"' class='search-result-title' target='_blank'>"+ "> " + data_title +"</a>";
                        var content = data.content.trim().replace(/<[^>]+>/g,"");
                        if (first_occur >= 0) {
                            // cut out characters
                            var start = first_occur - 6;
                            var end = first_occur + 6;
                            if(start < 0){
                                start = 0;
                            }
                            if(start == 0){
                                end = 10;
                            }
                            if(end > content.length){
                                end = content.length;
                            }
                            var match_content = content.substr(start, end); 
                            // highlight all keywords
                            keywords.forEach(function(keyword){
                                var regS = new RegExp(keyword, "gi");
                                match_content = match_content.replace(regS, "<em class=\"search-keyword\">"+keyword+"</em>");
                            })
                            str += "<p class=\"search-result\">" + match_content +"...</p>"
                        }
                    }
                })
                $resultContent.innerHTML = str;
            })
        }
    })
}
```
>F12调试显示searchFunc没有定义，直接把调用放`left-col.ejs`,通过了。
>又显示$.ajax不行，在search.js，插一条alert(xxxx);，有弹窗出来。
>百度是jquery没有，`layout.ejs`文件里是有`<script type="text/javascript" src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>`,不明原因，直接把它也插到`left-col.ejs`里。调试没出错了

## 5.实现search

在`left-col.ejs`插入代码：
```
		<nav class="header-smart-menu">
    		<% for (var i in theme.smart_menu){ %>
    			<% if(theme.smart_menu[i]){ %>
    			<a q-on="click: openSlider(e, '<%-i%>')" href="javascript:void(0)"><%= theme.smart_menu[i] %></a>
    			<% } %>
            <%}%>
		</nav>
<!-- 具体修改的内容在下面 -->
<script type="text/javascript" src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<form id="search-form"> <!-- 搜索框相关 -->
    <input type="text" id="local-search-input" name="q" results="0" style="text-align:center" placeholder="站内搜索..." class="search form-control" autocomplete="off" autocorrect="off"/>
    <i class="fa fa-times" onclick="resetSearch()"></i> <!-- 清空/重置搜索框 -->
</form>
<div id="local-search-result"></div> <!-- 搜索结果区 -->
<p class='no-result'>没找到。。。</p> <!-- 无匹配时显示，注意请在 CSS 中设置默认隐藏 -->
<script type="text/javascript" src="/search.js"></script>
<script>
var path = "/search.xml";
searchFunc(path, 'local-search-input', 'local-search-result');
</script>
```
>不能显示没有搜索结果，没有清空键，文字匹配后变成斜体小写。但满足我要的功能了

**更新**：将上面代码优化
search.xml 文件会跟随页面一起加载，如果索引文件太大，可能会影响页面加载速度，可以将其调整为激活搜索框时再下载所需文件
```
var path = "/search.xml";
searchFunc(path, 'local-search-input', 'local-search-result');
```
//////////上面这两句替换为下面：////////
```
var inputArea = document.querySelector("#local-search-input");
var getSearchFile = function(){
    var path = "/search.xml";
    searchFunc(path, 'local-search-input', 'local-search-result');
}
inputArea.onfocus = function(){ getSearchFile() }
```
>PS:06/22 无匹配搜索结果显示解决如下：
```
<script type="text/javascript" src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<form id="search-form"> <!-- 搜索框相关 -->
    
    <input type="text" id="local-search-input" name="q" results="0" style="text-align:center" placeholder="" class="search form-control" autocomplete="off" autocorrect="off"/>
    <i class="icon-font icon-search" onclick="resetSearch()"></i> <!-- 清空/重置搜索框  没有使用-->
</form>
<div id="local-search-result"></div> <!-- 搜索结果区 -->
<p class='no-result'>无匹配结果！<i class='fa fa-spinner fa-pulse'></i></p> <!-- 无匹配时显示，注意请在 CSS 中设置默认隐藏 -->
<script type="text/javascript" src="/search.js"></script>
<script>
var inputArea = document.querySelector("#local-search-input");
var $resultArea = $("#local-search-result");
var getSearchFile = function(){
    var path = "/search.xml";
    searchFunc(path, 'local-search-input', 'local-search-result');

}
inputArea.onfocus = function(){ getSearchFile() 
        $resultArea.bind("DOMNodeRemoved DOMNodeInserted", function(e) {
            if (!$(e.target).text()) {
                $(".no-result").show(200);
            } else {
              $(".no-result").hide();}
	      })
}

```