/**
 * 分页插件bootsrap4
 * @author zhanyd@sina.com
 * @date 2018/08/06
 * @version 1.0
 */
(function($){	
	$.fn.extend({
		//初始化
		initPagination : function(func,pages,option){
			
			var defaults = {
					pageNum: 1,      //当前页
					pageSize: 10,    //每页数
					leftPageNum: 3,  //左边页数
					middleNum: 10,   //中间页数
					rightPageNum : 3 //右边页数
			 };
			 var settings = $.extend(defaults, option);
			    
			$(this).empty();
			$(this).append(
					' <li class="page-item"><a class="page-link" href="#" onclick="$.fn.prePage(' + func + ',' + settings.pageNum + ',' + settings.pageSize + ',' + pages + ')">&laquo;</a></li>'
			);
			
			//初始化页数
			for(var i = 1; i <= pages; i++){
				//当前页是第一页时
				if(settings.pageNum == 1){
					//settings.leftPageNum + 1处后面加...
					if(i == (settings.leftPageNum + 1) && settings.leftPageNum + settings.rightPageNum < pages){
						$(this).append('<li class="page-item"><a class="page-link" href="#">...</a></li>');
						
						//...一直加到最后一页往前推settings.rightPageNum页
						i = pages - settings.rightPageNum;
						continue;
					}
				}
				//当前页小于中间页数时
				else if(settings.pageNum < settings.middleNum){
					//settings.middleNum + 1处后面加...
					if(i == (settings.middleNum + 1) && settings.middleNum + settings.rightPageNum < pages){
						$(this).append('<li class="page-item"><a class="page-link" href="#">...</a></li>');
						
						//...一直加到最后一页往前推settings.rightPageNum页
						i = pages - settings.rightPageNum;
						continue;
					}
				}
				else{
					//settings.leftPageNum + 1处后面加...
					if(i == (settings.leftPageNum + 1) && settings.leftPageNum + settings.rightPageNum < pages){
						$(this).append('<li class="page-item"><a class="page-link" href="#">...</a></li>');
						
						//...一直加到当前页前面settings.middleNum/2处
						i = settings.pageNum - settings.middleNum/2;
						continue;
					}
					
					//当前页后面settings.middleNum/2处加...
					if(i == (settings.pageNum + settings.middleNum/2) && (settings.pageNum + settings.middleNum/2 + settings.rightPageNum) < pages){
						$(this).append('<li class="page-item"><a class="page-link" href="#">...</a></li>');
						
						//...一直加到最后一页往前推settings.rightPageNum页
						i = pages - settings.rightPageNum;
						continue;
					}
				}
				
				//当前页高亮
				if(i == settings.pageNum){
					$(this).append(
							'<li class="page-item active"><a class="page-link" href="#" onclick="$.fn.searchData(' + func + ',' + i + ',' + settings.pageSize + ')">' + i + '</a></li>'
					);
				}else{
					$(this).append(
							'<li class="page-item"><a class="page-link" href="#" onclick="$.fn.searchData(' + func + ',' + i + ',' + settings.pageSize + ')">' + i + '</a></li>'
					);
				}
				
			}
			$(this).append(
					' <li class="page-item"><a class="page-link" href="#" onclick="$.fn.nextPage(' + func + ',' + settings.pageNum + ',' + settings.pageSize + ',' + pages + ')">&raquo;</a></li>'
			);
			
			
		},
		//上一页
		prePage : function(func,pageNum,pageSize,pages){
			if(pageNum == 1){
				pageNum = pages;
			}else{
				pageNum--;
			}
			$.fn.searchData(func,pageNum,pageSize);
		},
		
		//下一页
		nextPage : function(func,pageNum,pageSize,pages){
			if(pageNum == pages){
				pageNum = 1;
			}else{
				pageNum++;
			}
			$.fn.searchData(func,pageNum,pageSize);
		},
		
		//提交表单
		searchData : function(func,pageNum,pageSize){
			func(pageNum,pageSize);
		}
	});
}(jQuery));

