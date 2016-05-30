# WSocket
基于nodejs和浏览器的websocket通讯的简单框架，能实现string，json，dataurl和二进制数据的互相通讯，并可以通过标志键实现简单的功能导航


#用法
1. 服务器端使用nodejs运行server/ws.js
2. 在server/act.js中编写各种动作所执行的代码，通过return将结果返回浏览器
3. 浏览器引入browser/WSocket.js

```

var ws=new WSocket('ws://127.0.0.1:8080');//设置
ws.open();//建立链接
ws.setdata('string');//设置返回数据类型 string,json,bin,dataurl
ws.send({act:"get_a_string"});//发送数据，可以是json，string，或者ArrayBuffer二进制数据(二进制数据需要自己修改server完成导航)
ws.ondata(function(data,evt){//返回数据回调，data是根据类型解码后的数据，evt是原始数据接口，evt.data是原始数据
	console.log(data);

});


//也可以在open中直接设置ws的onopen的callback

var ws=new WSocket('ws://127.0.0.1:8080','dataurl');//设置地址，返回数据类型
ws.open(function(evt){
	this.send({act:"get_a_binary",file:"something"});
});
ws.ondata(function(data,evt){
	console.log(data);
});


```
