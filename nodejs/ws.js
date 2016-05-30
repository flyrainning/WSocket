var act=require('./act.js');


var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message,flags) {
 console.log(message);
  	try{
  		var data=JSON.parse(message);
	  	if (data.act){
	  		if (typeof(act[data.act])=='function'){
	  			var back=act[data.act](data,ws);
	  			if (back.constructor.name=="Object"){
	  			
	  				ws.send(JSON.stringify(back),function(){});
	  				
	  			}else if (back.constructor.name=="String"){
	  			
	  				ws.send(back,function(){});
	  				
	  			}else{
	  				ws.send(back, { binary: true},function(){});
	  			}
	  		
	  		}
		
		}
    }catch(e){}
  });
  ws.on('error', function(message) {
  	//console.log('error');
  
  });

});
