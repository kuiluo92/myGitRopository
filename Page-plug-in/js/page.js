(function($){
	var ms = {
		init:function(obj,args){
			return (function(){
				ms.fillHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		//填充html
		fillHtml:function(obj,args){
			return (function(){
				obj.empty();
				var html = "";
				html += "<div class=\"pages\" style=\"width:100%; height:23px;\">\n";
				html += "<ul>\n";
				 if(args.curpage>1){
					 html += "<li id=\"pages02a\"><a "+args.attr+" class=\"firstpage "+args.aclass+"\" title=\"第一页\" href='#'></a></li>\n";  
		        	 if(args.curpage>10){
		        		 html += "<li id=\"pages03a\"><a id='prevTen' "+args.attr+" class=\"pageback "+args.aclass+"\" title='前十页' href='#'></a><li>\n";  
		        	 }
		        	 html += "<li id=\"pages03a\"><a id='prevOne' "+args.attr+" class=\"pageback "+args.aclass+"\" title='前一页' href='#'></a><li>\n";                                                                         
	        	 }    
	        	 if(args.curpage>1){                                                                                                                                                                                        
	        		 html += "<li class=\"pages0a\"></li>\n";                                                                                                                                                                                        
	        		 html += "<li class=\"pages0b\"></li>\n";                                                                                                                                                                                           
	        	 }      
	        	 var totalPages = args.totalCount % args.pagesize == 0 ? args.totalCount / args.pagesize
			                : parseInt(args.totalCount / args.pagesize) + 1;
	        	 if(totalPages<15){
	        		 for(var i=1;i<=totalPages;i++){
	        			 if(i==args.curpage){
	        				 html += "<li id='curpageid'>"+i+"</li>\n";  
	        			 }else{
	        				 html += "<li><a "+args.attr+" class=\"pageno "+args.aclass+"\"  href='#'>"+i+"</a></li>\n";                 
	        			 }
	        		 }
	        	 }else{
	        		 var pageStart=0;
	        		 if(args.curpage<=5){
	        			 pageStart=1;
	        		 }else{
	        			 pageStart=args.curpage-4;
	        			 html += "<li class=\"pages01\">...</li>\n";  
	        		 }
	        		 if(pageStart+9>totalPages){
	        			 pageStart=totalPages-9;
	        		 }
	        		 for(var i=pageStart;i<pageStart+9;i++){
	        			 if(i==args.curpage){
	        				 html += "<li id='curpageid'>"+i+"</li>\n";  
	        			 }else{
	        				 html += "<li><a "+args.attr+" class=\"pageno "+args.aclass+"\" href='#' >"+i+"</a></li>\n";  
	        			 }
	        		 }
	        		 if(pageStart + 9 < totalPages){
	        			 html += "<li class=\"pages01\">...</li>\n";  
	        		 }
	        		 
	        	 }  
	        	 
	        	 if(args.curpage<totalPages){
	        		 html += "<li id=\"pages04a\"><a id='nextOne' "+args.attr+" class=\"pageforward "+args.aclass+"\" title=\"下一页\" href='#'> </a></li>\n";                                           
	        	 }
	        	 if(args.curpage+10 < totalPages){
	        		 html += "<li id=\"pages04a\"><a id='nextTen' "+args.attr+" class=\"pageforward "+args.aclass+"\" title=\"后十页\" href='#'> </a></li>\n";
	        	 }
	        	 html += "<li id=\"pages05a\"><a "+args.attr+" class=\"lastpage "+args.aclass+"\" title=\"最后一页\" href='#'> </a></li>\n";                                                  
	        	 
	        	 if(args.curpage==totalPages){
	        		 html += "<li class=\"pages0c\"></li>\n";                                                                                                                                                                                            
	        		 html += "<li class=\"pages0d\"></li>\n"; 
	        	 }
	        	 
	        	                                                                                                                                                                           
	        	 html += "<li class=\"pages06\">共&nbsp;<span class=\"page_bold\">"+args.totalCount+"</span>&nbsp;条记录&nbsp;&nbsp;第<span>"+args.curpage+"/"+totalPages+"</span>页</li>\n";  
	        	 
	        	 html += "</ul>\n";                                                                                                                                                                                                                  
	        	 html += "</div>\n";
	        	 obj.append(html);
			})();
		},
		
		//绑定事件
		bindEvent:function(obj,args){
			return (function(){
				obj.off("click");
				obj.on("click","a.pageno",function(){
					var curpage = parseInt($(this).text());
					ms.fillHtml(obj,{"curpage":curpage,"pagesize":args.pagesize,"aclass":args.aclass,"totalCount":args.totalCount});
					if(typeof(args.callback)=="function"){
						args.callback(curpage);
					}
				});
				//上一页
				obj.on("click","#prevOne",function(){
					var curpage = parseInt($("#curpageid").text());
					ms.fillHtml(obj,{"curpage":curpage-1,"pagesize":args.pagesize,"aclass":args.aclass,"totalCount":args.totalCount});
					if(typeof(args.callback)=="function"){
						args.callback(curpage-1);
					}
				});
				//下一页
				obj.on("click","#nextOne",function(){
					var curpage = parseInt($("#curpageid").text());
					ms.fillHtml(obj,{"curpage":curpage+1,"pagesize":args.pagesize,"aclass":args.aclass,"totalCount":args.totalCount});
					if(typeof(args.callback)=="function"){
						args.callback(curpage+1);
					}
				});
				//前十页
				obj.on("click","#prevTen",function(){
					var curpage = parseInt($("#curpageid").text());
					ms.fillHtml(obj,{"curpage":curpage-10,"pagesize":args.pagesize,"aclass":args.aclass,"totalCount":args.totalCount});
					if(typeof(args.callback)=="function"){
						args.callback(curpage-10);
					}
				});
				//后十页
				obj.on("click","#nextTen",function(){
					var curpage = parseInt($("#curpageid").text());
					ms.fillHtml(obj,{"curpage":curpage+10,"pagesize":args.pagesize,"aclass":args.aclass,"totalCount":args.totalCount});
					if(typeof(args.callback)=="function"){
						args.callback(curpage+10);
					}
				});
				//第一页
				obj.on("click","a.firstpage",function(){
					ms.fillHtml(obj,{"curpage":1,"pagesize":args.pagesize,"aclass":args.aclass,"totalCount":args.totalCount});
					if(typeof(args.callback)=="function"){
						args.callback(1);
					}
				});
				//最后一页
				obj.on("click","a.lastpage",function(){
					var curpage = args.totalCount % args.pagesize == 0 ? args.totalCount / args.pagesize
			                : parseInt(args.totalCount / args.pagesize) + 1;
					ms.fillHtml(obj,{"curpage":curpage,"pagesize":args.pagesize,"aclass":args.aclass,"totalCount":args.totalCount});
					if(typeof(args.callback)=="function"){
						args.callback(curpage);
					}
				});
			})();
		}
	}
	
	$.fn.createPage = function(options){
		var args = $.extend({
			attr : '',
			aclass : '',
			pagesize : 10,
			totalCount : 0,
			curpage : 0,
			callback : function(){}
		},options);
		ms.init(this,args);
	}
})(jQuery);