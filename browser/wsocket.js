function WSocket(_server,return_type){

	this.server=_server;
	this.ws;
	this.isopened;
	this.waiting;
	this.return_type=return_type || "json";
	this.timeout=5000;
}
WSocket.prototype.open=function(callback){
	var that=this;
	if (this.waiting) return false;
	
	this.waiting=true;
	setTimeout(function(){that.waiting=false;},this.timeout);
	

	this.isopened=false;
	this.ws=new WebSocket(this.server);
	this.ws.onopen =function(evt){that.onopenfunc(evt);};
	this.ws.onclose = function(evt){that.onclosefunc(evt);};
	this.ws.onmessage = function(evt){that.onmessage(evt);};
	this.ws.onerror = function(evt){that.onerrorfunc(evt);};
	
	if (typeof(callback)=="function") this.onopen=callback;
  
  	return true;

}
WSocket.prototype.setdata=function(type){
	this.return_type=type;
}
WSocket.prototype.send=function(data){
	if (!this.isopened) return this.open();
	
	if (data.constructor.name=="Object"){
	
		this.ws.send(JSON.stringify(data),this.onsenderror);
		
	}else if (data.constructor.name=="String"){
	
		this.ws.send(data,this.onsenderror);
		
	}else{
		this.ws.send(data, { binary: true},this.onsenderror);
	}
}
WSocket.prototype.ondata=function(callback){
	this.ondatafunc=callback;
}
WSocket.prototype.ondatafunc=function(data,evt){

}
WSocket.prototype.onsenderror=function(evt){

}
WSocket.prototype.onopen=function(evt){

}
WSocket.prototype.onopenfunc=function(evt){
	this.isopened=true;
	this.onopen(evt);
}
WSocket.prototype.onclose=function(evt){

}
WSocket.prototype.onclosefunc=function(evt){
	this.isopened=false;
	this.onclose(evt);
}
WSocket.prototype.onmessage=function(evt){
	var that=this;
	
	if(this.return_type=="json"){  
		that.ondatafunc(JSON.parse(evt.data,evt));
	}else if(this.return_type=="string"){  
		that.ondatafunc(evt.data,evt);
	}else if(this.return_type=="dataurl"){

		var reader = new FileReader();  
		reader.onload = function(e){  
			if(e.target.readyState == FileReader.DONE){  
				that.ondatafunc(evt.target.result,evt);
			}  
		}
		reader.readAsDataURL(evt.data);  
	
	}else if(this.return_type=="bin"){

		var reader = new FileReader();  
		reader.onload = function(e){  
			if(e.target.readyState == FileReader.DONE){  
				that.ondatafunc(new Uint8Array(e.target.result),evt);
			}  
		}
		reader.readAsArrayBuffer(evt.data);  
	}

}
WSocket.prototype.onerror=function(evt){

}
WSocket.prototype.onerrorfunc=function(evt){
	this.isopened=false;
	this.onerror(evt);
}
