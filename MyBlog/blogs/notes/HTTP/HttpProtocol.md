---
title: HTTP协议
date: 2021-6-22
tags:
 - HTTP
categories:
 - HTTP
---


::: tip 摘要
关于HTTP协议相关<br>
:::


<!-- more  正文部分 -->

### HTTP协议

协议规定了浏览器和万维网服务器之间互相通信的规则,约定

#### 请求报文

**重点是格式和参数**

```js
//行包括三部分：请求类型、url路径、HTTP协议版本
行 POST s?wd=http&rsv_spt=1 
头 HOST: atguigu.com
   Cookie: name=guigu
   Content-type: applicaion/x-www-form-urlencoded
   User-Agent: chrome 63
//空行是固定的，必须有
空行
//请求体可以有，可以没有，如果是GET，请求体是空的，如果是POST,请求体可以不为空
体 username=admin&password=admin

```

#### 响应报文

```js
//行包括三部分：HTTP协议版本、响应状态码、响应状态字符串
行 HTTP/1.1 200 OK
头 Content-Type: text/html;charset=utf-8
   Content-length: 2048
   Content-encoding:gzip
空行
体 <html>
	<head>
	<body>
		<h1>小皮</h1>
	</body>
	</head>
   </html>
```

