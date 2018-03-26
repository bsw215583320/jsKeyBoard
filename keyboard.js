
;(function(exports){
	var KeyBoard = function(input, options){
		var parent  = options&&options.parent||'';
		var pos = input.getBoundingClientRect();
		var winWidth = 0;
		var winHeight = 0;
		var left=0;
		var bottom=0;
		var body = null;
		if (window.innerWidth)
			winWidth = window.innerWidth;
			else if ((document.body) && (document.body.clientWidth))
			winWidth = document.body.clientWidth;
			//获取窗口高度
			if (window.innerHeight)
			winHeight = window.innerHeight;
			else if ((document.body) && (document.body.clientHeight))
			winHeight = document.body.clientHeight;
			//通过深入Document内部对body进行检测，获取窗口大小
			if (document.documentElement  && document.documentElement.clientHeight && document.documentElement.clientWidth)
			{
			winHeight = document.documentElement.clientHeight;
			winWidth = document.documentElement.clientWidth;
			}
			if(winWidth-pos.left>300){
				left=pos.left+"px";
			} else {
				left=pos.right-300+"px";
			}
			if(winHeight-pos.bottom>160){
				bottom=(winHeight-pos.bottom-160)+"px";
			} else {
				bottom=(winHeight-pos.top)+"px"
			}
			if(parent === ''){
				body = document.getElementsByTagName('body')[0];
			} else {
				body = document.getElementById(parent);
			}
			
		var DIV_ID = options && options.divId || '__w_l_h_v_c_z_e_r_o_divid';
		if(parent==''){
			if(document.getElementById(DIV_ID)){
				body.removeChild(document.getElementById(DIV_ID));
			}
		}else {
			if($(body).find('#'+DIV_ID)){
				$(body).children('#'+DIV_ID).remove();
			}
		}
		this.input = input;
		this.el = document.createElement('div');
		
		var self = this;
		var zIndex = options && options.zIndex || 1000;
		var width = options && options.width || '300px';
		var height = options && options.height || '160px';
		var fontSize = options && options.fontSize || '15px';
		var backgroundColor = options && options.backgroundColor || '#fff';
		var TABLE_ID = options && options.table_id || 'table_0909099';
		var mobile = typeof orientation !== 'undefined';
		var parent  = options&&options.parent||'';
		
		this.el.id = DIV_ID;
		this.el.style.position = 'absolute';
		this.el.style.left = left;
		this.el.style.right = 0;
		this.el.style.bottom = bottom;
		this.el.style.zIndex = zIndex;
		this.el.style.width = width;
		this.el.style.height = height;
		this.el.style.backgroundColor = backgroundColor;
		
		//样式
		var cssStr = '<style type="text/css">';
		cssStr += '#' + TABLE_ID + '{text-align:center;width:100%;height:160px;border-top:1px solid #1FB9FF;background-color:#FFF;}';
		cssStr += '#' + TABLE_ID + ' td{width:20%;border:1px solid #1FB9FF;border-right:0;border-top:0;}';
		if(!mobile){
			cssStr += '#' + TABLE_ID + ' td:hover{background-color:#1FB9FF;color:#FFF;}';
		}
		cssStr += '</style>';
		
		//Button
		/*var btnStr = '<div style="width:60px;height:28px;background-color:#1FB9FF;';
		btnStr += 'float:right;margin-right:5px;text-align:center;color:#fff;';
		btnStr += 'line-height:28px;border-radius:3px;margin-bottom:5px;cursor:pointer;">完成</div>';
		*/
		//table
		var tableStr = '<table id="' + TABLE_ID + '" border="0" cellspacing="0" cellpadding="0">';
			tableStr += '<tr><td>1</td><td>2</td><td>3</td><td>4</td><td style="background-color:#53d1e2;">删除</td></tr>';
			tableStr += '<tr><td>5</td><td>6</td><td>7</td><td>8</td><td style="background-color:#53d1e2;">清空</td></tr>';
			tableStr += '<tr><td>9</td><td>0</td><td>.</td><td>-</td><td style="background-color:#53d1e2;">完成</td></tr>';
			/*tableStr += '<tr><td style="background-color:#D3D9DF;">.</td>';
			tableStr += '</tr>';
			*/tableStr += '</table>';
		this.el.innerHTML = cssStr + tableStr;
		
		function addEvent(e){
			var ev = e || window.event;
			var clickEl = ev.element || ev.target;
			var value = clickEl.textContent || clickEl.innerText;
			if(clickEl.tagName.toLocaleLowerCase() === 'td' && value !== "删除" && value !== "完成" && value !== "清空"){
				if(self.input){
					self.input.value += value;
				}
			}else if(clickEl.tagName.toLocaleLowerCase() === 'td' && value === "完成"){
				body.removeChild(self.el);
			}else if(clickEl.tagName.toLocaleLowerCase() === 'td' && value === "清空"){
				self.input.value = "";
			}else if(clickEl.tagName.toLocaleLowerCase() === 'td' && value === "删除"){
				var num = self.input.value;
				if(num){
					var newNum = num.substr(0, num.length - 1);
					self.input.value = newNum;
				}
			}
		}
		
		if(mobile){
			this.el.ontouchstart = addEvent;
		}else{
			this.el.onmousedown = function(event) {event.preventDefault()}
			this.el.onclick = addEvent;
		}
		body.appendChild(this.el);
	}
	
	exports.KeyBoard = KeyBoard;

})(window);
